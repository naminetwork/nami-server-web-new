'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HomePage() {
    const [status, setStatus] = useState<{ online: boolean; players: number }>({
        online: false,
        players: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch('https://mcapi.us/server/status?ip=nami.mcsv.win&port=25565');
                const data = await response.json();
                if (data.online) {
                    setStatus({ online: true, players: data.players.now });
                } else {
                    setStatus({ online: false, players: 0 });
                }
            } catch (error) {
                console.error('Failed to fetch server status:', error);
                setStatus({ online: false, players: 0 });
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
        const interval = setInterval(fetchStatus, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative overflow-hidden w-full min-h-screen bg-[#F0F8FF] dark:bg-[#020617] font-sans text-slate-900 dark:text-slate-200">

            {/* Background Patterns */}
            {/* Background Layers */}
            {/* Premium Modern Wave Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#F0F8FF] dark:bg-[#020617]">

                {/* mesh gradient background */}
                <div className="absolute inset-0 opacity-40 dark:opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-200 via-blue-100 to-transparent dark:from-cyan-900 dark:via-blue-900 dark:to-transparent"></div>
                <div className="absolute inset-0 opacity-40 dark:opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-200 via-slate-100 to-transparent dark:from-indigo-900 dark:via-slate-900 dark:to-transparent"></div>

                {/* Animated Organic Blobs */}
                <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-cyan-400/30 dark:bg-cyan-600/10 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-blue-400/30 dark:bg-blue-600/10 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] bg-indigo-400/30 dark:bg-indigo-600/10 rounded-full mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-4000"></div>

                {/* Grid Overlay for "Tech/Modern" feel */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20"></div>

                {/* Vector Waves - Layer 1 (Back, Slower) */}
                <div className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-slow opacity-60">
                    <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute bottom-0 w-full h-[50vh] text-cyan-200/50 dark:text-cyan-900/20 fill-current">
                        <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>

                {/* Vector Waves - Layer 2 (Front, Faster) */}
                <div className="absolute bottom-0 left-0 w-[200%] h-full animate-wave-medium opacity-80">
                    <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="absolute bottom-0 w-full h-[40vh] text-blue-300/50 dark:text-blue-800/20 fill-current">
                        <path d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </div>

            {/* Hero Section */}
            <div className="relative z-10 pt-32 pb-20 px-6 text-center">

                {/* Decorative Ocean Orbs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-gradient-to-tr from-cyan-300/30 to-blue-400/30 dark:bg-cyan-900/5 rounded-full blur-[130px] pointer-events-none -z-10"></div>

                <div className="absolute top-0 left-10 w-[500px] h-[500px] bg-blue-300/30 dark:bg-blue-800/5 rounded-full blur-[100px] pointer-events-none -z-10 animate-float" style={{ animationDuration: '15s' }}></div>

                <div className="absolute bottom-0 right-10 w-[600px] h-[600px] bg-cyan-200/40 dark:bg-cyan-800/5 rounded-full blur-[110px] pointer-events-none -z-10 animate-float" style={{ animationDuration: '18s', animationDelay: '2s' }}></div>

                <div className="animate-float">
                    <h1
                        className="text-6xl md:text-8xl font-black mb-4 drop-shadow-sm tracking-tight font-heading pb-2"
                        style={{
                            background: 'linear-gradient(to right, #06b6d4, #2563eb)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            color: 'transparent'
                        }}
                    >
                        Nami Network
                    </h1>
                    <p className="text-lg md:text-2xl font-bold text-slate-500 dark:text-slate-400 mb-12">
                        24時間誰でも参加可能
                    </p>
                </div>

                {/* Hero Main Card (Address) */}
                <div className="max-w-md mx-auto mb-16 relative group">
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/20 to-blue-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="relative flex flex-col items-center gap-4">

                        {/* Static Address Display */}
                        <div className="w-full bg-white/90 dark:bg-slate-900/40 backdrop-blur-xl rounded-full py-6 px-10 flex items-center justify-center border border-white/50 dark:border-white/5 shadow-xl">
                            <div className="text-center">
                                <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest mb-1 flex items-center justify-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    Java版 / 統合版 IP
                                </div>
                                <div className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 font-heading tracking-tight select-all">Play.NamiNetwork.jp</div>
                            </div>
                        </div>

                        {/* Port & ID & Link (Bottom) */}
                        <div className="flex items-center justify-center gap-3 w-full">
                            <div className="flex-1 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl py-2 px-3 text-center border border-white/40 dark:border-white/5">
                                <div className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase">統合版ポート</div>
                                <div className="text-2xl font-black text-slate-700 dark:text-slate-200">3128</div>
                            </div>
                            <div className="flex-1 bg-white/60 dark:bg-slate-900/40 backdrop-blur-md rounded-2xl py-2 px-3 text-center border border-white/40 dark:border-white/5">
                                <div className="text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase">フレンド参加</div>
                                <div className="text-xl font-black text-slate-700 dark:text-slate-200">nami79156</div>
                            </div>
                            <Link href="/docs/wiki/getting-started" className="flex-none w-12 h-auto aspect-square bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg hover:scale-105 active:scale-95 transition-transform" title="参加方法">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>

            {/* Wave Separator 1 */}
            <div className="w-full relative z-10 -mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full text-white dark:text-[#020617] fill-current translate-y-[1px]">
                    <path fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

            {/* Content Section */}
            <div className="bg-white dark:bg-[#020617] relative z-20 pb-40">

                {/* Floating Cards */}
                <div className="px-6 pb-32 -mt-12 sm:-mt-20 relative z-30">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                        <a href="https://discord.gg/cd33Z4ts3U" className="flex-1 bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-[4rem] nami-card-premium p-10 shadow-xl hover:-translate-y-2 transition-transform relative overflow-hidden group">
                            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
                            <div className="relative z-10 text-center">
                                <svg className="w-20 h-20 mx-auto mb-6" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.086 2.176 2.419 0 1.334-.966 2.419-2.176 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.086 2.176 2.419 0 1.334-.966 2.419-2.176 2.419z" /></svg>
                                <div className="text-3xl font-black mb-4 tracking-tight">コミュニティ</div>
                                <div className="bg-white/20 backdrop-blur-md rounded-full px-8 py-2 inline-block text-[14px] font-bold border border-white/20">合計 1000人以上</div>
                            </div>
                        </a>
                        <a href="https://earthmap.naminetwork.jp/" className="flex-1 bg-gradient-to-br from-cyan-500 to-emerald-600 text-white rounded-[4rem] nami-card-premium p-10 shadow-xl hover:-translate-y-2 transition-transform relative overflow-hidden group">
                            <div className="absolute top-0 left-0 -ml-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
                            <div className="relative z-10 text-center">
                                <svg className="w-20 h-20 mx-auto mb-6" viewBox="0 0 24 24" fill="currentColor"><path d="M15,21l-6-3.1L3.3,21.3c-0.2,0.1-0.4,0.1-0.6-0.1C2.5,21.1,2.5,21,2.5,20.8V6.5c0-0.2,0.1-0.3,0.2-0.4l6-3c0.1-0.1,0.3-0.1,0.4,0L15,6.1l5.7-2.9c0.2-0.1,0.4-0.1,0.6,0.1c0.1,0.1,0.2,0.3,0.2,0.4v14.3c0,0.2-0.1,0.3-0.2,0.4L15,21z M9,5.1l5,2.6v11.3l-5-2.6V5.1z" /></svg>
                                <div className="text-3xl font-black mb-4 tracking-tight">ライブマップ</div>
                                <div className="bg-white/20 backdrop-blur-md rounded-full px-8 py-2 inline-block text-[14px] font-bold border border-white/20">リアルタイム確認</div>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center text-center px-6 mb-24">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 drop-shadow-sm tracking-tight mb-8">
                        なみサーバーとは？
                    </h2>
                    <div className="max-w-3xl mx-auto text-center px-6">
                        <p className="text-slate-600 dark:text-slate-400 leading-loose text-xl font-medium">
                            なみサーバーは2025年8月に公開された<span className="font-black text-[#06b6d4]">クロスプレイ対応</span>サーバーです。<br />
                            初心者からベテランまで、あらゆるマイクラプレイヤーが自由に冒険を楽しめる場所を目指しています。
                        </p>
                        <div className="mt-8">
                            <a href="https://www.youtube.com/@Lunaa_MC" target="_blank" className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF0000] text-white font-bold rounded-2xl shadow-lg hover:bg-[#CC0000] transition-all hover:-translate-y-1 active:scale-95">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                <span>YouTube チャンネル</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 px-6 pb-40 max-w-7xl mx-auto space-y-32">
                    {/* NamiEarth */}
                    <div className="flex flex-col md:flex-row items-center gap-16 group">
                        <div className="flex-1 w-full order-1">
                            <div className="bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-[3rem] p-1 shadow-2xl transform group-hover:rotate-1 transition-transform duration-500">
                                <div className="bg-white dark:bg-slate-900 rounded-[2.9rem] overflow-hidden relative h-64 md:h-80 flex items-center justify-center text-9xl">
                                    <span className="group-hover:scale-110 transition-transform duration-500">🌍</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 order-2">
                            <div className="px-4">
                                <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 mb-6 tracking-tight">
                                    国家やショップ運営 <span className="font-black text-[#0ea5e9]">NamiEarth</span>
                                </h2>
                                <p className="text-xl text-slate-800 dark:text-slate-300 leading-relaxed font-medium mb-10">
                                    実際の地球を再現した広大なマップで、本格的な経済活動を体験しよう。「金（ゴールド）」を通貨として、土地の売買や<span className="font-bold text-[#f59e0b]">街・国家運営</span>が可能。<br />
                                    ショップを開いて商売を楽しんだり、仲間と協力して世界最強の国を目指そう。
                                </p>
                                <Link href="/docs/wiki/namiearth" className="inline-flex items-center text-lg font-bold text-cyan-500 hover:text-cyan-600 transition-colors group">
                                    詳細を見る <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Survival */}
                    <div className="flex flex-col md:flex-row items-center gap-16 group">
                        <div className="flex-1 order-2 md:order-1">
                            <div className="px-4 text-right">
                                <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 mb-6 tracking-tight">
                                    のんびり遊ぶ<span className="font-black text-[#22c55e]">サバイバル鯖</span>
                                </h2>
                                <p className="text-xl text-slate-800 dark:text-slate-300 leading-relaxed font-medium mb-10">
                                    マイクラ本来の自由な建築と冒険を存分に。サバイバル鯖は、あなたのこだわりを形にするための場所。<br />
                                    土地の保護機能を利用すれば荒らしの心配はありません。理想の拠点を作り上げよう。
                                </p>
                                <Link href="/docs/wiki/getting-started" className="inline-flex items-center text-lg font-bold text-blue-500 hover:text-blue-600 transition-colors group">
                                    詳細を見る <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                            </div>
                        </div>
                        <div className="flex-1 w-full order-1 md:order-2">
                            <div className="bg-gradient-to-bl from-blue-400 to-indigo-600 rounded-[3rem] p-1 shadow-2xl transform group-hover:-rotate-1 transition-transform duration-500">
                                <div className="bg-white dark:bg-slate-900 rounded-[2.9rem] overflow-hidden relative h-64 md:h-80 flex items-center justify-center text-9xl">
                                    <span className="group-hover:scale-110 transition-transform duration-500">🌳</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chicken Bomber */}
                    <div className="flex flex-col md:flex-row items-center gap-16 group">
                        <div className="flex-1 w-full order-1">
                            <div className="bg-gradient-to-tr from-orange-400 to-red-500 rounded-[3rem] p-1 shadow-2xl transform group-hover:rotate-1 transition-transform duration-500">
                                <div className="bg-white dark:bg-slate-900 rounded-[2.9rem] overflow-hidden relative h-64 md:h-80 flex items-center justify-center text-9xl">
                                    <span className="group-hover:scale-110 transition-transform duration-500">🐔</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 order-2">
                            <div className="px-4">
                                <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 mb-6 tracking-tight">
                                    <span className="text-[#ef4444]">Chicken Bomber</span>
                                </h2>
                                <p className="text-xl text-slate-800 dark:text-slate-300 leading-relaxed font-medium mb-10">
                                    空を舞うニワトリ、はじける爆音。Chicken Bomberは究極のハチャメチャ爆走バトル. 爆弾を抱えたニワトリを投げつけ合い、最後まで生き残れ！
                                </p>
                                <Link href="/docs/wiki/chicken-bomber" className="inline-flex items-center text-lg font-bold text-orange-500 hover:text-orange-600 transition-colors group">
                                    詳細を見る <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Magical Sheep */}
                    <div className="flex flex-col md:flex-row items-center gap-16 group">
                        <div className="flex-1 order-2 md:order-1">
                            <div className="px-4 text-right">
                                <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-slate-100 mb-6 tracking-tight">
                                    <span className="text-[#d946ef]">Magical Sheep</span>
                                </h2>
                                <p className="text-xl text-slate-800 dark:text-slate-300 leading-relaxed font-medium mb-10">
                                    もふもふの羊たちが、多彩な魔法を解き放つ。一見かわいらしいフィールドは、一瞬でスキルの乱舞へと変貌する。羊を操り、魔法を駆使してライバルたちを圧倒しよう。
                                </p>
                                <Link href="/docs/wiki/magical-sheep" className="inline-flex items-center text-lg font-bold text-purple-500 hover:text-purple-600 transition-colors group">
                                    詳細を見る <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                            </div>
                        </div>
                        <div className="flex-1 w-full order-1 md:order-2">
                            <div className="bg-gradient-to-bl from-purple-400 to-indigo-600 rounded-[3rem] p-1 shadow-2xl transform group-hover:-rotate-1 transition-transform duration-500">
                                <div className="bg-white dark:bg-slate-900 rounded-[2.9rem] overflow-hidden relative h-64 md:h-80 flex items-center justify-center text-9xl">
                                    <span className="group-hover:scale-110 transition-transform duration-500">🐑</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Section At Bottom with Stats */}
                <div className="px-6 py-20 bg-white dark:bg-[#020617]">
                    <div className="max-w-2xl mx-auto bg-white dark:bg-slate-900/50 rounded-[3rem] p-12 shadow-xl border-2 border-slate-100 dark:border-slate-800 relative overflow-hidden">

                        {/* Status Indicator (Top Right) */}
                        <div className="absolute top-8 right-8 flex items-center gap-2 bg-slate-50 dark:bg-black/20 rounded-full px-4 py-1.5 border border-slate-100 dark:border-slate-700">
                            <div className={`relative flex h-3 w-3 ${status.online ? '' : 'hidden'}`}>
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </div>
                            <span className={`text-xs font-black uppercase tracking-widest ${status.online ? 'text-[#059669]' : 'text-[#e11d48]'}`}>
                                {loading ? '取得中...' : (status.online ? 'オンライン' : 'オフライン')}
                            </span>
                        </div>

                        <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-10 text-center tracking-tight">サーバーステータス</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            {/* Online Player Count */}
                            <div className="text-center md:border-r border-slate-100 dark:border-slate-700/50 md:pr-6">
                                <div className="flex items-baseline justify-center gap-2 mb-2">
                                    <span className="text-7xl font-black text-slate-800 dark:text-slate-100 tracking-tighter">
                                        {status.players}
                                    </span>
                                    <span className="text-2xl font-bold text-slate-400">人</span>
                                </div>
                                <div className="text-xs font-bold text-blue-500 uppercase tracking-widest opacity-80">現在接続中のプレイヤー</div>
                            </div>

                            {/* Statistics merged here */}
                            <div className="space-y-6 text-center md:text-left md:pl-6">
                                <div>
                                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">累計ユーザー数</div>
                                    <div className="text-3xl font-black text-slate-700 dark:text-slate-200 tracking-tight">3,000人以上 <span className="text-sm font-medium opacity-60">突破</span></div>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">最大同時接続数</div>
                                    <div className="text-3xl font-black text-slate-700 dark:text-slate-200 tracking-tight">120人 <span className="text-sm font-medium opacity-60">接続</span></div>
                                </div>
                            </div>
                        </div>

                        <p className="text-center text-[10px] text-slate-400 mt-10 font-bold tracking-widest uppercase opacity-60">2026年1月時点の統計</p>
                    </div>
                </div>

            </div>

            {/* Footer Section */}
            <div className="relative z-10 bg-white dark:bg-[#020617] border-t border-slate-100 dark:border-slate-800 py-12 text-center text-slate-400 dark:text-slate-500 text-sm font-medium">
                <p>&copy; 2026 Nami Network. All rights reserved.</p>
                <p className="mt-2">Not affiliated with Mojang Studios.</p>
            </div>
        </div>
    );
}
