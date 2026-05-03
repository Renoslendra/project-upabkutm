import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function BantuanChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Halo! Saya adalah AI Asisten UPA-BK UTM. Ada yang bisa saya bantu hari ini terkait layanan konseling, asesmen, atau kegiatan kami?',
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);



  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user'
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Mock bot response
    setTimeout(() => {
      const botResponses = [
        "Terima kasih atas pertanyaannya. Saat ini jadwal konseling bisa dilihat langsung di menu 'Daftar Konseling'.",
        "Untuk informasi lebih lanjut mengenai masalah tersebut, Anda bisa berdiskusi langsung dengan konselor kami. Silakan buat janji temu.",
        "Asesmen DASS-21 kami bisa membantu mendeteksi tingkat stres awal. Apakah Anda sudah mencobanya?",
        "Baik, saya mengerti. Jika Anda berada dalam situasi darurat, mohon segera hubungi hotline krisis yang tersedia di bagian kontak bawah halaman.",
        "Semua layanan kami gratis bagi mahasiswa aktif UTM."
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      const botMessage: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'bot'
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  return (
    <div className="min-h-screen flex flex-col relative">
      <section className="pt-24 pb-4 md:pb-8 flex-1 flex items-center justify-center px-2 md:px-6 z-10 relative">
        {/* Floating Glassmorphic Container - Sharpened */}
        <div className="w-full max-w-[1400px] h-[calc(100vh-110px)] md:h-[calc(100vh-130px)] flex flex-col relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.12)] border-[1.5px] border-white/80 bg-white/90 backdrop-blur-3xl ring-1 ring-black/5">

          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200/60 bg-white/80 backdrop-blur-xl flex items-center justify-between z-20">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center shadow-lg text-white transform -rotate-3 transition-transform duration-500 hover:rotate-0">
                  <Bot size={26} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-[3px] border-white rounded-full animate-pulse shadow-sm" />
              </div>
              <div>
                <h3 className="font-extrabold text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-500 tracking-tight">AI Asisten UPA-BK</h3>
                <p className="text-xs md:text-sm font-semibold text-gray-500 mt-0.5 flex items-center gap-2">
                  Selalu Aktif & Siap Membantu
                </p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth">
            {messages.map((msg) => {
              const isBot = msg.sender === 'bot';
              return (
                <div key={msg.id} className={`flex gap-3 md:gap-4 max-w-[95%] md:max-w-[85%] ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}>
                  {/* Avatar */}
                  <div className={`w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full flex items-center justify-center shadow-md ${isBot ? 'bg-white text-pink-500' : 'bg-gradient-to-tr from-pink-500 to-rose-400 text-white'}`}>
                    {isBot ? <Bot size={18} /> : <User size={18} />}
                  </div>

                  {/* Bubble */}
                  <div className={`relative p-4 md:p-5 rounded-3xl text-[15px] md:text-[16px] leading-relaxed font-medium shadow-sm transition-all duration-300 hover:shadow-md ${isBot
                      ? 'bg-white/90 backdrop-blur-md border border-white/50 text-gray-800 rounded-tl-sm'
                      : 'bg-gradient-to-br from-pink-500 to-rose-400 text-white rounded-tr-sm'
                    }`}>
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-3 md:gap-4 max-w-[85%] mr-auto">
                <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full flex items-center justify-center shadow-md bg-white text-pink-500">
                  <Bot size={18} />
                </div>
                <div className="relative p-4 md:p-5 rounded-3xl rounded-tl-sm bg-white/90 backdrop-blur-md border border-white/50 shadow-sm flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-[14px] md:text-[15px] font-medium text-gray-500 ml-2">Mengetik balasan...</span>
                </div>
              </div>
            )}
          </div>

          {/* Fixed Input Area (No Overlap) */}
          <div className="shrink-0 p-4 md:p-6 bg-white/80 backdrop-blur-xl border-t border-gray-200/60 z-20">
            <form onSubmit={handleSend} className="relative flex items-center bg-white border border-pink-100 shadow-[0_8px_30px_rgba(236,72,153,0.1)] rounded-full p-2 transition-all duration-300 focus-within:shadow-[0_15px_40px_rgba(236,72,153,0.2)] max-w-5xl mx-auto">
              <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shrink-0 text-gray-400 bg-gray-50 rounded-full ml-1">
                <User size={20} />
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tanyakan sesuatu, AI kami siap membantu..."
                className="w-full bg-transparent px-4 py-3 md:py-4 font-medium text-[15px] md:text-[16px] text-gray-800 placeholder-gray-400 outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 hover:-rotate-12 bg-gradient-to-tr from-pink-500 to-rose-400 text-white shadow-lg mr-1"
              >
                <Send size={20} className="-ml-1 mt-1" />
              </button>
            </form>
          </div>

        </div>
      </section>
    </div>
  );
}
