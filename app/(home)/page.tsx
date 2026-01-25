'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
    Globe,
    Home,
    Zap,
    HelpCircle,
    Map as MapIcon,
    Users,
    Server,
    ChevronRight,
    Copy,
    Check,
    ArrowRight,
    Play,
    BookOpen
} from 'lucide-react';

// Custom Icons - Styled Emoji
const IconNamiEarth = ({ className }: { className?: string }) => (
    <div className={`text-[140px] ${className}`} style={{
        fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
        filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))',
        textShadow: '0 0 20px rgba(96, 165, 250, 0.3)'
    }}>🌍</div>
);

const IconSurvival = ({ className }: { className?: string }) => (
    <div className={`text-[140px] ${className}`} style={{
        fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
        filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))',
        textShadow: '0 0 20px rgba(52, 211, 153, 0.3)'
    }}>🏠</div>
);

const IconChickenBomb = ({ className }: { className?: string }) => (
    <div className={`text-[140px] ${className}`} style={{
        fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
        filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))',
        textShadow: '0 0 20px rgba(251, 146, 60, 0.3)'
    }}>🐔</div>
);

const IconMagicalSheep = ({ className }: { className?: string }) => (
    <div className={`text-[140px] ${className}`} style={{
        fontFamily: '"Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif',
        filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))',
        textShadow: '0 0 20px rgba(168, 85, 247, 0.3)'
    }}>🐑</div>
);

export default function HomePage() {
    const [status, setStatus] = useState<{ online: boolean; players: number }>({
        online: false,
        players: 0,
    });
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [totalUsers, setTotalUsers] = useState(0);
    const [maxPlayers, setMaxPlayers] = useState(0);
    const [hasCountedStats, setHasCountedStats] = useState(false);

    // Scroll Fade-in Animation
    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');

                    // Trigger counter animation when stats section becomes visible
                    if (entry.target.classList.contains('stats-trigger') && !hasCountedStats) {
                        setHasCountedStats(true);
                        animateCounters();
                    }
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, [hasCountedStats]);

    // Counter Animation Function
    const animateCounters = () => {
        const duration = 2000; // 2 seconds
        const targetTotal = 3000;
        const targetMax = 120;
        const steps = 60;
        const incrementTotal = targetTotal / steps;
        const incrementMax = targetMax / steps;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            setTotalUsers(Math.floor(incrementTotal * currentStep));
            setMaxPlayers(Math.floor(incrementMax * currentStep));

            if (currentStep >= steps) {
                clearInterval(timer);
                setTotalUsers(targetTotal);
                setMaxPlayers(targetMax);
            }
        }, duration / steps);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText('Play.NamiNetwork.jp');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

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
        <div className="relative w-full min-h-screen font-sans overflow-x-hidden bg-sky-100 text-slate-800">

            {/* HERO SECTION - Blue Sky */}
            <header className="relative w-full pt-32 pb-40 px-6 overflow-hidden">
                {/* Clearer Blue Sky Background Gradient - Full Header */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-sky-200 via-sky-300 to-blue-400 -z-10"></div>

                {/* Cloud Effects */}
                <div className="absolute top-20 left-10 w-40 h-40 bg-white rounded-full blur-3xl opacity-40 animate-float" style={{ animationDuration: '8s' }}></div>
                <div className="absolute top-60 right-10 w-60 h-60 bg-white rounded-full blur-[100px] opacity-30 animate-float" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>

                <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10 animate-fade-in-up">

                    <h1 className="text-[5rem] md:text-[8rem] font-black mb-6 leading-[0.9] tracking-tighter drop-shadow-sm select-none">
                        <span className="text-[#00A0E9]">
                            Nami Network
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl font-bold text-blue-600 mb-14 tracking-widest uppercase bg-white/50 backdrop-blur-sm px-6 py-2 rounded-full shadow-sm">
                        24時間誰でも参加可能
                    </p>

                    {/* Server Address & Copy Section */}
                    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto mb-12">
                        {/* Upper Row: IP Address + Copy Button */}
                        <div className="flex gap-4 h-24">
                            {/* IP Address Card */}
                            <div className="flex-[3] bg-white rounded-3xl shadow-[0_8px_20px_-8px_rgba(59,130,246,0.3)] flex flex-col items-center justify-center relative group transition-transform hover:-translate-y-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">JAVA版 / 統合版 IP</span>
                                <span className="text-2xl md:text-4xl font-black text-[#003366] tracking-tight">Play.NamiNetwork.jp</span>
                            </div>

                            {/* Copy Button */}
                            <button
                                onClick={copyToClipboard}
                                className="flex-1 bg-[#003366] hover:bg-[#004080] text-white rounded-3xl shadow-[0_8px_16px_-6px_rgba(0,51,102,0.4)] flex flex-col items-center justify-center transition-all active:scale-95 group"
                            >
                                <div className="relative">
                                    <Copy className={`w-8 h-8 mb-1 transition-all duration-300 ${copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`} />
                                    <Check className={`w-8 h-8 mb-1 absolute top-0 left-0 text-emerald-400 transition-all duration-300 ${copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0 rotate-45'}`} />
                                </div>
                                <span className="text-xs font-bold">{copied ? 'COPIED!' : 'コピー'}</span>
                            </button>
                        </div>

                        {/* Lower Row: Port & Friend Cards */}
                        <div className="flex gap-4 h-24">
                            {/* Port Card */}
                            <div className="flex-1 bg-white rounded-3xl shadow-[0_8px_20px_-8px_rgba(59,130,246,0.3)] flex flex-col items-center justify-center hover:-translate-y-1 transition-transform">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">統合版ポート</span>
                                <span className="text-3xl font-black text-[#003366]">19132</span>
                            </div>

                            {/* Friend Code Card */}
                            <div className="flex-1 bg-white rounded-3xl shadow-[0_8px_20px_-8px_rgba(59,130,246,0.3)] flex flex-col items-center justify-center hover:-translate-y-1 transition-transform">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">フレンド参加</span>
                                <span className="text-2xl font-black text-[#003366]">NAMINETWORK1</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-6 justify-center">
                        <Link
                            href="/docs/wiki/getting-started"
                            className="bg-white text-[#003366] px-10 py-5 rounded-full font-black text-lg shadow-[0_8px_20px_-8px_rgba(59,130,246,0.4)] hover:shadow-[0_12px_24px_-8px_rgba(59,130,246,0.5)] hover:-translate-y-1 transition-all flex items-center gap-3"
                        >
                            <BookOpen size={24} className="text-blue-400" />
                            参加方法を見る
                        </Link>
                        <a
                            href="http://play.naminetwork.jp:8100/"
                            target="_blank"
                            className="bg-[#00A0E9] text-white px-10 py-5 rounded-full font-black text-lg shadow-[0_8px_20px_-8px_rgba(0,160,233,0.4)] hover:shadow-[0_12px_24px_-8px_rgba(0,160,233,0.5)] hover:bg-[#008CC9] hover:-translate-y-1 transition-all flex items-center gap-3"
                        >
                            <MapIcon size={24} />
                            ライブマップ
                        </a>
                    </div>
                </div>

                {/* 4-Layer Animated Wave Separator (Blue Ocean) */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] translate-y-[1px]">
                    <svg className="relative block w-full h-[60px] md:h-[100px]" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                        <defs>
                            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                        </defs>
                        <g className="parallax-waves">
                            {/* Layer 1 - Lightest Blue */}
                            <g>
                                <use xlinkHref="#gentle-wave" x="0" y="0" fill="rgba(186, 230, 253, 0.7)" /> {/* sky-200 */}
                                <use xlinkHref="#gentle-wave" x="352" y="0" fill="rgba(186, 230, 253, 0.7)" />
                                <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="-352" dur="7s" repeatCount="indefinite" />
                            </g>
                            {/* Layer 2 - Light Blue */}
                            <g>
                                <use xlinkHref="#gentle-wave" x="0" y="3" fill="rgba(125, 211, 252, 0.5)" /> {/* sky-300 */}
                                <use xlinkHref="#gentle-wave" x="352" y="3" fill="rgba(125, 211, 252, 0.5)" />
                                <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="-352" dur="10s" repeatCount="indefinite" />
                            </g>
                            {/* Layer 3 - Medium Blue */}
                            <g>
                                <use xlinkHref="#gentle-wave" x="0" y="5" fill="rgba(56, 189, 248, 0.3)" /> {/* sky-400 */}
                                <use xlinkHref="#gentle-wave" x="352" y="5" fill="rgba(56, 189, 248, 0.3)" />
                                <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="-352" dur="13s" repeatCount="indefinite" />
                            </g>
                            {/* Layer 4 - Matches 'About' Section (Blue-400) */}
                            <g>
                                <use xlinkHref="#gentle-wave" x="0" y="7" fill="#60A5FA" /> {/* blue-400 */}
                                <use xlinkHref="#gentle-wave" x="352" y="7" fill="#60A5FA" />
                                <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0" to="-352" dur="20s" repeatCount="indefinite" />
                            </g>
                        </g>
                    </svg>
                </div>
            </header>

            {/* ABOUT SECTION - Blue 400 -> Blue 500 Transition */}
            <section className="bg-gradient-to-b from-blue-400 to-blue-500 py-20 px-6">
                <div className="max-w-4xl mx-auto text-center animate-on-scroll opacity-0">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-8 drop-shadow-md">なみサーバーとは？</h2>
                    <p className="text-white text-xl font-bold leading-loose">
                        なみサーバーは2025年8月に公開された<span className="text-blue-600 bg-white px-2 py-1 rounded-full mx-1 shadow-sm">クロスプレイ対応</span>サーバーです。<br />
                        初心者からベテランまで、あらゆるマイクラプレイヤーが自由に冒険を楽しめる場所を目指しています。
                    </p>
                    <div className="mt-10">
                        <a href="https://www.youtube.com/@Lunaa_MC" target="_blank" className="inline-flex items-center gap-2 bg-[#FF0000] text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-[#CC0000] hover:scale-105 transition-all border-2 border-white/20">
                            <Play size={24} fill="currentColor" /> <span className="text-lg">YouTube チャンネル</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* GAME MODES - Blue 500 -> Blue 600 Transition */}
            <section className="bg-gradient-to-b from-blue-500 to-blue-600 py-24 px-6">
                <div className="max-w-6xl mx-auto flex flex-col gap-16">
                    <div className="text-center mb-8">
                        <h2 className="text-4xl md:text-5xl font-black text-white drop-shadow-md">サーバー一覧</h2>
                    </div>

                    {/* NamiEarth Card */}
                    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col md:flex-row items-center gap-10 recruit-card group border-4 border-transparent hover:border-cyan-100 animate-on-scroll opacity-0">
                        <div className="flex-1 w-full order-1">
                            <div className="h-64 rounded-[2.5rem] bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white shadow-inner group-hover:rotate-1 transition-transform">
                                <IconNamiEarth className="drop-shadow-lg group-hover:scale-110 transition-transform duration-500" />
                            </div>
                        </div>
                        <div className="flex-1 w-full order-2">
                            <h3 className="text-3xl font-black text-[#003366] mb-4">
                                国家やショップ運営 <span className="text-[#00A0E9]">NamiEarth</span>
                            </h3>
                            <p className="text-slate-600 font-bold leading-relaxed mb-8">
                                実際の地球を再現した広大なマップで、本格的な経済活動を体験しよう。「金（ゴールド）」を通貨として、土地の売買や街・国家運営が可能。<br />
                                ショップを開いて商売を楽しんだり、仲間と協力して世界最強の国を目指そう。
                            </p>
                            <Link href="/docs/wiki/namiearth" className="inline-flex items-center text-lg font-black text-[#00A0E9] hover:underline bg-cyan-50 px-6 py-3 rounded-full group-hover:bg-[#00A0E9] group-hover:text-white transition-all">
                                詳細を見る <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Survival Card */}
                    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col md:flex-row items-center gap-10 recruit-card group border-4 border-transparent hover:border-green-100 animate-on-scroll opacity-0">
                        <div className="flex-1 w-full order-2 md:order-1">
                            <h3 className="text-3xl font-black text-[#003366] mb-4">
                                のんびり遊ぶ <span className="text-green-500">サバイバル鯖</span>
                            </h3>
                            <p className="text-slate-600 font-bold leading-relaxed mb-8">
                                土地保護機能で安全に建築を楽しめる、のんびりとしたサバイバルモード。<br />
                                マイクラ本来の自由な冒険と建築を、荒らしの心配なく存分に楽しめます。
                            </p>
                            <Link href="/docs/wiki/survival" className="inline-flex items-center text-lg font-black text-green-500 hover:underline bg-green-50 px-6 py-3 rounded-full group-hover:bg-green-500 group-hover:text-white transition-all">
                                詳細を見る <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>
                        <div className="flex-1 w-full order-1 md:order-2">
                            <div className="h-64 rounded-[2.5rem] bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white shadow-inner group-hover:-rotate-1 transition-transform">
                                <IconSurvival className="drop-shadow-lg group-hover:scale-110 transition-transform duration-500" />
                            </div>
                        </div>
                    </div>

                    {/* Chicken Bomber Card */}
                    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col md:flex-row items-center gap-10 recruit-card group border-4 border-transparent hover:border-red-100 animate-on-scroll opacity-0">
                        <div className="flex-1 w-full order-1">
                            <div className="h-64 rounded-[2.5rem] bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white shadow-inner group-hover:rotate-1 transition-transform">
                                <IconChickenBomb className="drop-shadow-lg group-hover:scale-110 transition-transform duration-500" />
                            </div>
                        </div>
                        <div className="flex-1 w-full order-2">
                            <h3 className="text-3xl font-black text-[#003366] mb-4">
                                <span className="text-red-500">Chicken Bomber</span>
                            </h3>
                            <p className="text-slate-600 font-bold leading-relaxed mb-8">
                                ボンバーとサバイバーに分かれて戦う非対称型PVPゲーム。<br />
                                爆弾チキンを配置して全滅を狙うか、でんせつのたまごを集めて逆襲するか。緊張感あふれる駆け引きバトル！
                            </p>
                            <Link href="/docs/wiki/chicken-bomber" className="inline-flex items-center text-lg font-black text-red-500 hover:underline bg-red-50 px-6 py-3 rounded-full group-hover:bg-red-500 group-hover:text-white transition-all">
                                詳細を見る <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Magical Sheep Card */}
                    <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col md:flex-row items-center gap-10 recruit-card group border-4 border-transparent hover:border-purple-100 animate-on-scroll opacity-0">
                        <div className="flex-1 w-full order-2 md:order-1">
                            <h3 className="text-3xl font-black text-[#003366] mb-4">
                                <span className="text-purple-500">Magical Sheep</span>
                            </h3>
                            <p className="text-slate-600 font-bold leading-relaxed mb-8">
                                様々な特殊能力を持つ「羊」を武器にして戦うPVPゲーム。<br />
                                羊を投げて爆発や毒を発生させよう。弓矢で空中起爆も可能な戦略的バトル！
                            </p>
                            <Link href="/docs/wiki/magical-sheep" className="inline-flex items-center text-lg font-black text-purple-500 hover:underline bg-purple-50 px-6 py-3 rounded-full group-hover:bg-purple-500 group-hover:text-white transition-all">
                                詳細を見る <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>
                        <div className="flex-1 w-full order-1 md:order-2">
                            <div className="h-64 rounded-[2.5rem] bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center text-white shadow-inner group-hover:-rotate-1 transition-transform">
                                <IconMagicalSheep className="drop-shadow-lg group-hover:scale-110 transition-transform duration-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ENTRY SECTION - Blue 600 -> Blue 800 Transition */}
            <section className="bg-gradient-to-b from-blue-600 to-blue-800 py-32 px-6 relative overflow-hidden">
                {/* Deep Sea Bubbles */}
                <div className="absolute bottom-[-50px] left-[10%] w-4 h-4 bg-white/10 rounded-full animate-bubble" style={{ animationDuration: '8s', animationDelay: '0s' }}></div>
                <div className="absolute bottom-[-50px] left-[25%] w-8 h-8 bg-white/5 rounded-full animate-bubble" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
                <div className="absolute bottom-[-50px] left-[80%] w-6 h-6 bg-white/10 rounded-full animate-bubble" style={{ animationDuration: '10s', animationDelay: '5s' }}></div>
                <div className="absolute bottom-[-50px] left-[60%] w-3 h-3 bg-white/10 rounded-full animate-bubble" style={{ animationDuration: '15s', animationDelay: '1s' }}></div>
                <div className="absolute bottom-[-50px] left-[40%] w-5 h-5 bg-white/5 rounded-full animate-bubble" style={{ animationDuration: '18s', animationDelay: '7s' }}></div>
                <div className="absolute bottom-[-50px] left-[90%] w-2 h-2 bg-white/10 rounded-full animate-bubble" style={{ animationDuration: '22s', animationDelay: '3s' }}></div>
                <div className="absolute bottom-[-50px] left-[15%] w-4 h-4 bg-white/5 rounded-full animate-bubble" style={{ animationDuration: '14s', animationDelay: '9s' }}></div>
                <div className="absolute bottom-[-50px] left-[70%] w-3 h-3 bg-white/10 rounded-full animate-bubble" style={{ animationDuration: '16s', animationDelay: '4s' }}></div>
                <div className="absolute bottom-[-50px] left-[35%] w-6 h-6 bg-white/5 rounded-full animate-bubble" style={{ animationDuration: '11s', animationDelay: '6s' }}></div>
                <div className="absolute bottom-[-50px] left-[55%] w-2 h-2 bg-white/10 rounded-full animate-bubble" style={{ animationDuration: '20s', animationDelay: '8s' }}></div>

                <div className="max-w-5xl mx-auto text-center stats-trigger animate-on-scroll opacity-0 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-8 drop-shadow-md">なみサーバーで遊ぼう！</h2>
                    <p className="text-blue-50 text-xl font-bold mb-12">
                        初心者の方も大歓迎！今すぐNami Networkのコミュニティに参加して、<br className="hidden md:block" />
                        最高のマイクラライフを始めましょう。
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-6">
                        {/* How to Join Button */}
                        <Link
                            href="/docs/wiki/getting-started"
                            className="flex-1 min-w-[280px] h-24 bg-white hover:bg-slate-100 text-blue-600 px-8 rounded-full shadow-[0_8px_0_#93C5FD] active:shadow-none active:translate-y-[8px] transition-all flex items-center justify-between group"
                        >
                            <span className="text-xl md:text-2xl font-black tracking-tight whitespace-nowrap">参加方法を見る</span>
                            <BookOpen className="w-8 h-8 text-blue-300 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                        </Link>

                        {/* Address Pill Button */}
                        <button
                            onClick={copyToClipboard}
                            className="flex-1 min-w-[280px] h-24 bg-white hover:bg-slate-100 text-blue-600 px-8 rounded-full shadow-[0_8px_0_#93C5FD] active:shadow-none active:translate-y-[8px] transition-all flex flex-col items-center justify-center group"
                        >
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">サーバーアドレス</span>
                            <div className="flex items-center gap-3">
                                <span className="text-xl md:text-2xl font-black tracking-tight whitespace-nowrap">Play.NamiNetwork.jp</span>
                                <Copy className="w-6 h-6 text-blue-300 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                            </div>
                        </button>

                        {/* Discord Pill Button */}
                        <a
                            href="https://discord.gg/cd33Z4ts3U"
                            target="_blank"
                            className="flex-1 min-w-[280px] h-24 bg-[#5865F2] hover:bg-[#4752C4] text-white px-8 rounded-full shadow-[0_8px_0_#3c45a5] active:shadow-none active:translate-y-[8px] transition-all flex items-center justify-between group"
                        >
                            <span className="text-xl md:text-2xl font-black tracking-tight whitespace-nowrap">Discordに参加する</span>
                            <Users className="w-8 h-8 group-hover:scale-110 transition-transform flex-shrink-0" />
                        </a>
                    </div>
                </div>
            </section>

            {/* STATUS FOOTER - Blue 800 -> Blue 950 Transition */}
            <footer className="bg-gradient-to-b from-blue-800 to-blue-950 py-24 px-6 relative z-10 overflow-hidden text-white">
                {/* Abyss Bubbles */}
                <div className="absolute bottom-[-50px] left-[15%] w-2 h-2 bg-white/5 rounded-full animate-bubble" style={{ animationDuration: '20s', animationDelay: '0s' }}></div>
                <div className="absolute bottom-[-50px] left-[45%] w-4 h-4 bg-white/5 rounded-full animate-bubble" style={{ animationDuration: '25s', animationDelay: '5s' }}></div>
                <div className="absolute bottom-[-50px] left-[85%] w-3 h-3 bg-white/5 rounded-full animate-bubble" style={{ animationDuration: '22s', animationDelay: '10s' }}></div>
                <div className="absolute bottom-[-50px] left-[5%] w-5 h-5 bg-white/5 rounded-full animate-bubble" style={{ animationDuration: '18s', animationDelay: '2s' }}></div>
                <div className="absolute bottom-[-50px] left-[95%] w-6 h-6 bg-white/5 rounded-full animate-bubble" style={{ animationDuration: '30s', animationDelay: '15s' }}></div>
                <div className="absolute bottom-[-50px] left-[20%] w-3 h-3 bg-white/10 rounded-full animate-bubble" style={{ animationDuration: '24s', animationDelay: '7s' }}></div>
                <div className="absolute bottom-[-50px] left-[60%] w-5 h-5 bg-white/5 rounded-full animate-bubble" style={{ animationDuration: '28s', animationDelay: '12s' }}></div>
                <div className="absolute bottom-[-50px] left-[30%] w-2 h-2 bg-white/10 rounded-full animate-bubble" style={{ animationDuration: '16s', animationDelay: '3s' }}></div>
                <div className="absolute bottom-[-50px] left-[75%] w-4 h-4 bg-white/5 rounded-full animate-bubble" style={{ animationDuration: '19s', animationDelay: '8s' }}></div>
                <div className="absolute bottom-[-50px] left-[50%] w-6 h-6 bg-white/5 rounded-full animate-bubble" style={{ animationDuration: '32s', animationDelay: '18s' }}></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

                        {/* Status Card */}
                        <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-10 shadow-lg border border-white/10 flex flex-col items-center justify-center text-center animate-on-scroll opacity-0">
                            <div className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-4">サーバー状態</div>
                            <div className={`text-4xl font-black mb-4 ${status.online ? 'text-emerald-300' : 'text-rose-300'}`}>
                                {status.online ? 'ONLINE' : 'OFFLINE'}
                            </div>
                            <div className={`px-4 py-1 rounded-full text-xs font-bold ${status.online ? 'bg-emerald-500/20 text-emerald-200' : 'bg-rose-500/20 text-rose-200'}`}>
                                {status.players}人 接続中
                            </div>
                        </div>

                        {/* Stats 1 */}
                        <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-10 shadow-lg border border-white/10 flex flex-col items-center justify-center text-center animate-on-scroll opacity-0">
                            <div className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-4">累計ユーザー数</div>
                            <div className="text-5xl font-black text-white mb-2">
                                {totalUsers.toLocaleString()}+
                            </div>
                            <div className="px-4 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-200">突破</div>
                        </div>

                        {/* Stats 2 */}
                        <div className="bg-white/10 backdrop-blur-md rounded-[2.5rem] p-10 shadow-lg border border-white/10 flex flex-col items-center justify-center text-center animate-on-scroll opacity-0">
                            <div className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-4">最大同時接続数</div>
                            <div className="text-5xl font-black text-white mb-2">
                                {maxPlayers}
                            </div>
                            <div className="px-4 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-200">記録</div>
                        </div>

                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/10 text-blue-200 text-sm font-bold">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white text-blue-900 rounded-xl flex items-center justify-center font-black">N</div>
                            <span>&copy; 2026 Nami Network. All rights reserved.</span>
                        </div>
                        <div className="flex items-center gap-8">
                            <span>Not affiliated with Mojang Studios.</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
