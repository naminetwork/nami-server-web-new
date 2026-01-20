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


/**
 * Custom Search Implementation
 */
let searchIndex = null;

async function getIndex() {
    if (searchIndex) return searchIndex;
    try {
        const resp = await fetch('/search-index.json');
        searchIndex = await resp.json();
        return searchIndex;
    } catch (e) {
        console.error('Failed to load search index:', e);
        return [];
    }
}

async function initCustomSearch() {
    // 1. Create Modal UI
    const modal = document.createElement('div');
    modal.id = 'custom-search-modal';
    modal.className = 'fixed inset-0 bg-slate-900/50 backdrop-blur-sm hidden flex items-start justify-center pt-[10vh] px-4';
    modal.innerHTML = `
        <div class="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div class="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <input type="text" id="custom-search-input" placeholder="情報を検索..." class="w-full bg-transparent border-none outline-none text-lg text-slate-800 dark:text-slate-100 placeholder-slate-400" autofocus>
                <kbd class="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-[10px] text-slate-500 font-bold uppercase">ESC</kbd>
            </div>
            <div id="custom-search-results" class="max-h-[60vh] overflow-y-auto p-2 space-y-1">
                <div class="p-4 text-center text-slate-400 text-sm">キーワードを入力して検索...</div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const input = document.getElementById('custom-search-input');
    const resultsContainer = document.getElementById('custom-search-results');

    // 2. Search Logic
    function performSearch(query) {
        if (!query.trim() || !searchIndex) {
            resultsContainer.innerHTML = '<div class="p-4 text-center text-slate-400 text-sm">キーワードを入力して検索...</div>';
            return;
        }

        const lowerQuery = query.toLowerCase();
        const results = searchIndex.filter(item =>
            item.title.toLowerCase().includes(lowerQuery) ||
            item.description.toLowerCase().includes(lowerQuery) ||
            item.content.toLowerCase().includes(lowerQuery)
        ).slice(0, 8); // Top 8 results

        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="p-4 text-center text-slate-400 text-sm">見つかりませんでした。</div>';
            return;
        }

        resultsContainer.innerHTML = results.map(item => `
            <a href="${item.url}" class="search-item group block p-4 rounded-2xl hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all duration-200 border border-transparent hover:border-sky-100 dark:hover:border-sky-800">
                <div class="flex items-center gap-2 mb-1">
                    <svg class="w-4 h-4 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    <div class="font-black text-slate-800 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">${item.title}</div>
                </div>
                ${item.description ? `<div class="text-[11px] text-slate-500 dark:text-slate-400 mb-2 font-bold uppercase tracking-tight">${item.description}</div>` : ''}
                <div class="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed opacity-80">${item.content.substring(0, 160).replace(/[#*`]/g, '')}...</div>
            </a>
        `).join('');
    }

    // 4. Events
    input.addEventListener('input', (e) => performSearch(e.target.value));

    // Close on ESC or click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });

    document.addEventListener('keydown', async (e) => {
        // Toggle search with '/' or 'Cmd/Ctrl + K'
        if ((e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
            e.preventDefault();
            modal.classList.remove('hidden');
            input.focus();
            await getIndex(); // Lazy load index
        }
        if (e.key === 'Escape') {
            modal.classList.add('hidden');
        }
    });
}

/**
 * Inject a visible search button since we hid the default one
 */
function injectSearchButton() {
    if (document.getElementById('custom-search-trigger')) return true;

    // Try multiple possible locations in order of preference
    const targets = [
        '#search-bar-entry',
        '.SearchBarEntry',
        'header nav',
        'header div[class*="Header"]',
        '#navbar',
        'header'
    ];

    let target = null;
    for (const sel of targets) {
        target = document.querySelector(sel);
        if (target) break;
    }

    if (!target) return false;

    const btn = document.createElement('button');
    btn.id = 'custom-search-trigger';
    btn.className = 'flex items-center gap-2 p-2 px-4 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-sky-500 dark:hover:text-sky-400 transition-all text-sm font-black ml-4 shadow-sm';
    btn.style.cssText = 'display: flex !important; visibility: visible !important; opacity: 1 !important; z-index: 9999 !important; pointer-events: auto !important;';
    btn.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        <span class="hidden sm:inline">検索...</span>
        <kbd class="hidden md:inline-flex ml-2 px-1.5 py-0.5 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 text-[10px] opacity-60">/</kbd>
    `;

    btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById('custom-search-modal').classList.remove('hidden');
        document.getElementById('custom-search-input').focus();
        getIndex();
    };

    // If it's a specific wrapper, replace content; otherwise append
    if (target.id === 'search-bar-entry' || target.classList.contains('SearchBarEntry')) {
        target.innerHTML = '';
        target.appendChild(btn);
        target.style.display = 'block';
        target.style.visibility = 'visible';
    } else {
        target.appendChild(btn);
    }

    console.log('Search button injected into:', target);
    return true;
}

/**
 * Aggressive cleanup for the default Mintlify search bar
 */
/**
 * Aggressive cleanup for the default Mintlify search bar
 */
function nukeDefaultSearch() {
    const selectors = [
        '#search-bar-entry > *:not(#custom-search-trigger)',
        '.SearchInput:not(#custom-search-trigger)',
        '.SearchBarEntryMobile',
        '[aria-label="Search"]:not(#custom-search-trigger)',
        '.Search-button:not(#custom-search-trigger)',
        '.Search-trigger:not(#custom-search-trigger)',
        'button:has(svg[class*="search"]):not(#custom-search-trigger)'
    ];

    selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => {
            el.style.setProperty('display', 'none', 'important');
            el.style.setProperty('visibility', 'hidden', 'important');
        });
    });
}

/**
 * Main Search System Controller
 */
function startSearchSystem() {
    initCustomSearch();
    getIndex();

    // 1. Initial attempt
    const injected = injectSearchButton();
    nukeDefaultSearch();

    // 2. Use MutationObserver to watch for DOM changes (Mintlify often re-renders)
    const observer = new MutationObserver(() => {
        const hasButton = !!document.getElementById('custom-search-trigger');
        if (!hasButton) injectSearchButton();
        nukeDefaultSearch();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // 3. Fallback: If header injection doesn't yield a result within 3s, show floating button
    setTimeout(() => {
        if (!document.getElementById('custom-search-trigger')) {
            createFloatingSearchFallback();
        }
    }, 3000);
}

function createFloatingSearchFallback() {
    if (document.getElementById('custom-search-fallback')) return;
    const btn = document.createElement('button');
    btn.id = 'custom-search-fallback';
    btn.className = 'fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-full shadow-[0_0_20px_rgba(14,165,233,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-[9999] border-4 border-white dark:border-slate-800';
    btn.innerHTML = `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>`;
    btn.onclick = () => {
        document.getElementById('custom-search-modal').classList.remove('hidden');
        document.getElementById('custom-search-input').focus();
        getIndex();
    };
    document.body.appendChild(btn);
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startSearchSystem);
} else {
    startSearchSystem();
}
