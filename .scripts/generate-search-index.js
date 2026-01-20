const fs = require('fs');
const path = require('path');

function extractMeta(content) {
    const meta = {};
    const titleMatch = content.match(/^title:\s*"(.*)"/m);
    const descMatch = content.match(/^description:\s*"(.*)"/m);

    if (titleMatch) meta.title = titleMatch[1];
    if (descMatch) meta.description = descMatch[1];

    if (!meta.title) {
        const h1Match = content.match(/^#\s+(.*)/m);
        if (h1Match) meta.title = h1Match[1].trim();
    }

    return meta;
}

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            if (!f.startsWith('.')) walkDir(dirPath, callback);
        } else {
            callback(path.join(dir, f));
        }
    });
}

function generateIndex() {
    const index = [];
    const baseDir = process.cwd();

    walkDir(baseDir, (filePath) => {
        if (filePath.endsWith('.mdx')) {
            const relPath = path.relative(baseDir, filePath);
            let url = "/" + relPath.replace(/\\/g, '/').replace('.mdx', '');
            if (url.endsWith('/index')) url = url.slice(0, -6);
            if (url === "/index") url = "/";

            try {
                const content = fs.readFileSync(filePath, 'utf8');
                const meta = extractMeta(content);

                // Simple cleanup for search content: remove frontmatter and common MDX/JSX tags
                const searchContent = content
                    .replace(/^---[\s\S]*?---/, '') // Remove frontmatter
                    .replace(/<[\s\S]*?>/g, '')     // Remove JSX tags
                    .replace(/\{[\s\S]*?\}/g, '')   // Remove JS expressions
                    .replace(/\s+/g, ' ')           // Normalize whitespace
                    .trim();

                if (meta.title) {
                    index.push({
                        title: meta.title,
                        description: meta.description || '',
                        url: url,
                        content: searchContent
                    });
                }
            } catch (e) {
                console.error(`Error reading ${filePath}:`, e);
            }
        }
    });

    fs.writeFileSync('public/search-index.json', JSON.stringify(index, null, 2), 'utf8');
    console.log(`Generated public/search-index.json with ${index.length} items.`);
}

generateIndex();
