import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

export default function ChatBox() {
    const [messages, setMessages] = useState([
        { id: '1', sender: 'System', text: 'Welcome to the Global Lobby. Type @ai for tips!', time: '12:00 PM', isSystem: true }
    ]);
    const [inputValue, setInputValue] = useState('');
    const chatEndRef = useRef(null);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessages((prev) => [...prev, data]);
        });
        return () => socket.off('receive_message');
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const newMessage = {
            id: Date.now().toString(),
            sender: 'You',
            text: inputValue,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isAI: false
        };

        setMessages((prev) => [...prev, newMessage]);
        socket.emit('send_message', newMessage);
        setInputValue('');
    };

    // Professional placeholder functions for attachment triggers
    const triggerMediaUpload = (type) => {
        alert(`${type} upload triggered. You can integrate AWS S3 or Firebase storage API here.`);
    };

    return (
        <div className="w-full md:w-96 h-[550px] bg-slate-900 border border-slate-800 rounded-2xl flex flex-col shadow-2xl overflow-hidden backdrop-blur-md">
            {/* Header */}
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <h3 className="font-semibold text-sm text-slate-200 tracking-wide">GLOBAL LIVE CHAT</h3>
                </div>
                <span className="text-xs text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full font-medium">USA-EAST</span>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-slate-800">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                        <div className="flex items-center gap-1.5 mb-0.5">
                            <span className={`text-[10px] font-bold tracking-wider uppercase ${msg.isAI ? 'text-cyan-400' : msg.sender === 'You' ? 'text-indigo-400' : 'text-slate-400'}`}>
                                {msg.sender}
                            </span>
                            <span className="text-[9px] text-slate-600">{msg.time}</span>
                        </div>
                        <div className={`max-w-[85%] rounded-xl px-3.5 py-2 text-sm leading-relaxed ${
                            msg.isSystem ? 'bg-slate-950 text-slate-400 italic border border-slate-850 w-full text-center' :
                            msg.isAI ? 'bg-cyan-950/40 text-cyan-200 border border-cyan-800/50 shadow-[0_0_12px_rgba(34,211,238,0.1)]' :
                            msg.sender === 'You' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            {/* Input & Professional Icon Tray */}
            <form onSubmit={handleSendMessage} className="p-3 bg-slate-950 border-t border-slate-800 flex flex-col gap-2">
                <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-xl px-2 py-1 focus-within:border-indigo-500 transition-all">
                    
                    {/* DOCUMENT ATTACHMENT ICON */}
                    <button type="button" onClick={() => triggerMediaUpload('Document')} className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors group" title="Attach Document">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                    </button>

                    {/* PHOTO/IMAGE ATTACHMENT ICON */}
                    <button type="button" onClick={() => triggerMediaUpload('Photo')} className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors" title="Send Image">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 002-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </button>

                    <input 
                        type="text" 
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type a message or @ai for assistance..." 
                        className="flex-1 bg-transparent border-none text-sm text-slate-200 placeholder-slate-500 focus:outline-none px-2 py-1.5"
                    />

                    {/* SEND BUTTON */}
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-lg transition-all shadow-md active:scale-95">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}
