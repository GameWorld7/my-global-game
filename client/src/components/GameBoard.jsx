import React from 'react';

export default function GameBoard() {
    return (
        <div className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Neon Background Glow Element */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            {/* Top Bar */}
            <div className="flex justify-between items-center border-b border-slate-800 pb-4 z-10">
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-white bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
                        NEBULA ARENA <span className="text-xs text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded ml-2 uppercase tracking-widest font-mono">v2.4 Pro</span>
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">Global Server Time Matchmaking Active</p>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Your Ranking</span>
                        <span className="text-sm font-mono font-bold text-amber-400">#142 Global</span>
                    </div>
                </div>
            </div>

            {/* Main Interactive HUD Canvas Grid */}
            <div className="flex-1 my-6 rounded-xl border border-dashed border-slate-800 flex flex-col items-center justify-center p-8 bg-slate-900/30 backdrop-blur-sm z-10">
                <div className="w-16 h-16 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center animate-bounce mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-lg font-bold text-slate-200">Main Gameplay Viewport</h2>
                <p className="text-xs text-slate-500 max-w-sm text-center mt-2 leading-relaxed">
                    USA servers optimize latency using WebSocket technology. Matchmaking pool contains players from New York, Frankfurt, and Tokyo clusters.
                </p>
                <button className="mt-6 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-98">
                    LAUNCH QUICK MATCH
                </button>
            </div>

            {/* Server Stats footer */}
            <div className="flex justify-between items-center text-[11px] text-slate-500 border-t border-slate-800 pt-4 font-mono z-10">
                <span>PING: <span className="text-emerald-400 font-bold">24ms</span></span>
                <span>PACKET LOSS: <span className="text-slate-400 font-bold">0%</span></span>
                <span>ONLINE USERS: <span className="text-indigo-400 font-bold">42,105</span></span>
            </div>
        </div>
    );
}
