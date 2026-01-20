/**
 * Nami Network - 高速サーバーステータス取得
 * mcapi.us を使用して応答速度を改善
 */

function updateServerStatus() {
    const serverIp = 'nami.mcsv.win';
    const port = 25565; // Javaのデフォルトポートで問い合わせ

    fetch(`https://mcapi.us/server/status?ip=${serverIp}&port=${port}`)
        .then(response => response.json())
        .then(data => {
            // プレイ人数の更新
            const onlineElement = document.getElementById('online-player-count');
            const unitElement = document.getElementById('player-unit');

            if (onlineElement) {
                if (data.online) {
                    const onlineCount = data.players ? data.players.now : 0;
                    onlineElement.innerText = onlineCount;
                    if (unitElement) unitElement.innerText = '人';
                } else {
                    onlineElement.innerText = '0';
                }
            }

            // ステータス表示の更新（オンライン/オフライン）
            const statusText = document.getElementById('server-status-text');
            const statusPulse = document.getElementById('server-status-pulse');

            if (statusText) {
                statusText.classList.remove('text-slate-400', 'dark:text-slate-500');
                if (data.online) {
                    statusText.innerText = 'オンライン';
                    statusText.style.color = '#059669'; // Emerald 600
                    if (statusPulse) statusPulse.classList.remove('hidden');
                } else {
                    statusText.innerText = 'オフライン';
                    statusText.style.color = '#e11d48'; // Rose 600
                    if (statusPulse) statusPulse.classList.add('hidden');
                }
            }
        })
        .catch(err => {
            console.error('Failed to fetch server status:', err);
            const statusText = document.getElementById('server-status-text');
            if (statusText) {
                statusText.innerText = '接続エラー';
                statusText.style.color = '#94a3b8';
            }
        });
}

// ページ読み込み時に実行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateServerStatus);
} else {
    updateServerStatus();
}

// 30秒ごとに更新
setInterval(updateServerStatus, 30000);


// Copy function removed: Handled directly in index.mdx for simplicity.




// GSAP Loader & Animation
function loadGSAPAnimation() {
    const gsapUrl = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    const stUrl = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js";

    function loadScript(url) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${url}"]`)) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = url;
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

    Promise.all([loadScript(gsapUrl), loadScript(stUrl)])
        .then(() => {
            // Wait a moment for ScrollTrigger to fully register
            setTimeout(() => {
                if (window.gsap && window.ScrollTrigger) {
                    window.gsap.registerPlugin(window.ScrollTrigger);

                    window.gsap.utils.toArray(".highlight").forEach(el => {
                        const targetColor = el.dataset.color || "#005bac"; // Use data-color or fallback

                        window.gsap.to(el, {
                            color: targetColor,
                            fontWeight: "900", // Make it slightly bolder too for emphasis
                            scrollTrigger: {
                                trigger: el,
                                start: "top 75%", // Adjusted: start a bit later to be more noticeable
                                end: "top 45%",   // adjusted end point
                                scrub: 1,
                                toggleActions: "restart pause reverse pause"
                            }
                        });
                    });
                    console.log('GSAP Animation Initialized Successfully');
                }
            }, 100);
        })
        .catch(err => console.error('GSAP Load Error:', err));
}

// Run GSAP Loader on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadGSAPAnimation);
} else {
    loadGSAPAnimation();
}
