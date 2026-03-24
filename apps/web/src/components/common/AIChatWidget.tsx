import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { streamAIResponse } from '../../services/aiService';

const AIChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Collapsed by default
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string; streaming?: boolean }[]>([
        { role: 'assistant', content: "Welcome to **EAOverseas Executive Support**. 🎓\n\nI am your dedicated AI assistant. How can I assist you today?" },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [showTooltip, setShowTooltip] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Categories for Sidebar
    const consultationAreas = [
        { id: 'admissions', label: 'University Admissions', icon: 'account_balance' },
        { id: 'visas', label: 'Visa Assistance', icon: 'badge' },
        { id: 'scholarships', label: 'Scholarships & Funding', icon: 'savings' },
        { id: 'loans', label: 'Education Loans', icon: 'payments' },
        { id: 'test-prep', label: 'Test Preparation', icon: 'edit_note' },
    ];

    useEffect(() => {
        const t = setTimeout(() => setShowTooltip(false), 5000);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        const handleOpenChat = () => { setIsOpen(true); setIsMinimized(false); setShowTooltip(false); };
        window.addEventListener('open-ai-chat', handleOpenChat);
        return () => window.removeEventListener('open-ai-chat', handleOpenChat);
    }, []);

    useEffect(() => {
        if (scrollRef.current) { scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }
    }, [messages, isLoading]);

    const handleSend = async (customPrompt?: string) => {
        const userMsg = (customPrompt || inputValue).trim();
        if (!userMsg || isLoading) return;

        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInputValue('');
        setIsLoading(true);
        if (customPrompt) setIsSidebarOpen(false); // Auto-minimize on selection

        try {
            setMessages(prev => [...prev, { role: 'assistant', content: '', streaming: true }]);
            const stream = streamAIResponse(userMsg);
            for await (const token of stream) {
                setMessages(prev => {
                    const updated = [...prev];
                    const last = updated[updated.length - 1];
                    if (last && last.role === 'assistant') { last.content += token; }
                    return updated;
                });
            }
            setMessages(prev => {
                const updated = [...prev];
                const last = updated[updated.length - 1];
                if (last?.role === 'assistant') { last.streaming = false; }
                return updated;
            });
        } catch {
            setMessages(prev => [...prev, { role: 'assistant', content: "Connection interrupted. Our executive team is available at **+91 97790 46382** for immediate support.", streaming: false }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
    };

    const isFullView = isOpen && !isMinimized;

    return (
        <>
            {/* ── Enterprise Overlay ── */}
            {isFullView && (
                <div 
                    className="fixed inset-0 z-[9998] bg-[#0c0d12]/70 backdrop-blur-xl transition-all duration-700 hidden md:block"
                    onClick={() => setIsMinimized(true)}
                />
            )}

            <div className={`fixed z-[9999] transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)
                ${isFullView 
                    ? 'inset-0 md:p-12 lg:p-16 flex items-center justify-center p-0' 
                    : 'bottom-4 right-[74px] md:bottom-8 md:right-[110px] flex flex-col items-end pointer-events-none'}`}>

                {/* ── Executive AI Messenger ── */}
                {isOpen && !isMinimized && (
                    <div className="bg-white flex w-full h-full md:max-w-[1280px] md:max-h-[860px] md:rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto border border-slate-200 animate-[enterpriseEnter_0.6s_ease-out]">
                        
                        {/* SIDEBAR: Consultation Areas (Desktop - Collapsible) */}
                        <div className={`bg-[#f9fafc] border-r border-slate-100 hidden lg:flex flex-col shrink-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${isSidebarOpen ? 'w-[300px]' : 'w-0 border-none'}`}>
                            <div className="p-7 border-b border-slate-100 bg-white whitespace-nowrap">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-9 h-9 rounded-xl bg-[#1a1c2d] flex items-center justify-center">
                                        <span className="material-symbols-outlined text-white text-[18px]">menu_book</span>
                                    </div>
                                    <h4 className="font-black text-slate-900 text-[13px] uppercase tracking-widest">Resource Hub</h4>
                                </div>
                                <p className="text-[11px] text-slate-500 font-medium leading-relaxed">Select a category for AI guidance.</p>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto p-3 space-y-1">
                                {consultationAreas.map((area) => (
                                    <button 
                                        key={area.id}
                                        onClick={() => handleSend(`Tell me more about ${area.label}`)}
                                        className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white hover:shadow-sm transition-all group text-left whitespace-nowrap"
                                    >
                                        <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-purple-100 flex items-center justify-center transition-colors">
                                            <span className="material-symbols-outlined text-slate-400 group-hover:text-purple-600 text-[18px]">{area.icon}</span>
                                        </div>
                                        <span className="text-[13px] font-bold text-slate-600 group-hover:text-slate-900">{area.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="p-6 border-t border-slate-100 mt-auto whitespace-nowrap">
                                <div className="bg-gradient-to-br from-[#7a29c2] to-[#9333ea] rounded-xl p-4 text-white">
                                    <p className="text-[12px] font-medium mb-3">Professional Advisory</p>
                                    <button 
                                        onClick={() => window.dispatchEvent(new CustomEvent('open-booking-modal'))}
                                        className="w-full py-2 rounded-lg bg-white text-[#7a29c2] font-black text-[11px] uppercase shadow-lg shadow-black/10 hover:scale-[1.02] transition-transform"
                                    >
                                        Book Expert
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* MAIN CHAT AREA */}
                        <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
                            {/* Executive Header */}
                            <div className="px-6 py-5 md:px-8 flex items-center justify-between border-b border-slate-100 transition-all z-20">
                                <div className="flex items-center gap-4">
                                    {/* Sidebar Toggle Button */}
                                    <button 
                                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                        className={`hidden lg:flex w-[40px] h-[40px] rounded-xl items-center justify-center transition-all ${isSidebarOpen ? 'bg-slate-100 text-slate-900' : 'bg-white border border-slate-100 text-slate-400 hover:text-purple-600 hover:border-purple-100'}`}
                                        title={isSidebarOpen ? "Minimize Sidebar" : "Explore Resources"}
                                    >
                                        <span className="material-symbols-outlined text-[22px]">{isSidebarOpen ? 'menu_open' : 'menu'}</span>
                                    </button>

                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-xl bg-[#0f1118] flex items-center justify-center shadow-lg">
                                                <span className="material-symbols-outlined text-white text-[24px]">account_circle</span>
                                            </div>
                                            <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
                                        </div>
                                        <div className="text-left">
                                            <h4 className="text-[17px] font-black text-slate-900 tracking-tight">EAOverseas Assistant</h4>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-[#7a29c2]">Enterprise AI</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setIsMinimized(true)} className="w-[40px] h-[40px] rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all">
                                        <span className="material-symbols-outlined text-[22px]">unfold_less</span>
                                    </button>
                                    <button onClick={() => setIsOpen(false)} className="w-[40px] h-[40px] rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-400 hover:text-red-500 transition-all" >
                                        <span className="material-symbols-outlined text-[22px]">close</span>
                                    </button>
                                </div>
                            </div>

                            {/* Conversation Pane */}
                            <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 py-10 md:px-16 space-y-12 bg-white relative no-scrollbar">
                                {/* Subtle Logo Watermark */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
                                    <span className="text-[120px] font-black whitespace-nowrap">EAOVERSEAS</span>
                                </div>

                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex gap-6 relative z-10 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row animate-[execFade_0.5s_ease-out]'}`}>
                                        {msg.role === 'assistant' && (
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 mt-1">
                                                <span className="material-symbols-outlined text-slate-400 text-[20px]">support_agent</span>
                                            </div>
                                        )}
                                        <div className={`max-w-[85%] lg:max-w-[70%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                            <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 opacity-40 ${msg.role === 'user' ? 'text-slate-900' : 'text-[#7a29c2]'}`}>
                                                {msg.role === 'user' ? 'Client Request' : 'Digital Consultant'}
                                            </p>
                                            <div className={`text-[15.5px] leading-[1.75] text-slate-700 ${msg.role === 'user' ? 'bg-[#f4f7fa] px-6 py-4 rounded-[1.5rem] rounded-tr-none text-slate-900' : ''}`}>
                                                <ReactMarkdown
                                                    components={{
                                                        p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                                                        ul: ({ children }) => <ul className="list-disc pl-5 space-y-3 my-4">{children}</ul>,
                                                        li: ({ children }) => <li className="text-[15px] font-medium">{children}</li>,
                                                        strong: ({ children }) => <span className="font-black text-slate-900">{children}</span>,
                                                    }}
                                                >
                                                    {msg.content || (msg.streaming ? '\u00a0' : '')}
                                                </ReactMarkdown>
                                                {msg.streaming && <span className="inline-block w-2.5 h-[1.1em] bg-[#7a29c2] align-middle ml-2 animate-pulse rounded-full" />}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {isLoading && (
                                    <div className="flex gap-6 animate-pulse">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                                            <span className="material-symbols-outlined text-slate-300 text-[20px]">support_agent</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 px-6 py-4 bg-slate-50 rounded-[1.5rem] rounded-tl-none">
                                            <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Executive Command Center (Optimized Space) */}
                            <div className="px-6 py-6 md:px-10 md:py-8 border-t border-slate-100 bg-white">
                                <div className="flex items-center gap-4 bg-[#f8fafc] border border-slate-200 rounded-[1rem] px-5 py-2.5 focus-within:border-slate-400 focus-within:bg-white focus-within:shadow-sm transition-all group">
                                    <textarea
                                        value={inputValue}
                                        onChange={e => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Enter inquiry..."
                                        className="flex-1 bg-transparent text-[15px] text-slate-900 placeholder-slate-400 focus:outline-none resize-none min-h-[24px] max-h-[120px] leading-relaxed pt-1"
                                        rows={1}
                                    />
                                    <button
                                        onClick={() => handleSend()}
                                        disabled={!inputValue.trim() || isLoading}
                                        className="h-10 w-10 rounded-lg bg-[#1a1c2d] text-white flex items-center justify-center shadow-md hover:bg-[#2e3146] disabled:opacity-20 transition-all shrink-0"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">send</span>
                                    </button>
                                </div>
                                <div className="mt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
                                    <span>Secure Workspace</span>
                                    <span className="text-slate-400">EAOverseas Enterprise AI</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Executive Launcher ── */}
                <div className={`pointer-events-auto relative inline-flex flex-col items-end transition-all duration-700
                    ${(isOpen && !isMinimized) ? 'hidden' : 'flex'}`}>
                    
                    {/* Tooltip */}
                    {showTooltip && (
                        <div className="absolute bottom-[90px] right-0 mb-2 whitespace-nowrap bg-[#1a1c2d] text-white text-[13px] font-black uppercase tracking-[0.15em] px-5 py-4 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] animate-[execTooltip_0.6s_ease-out]">
                            Professional Advisory Online
                            <div className="absolute bottom-[-6px] right-8 w-4 h-4 bg-[#1a1c2d] rotate-45"></div>
                        </div>
                    )}

                    {/* Main Launcher */}
                    <button
                        onClick={() => { if (isMinimized) setIsMinimized(false); else setIsOpen(!isOpen); setShowTooltip(false); }}
                        className={`group relative w-[76px] h-[76px] rounded-[1.75rem] flex items-center justify-center transition-all duration-500 hover:rotate-3 shadow-2xl
                            ${isOpen && !isMinimized ? 'bg-slate-900' : 'bg-white border border-slate-100'}`}
                    >
                        <span className={`material-symbols-outlined text-[32px] font-bold transition-all duration-500 ${isOpen && !isMinimized ? 'text-white' : 'text-[#7a29c2]'}`}>
                            {isMinimized ? 'unfold_more' : 'auto_awesome'}
                        </span>
                        
                        {!isOpen && (
                            <span className="absolute -top-1.5 -right-1.5 w-7 h-7 bg-[#7a29c2] border-4 border-white rounded-xl shadow-lg flex items-center justify-center">
                                <span className="text-[10px] font-black text-white">AI</span>
                            </span>
                        )}
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes enterpriseEnter {
                    from { opacity: 0; transform: translateY(60px) scale(0.96); pointer-events: none; }
                    to { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }
                }
                @keyframes execFade {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes execTooltip {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .cubic-bezier { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
            `}</style>
        </>
    );
};

export default AIChatWidget;
