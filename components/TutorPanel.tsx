
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getChatResponse } from '../services/geminiService';

const TutorPanel: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello Engineer! I'm EngiBot. Ask me about fluid dynamics, structural stress, semiconductor physics, or anything else bothering you today." }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const response = await getChatResponse([...messages, userMessage]);
    setMessages(prev => [...prev, { role: 'assistant', content: response || "I'm having trouble thinking. Try asking again!" }]);
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-[500px] bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
      <div className="p-4 bg-slate-800/50 border-b border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="font-bold text-slate-100">EngiBot AI Tutor</h3>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
              msg.role === 'user' 
                ? 'bg-cyan-600 text-white rounded-tr-none' 
                : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-800 text-slate-200 rounded-2xl rounded-tl-none px-4 py-2 border border-slate-700">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-900/50 border-t border-slate-800">
        <div className="flex gap-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question..."
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
          <button 
            onClick={handleSend}
            disabled={isTyping}
            className="p-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorPanel;
