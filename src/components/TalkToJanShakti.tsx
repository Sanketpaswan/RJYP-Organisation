import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, User, ShieldCheck, Loader2, RefreshCw } from "lucide-react";
import { ChatMessage } from "../types";

export default function TalkToJanShakti() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "model",
      text: "Jai Hind! I am Jan-Shakti Chatbot, the official policy assistant of Rashtriya Yuva Jan Shakti Party (RYJP). Ask me any question about our party's manifesto, our vision for India, stance on youth empowerment, or how we combat fake propaganda!",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "What is RYJP's stance on education and skills?",
    "How does RYJP plan to target fake news?",
    "What are RYJP's employment solutions?",
    "Tell me about the National Youth March."
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isSending) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage("");
    setIsSending(true);

    try {
      // Map message lists for backend formatting
      const history = messages.map((m) => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch("/api/ask-policy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: textToSend,
          history: history
        })
      });

      const resJson = await res.json();
      if (resJson.success && resJson.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: `m-${Date.now()}`,
            role: "model",
            text: resJson.reply,
            timestamp: new Date()
          }
        ]);
      } else {
        throw new Error(resJson.error || "Response not valid");
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: "model",
          text: "I apologies, but I had trouble connecting to the RYJP policy servers. Please make sure that your internet connection is active, or trigger the portal dev server again.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl relative overflow-hidden flex flex-col h-[520px] text-slate-800">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0A2E6D] to-[#124296] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-black text-[#0A2E6D] flex items-center gap-1.5 uppercase">
              Jan-Shakti Bot <span className="text-[9px] bg-orange-100 text-orange-600 py-0.5 px-1.5 rounded font-mono font-bold tracking-wider">OFFICIAL AI</span>
            </h4>
            <p className="text-[11px] font-bold text-slate-450">RYJP Digital Assistant</p>
          </div>
        </div>
        <button
          onClick={() => setMessages([
            {
              id: "init",
              role: "model",
              text: "Jai Hind! I am Jan-Shakti Chatbot, the official policy assistant of Rashtriya Yuva Jan Shakti Party (RYJP). Ask me any question about our party's manifesto, our vision for India, stance on youth empowerment, or how we combat fake propaganda!",
              timestamp: new Date()
            }
          ])}
          className="text-slate-400 hover:text-[#0A2E6D] transition-colors cursor-pointer"
          title="Restart Chat"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4 mb-4 scrollbar-thin scrollbar-thumb-slate-200">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                msg.role === "user"
                  ? "bg-slate-150 text-[#0A2E6D] font-extrabold"
                  : "bg-orange-100 text-orange-600 border border-orange-200"
              }`}
            >
              {msg.role === "user" ? <User className="w-3.5 h-3.5" /> : <ShieldCheck className="w-3.5 h-3.5" />}
            </div>

            <div
              className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed text-left ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-[#0A2E6D] to-[#082456] text-white shadow-sm font-medium"
                  : "bg-slate-50 text-slate-700 border border-slate-200/60 font-semibold"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {isSending && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-orange-600" />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-500 max-w-[85%] flex items-center gap-2">
              <span className="font-mono font-bold animate-pulse">RYJP AI model thinking...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Quick suggestions */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {quickQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(q)}
            className="text-[10px] bg-slate-50 hover:bg-[#0A2E6D]/5 text-slate-650 hover:text-[#0A2E6D] border border-slate-200 rounded-md py-1 px-2.5 text-left cursor-pointer transition-all max-w-full truncate font-bold"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Inputs form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputMessage);
        }}
        className="flex gap-2 mt-auto"
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask our policy bot about skills, jobs, national security..."
          className="flex-1 bg-slate-50 text-slate-900 text-xs border border-slate-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#0A2E6D] focus:border-[#0A2E6D] transition-all placeholder:text-slate-400 font-semibold"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim() || isSending}
          className="bg-[#0A2E6D] hover:bg-[#082456] disabled:bg-slate-100 disabled:text-slate-400 text-white p-2.5 rounded-xl cursor-pointer transition-all active:scale-95"
        >
          <Send className="w-4 h-4 text-white" />
        </button>
      </form>
    </div>
  );
}
