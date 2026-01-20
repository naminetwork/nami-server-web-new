const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');

// --- 設定 ---
const PORT = 9000; // Webhookを受け取るポート
const SECRET = 'my-secret-password'; // GitHubに設定する「Secret」と同じにする
const SCRIPT_PATH = './update_site.sh'; // 実行するスクリプト

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/webhook') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            // 1. 署名の検証 (セキュリティ)
            const signature = req.headers['x-hub-signature-256'];
            if (!signature) {
                res.writeHead(401);
                res.end('No signature found');
                return;
            }

            const hmac = crypto.createHmac('sha256', SECRET);
            const digest = 'sha256=' + hmac.update(body).digest('hex');

            if (signature !== digest) {
                res.writeHead(403);
                res.end('Invalid signature');
                return;
            }

            // 2. イベントの確認 (pushのみ反応)
            const event = req.headers['x-github-event'];
            if (event !== 'push') {
                res.writeHead(200);
                res.end('Ignored event');
                return;
            }

            console.log('Received valid push event. Updating site...');

            // 3. 更新スクリプトの実行
            exec(`bash ${SCRIPT_PATH}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Exec error: ${error}`);
                    return;
                }
                console.log(`Stdout: ${stdout}`);
                console.error(`Stderr: ${stderr}`);
            });

            res.writeHead(200);
            res.end('Update triggered');
        });
    } else {
        res.writeHead(404);
        res.end();
    }
});

server.listen(PORT, () => {
    console.log(`Webhook listener running on port ${PORT}`);
});
