import React from 'react';
import GameBoard from './components/GameBoard';
import ChatBox from './components/ChatBox';

export default function App() {
    return (
        <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center p-4 md:p-8 antialiased text-slate-200">
            {/* Global Container */}
            <div className="w-full max-w-7xl flex flex-col md:flex-row gap-6 h-[auto] md:h-[650px]">
                {/* Main Pro Interface */}
                <GameBoard />
                
                {/* Embedded Real-time & AI Chat System */}
                <ChatBox />
            </div>
        </div>
    );
}
