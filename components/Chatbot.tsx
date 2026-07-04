"use client";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  role: "user" | "bot";
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || status === "loading") return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Có lỗi xảy ra khi gọi API");
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
      setStatus("idle");
    } catch (error: any) {
      console.error("Chat error:", error);
      setStatus("error");
      setErrorMessage(error.message || "Không thể kết nối đến máy chủ.");
    }
  };

  const handleRetry = () => {
    if (messages.length > 0 && messages[messages.length - 1].role === "user") {
      const lastUserMessage = messages[messages.length - 1].content;
      setInputValue(lastUserMessage);
      setMessages((prev) => prev.slice(0, -1)); // Remove the last user message to resend
      setStatus("idle");
    } else {
      setStatus("idle");
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent-cyan text-black shadow-lg shadow-accent-cyan/20 transition-colors hover:bg-opacity-90"
            aria-label="Open chat"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(0, 240, 255, 0.4)",
                  "0 0 0 10px rgba(0, 240, 255, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full"
            />
            <MessageSquare size={24} className="relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-0 right-0 z-50 flex h-[100dvh] w-full flex-col overflow-hidden bg-bg-surface shadow-2xl md:bottom-24 md:right-6 md:h-[550px] md:w-[380px] md:rounded-2xl md:border md:border-border-subtle"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border-subtle bg-bg-primary px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-cyan/10">
                  <MessageSquare size={20} className="text-accent-cyan" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">
                    HeliCorp Assistant
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    </span>
                    <span className="text-xs text-text-muted">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-text-muted transition-colors hover:bg-glass-bg hover:text-text-primary"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border-subtle">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                  <div className="rounded-full bg-glass-bg p-4">
                    <MessageSquare size={32} className="text-accent-cyan" />
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium text-text-primary">
                      Chào bạn!
                    </h4>
                    <p className="text-sm text-text-muted max-w-[250px]">
                      Tôi là trợ lý AI của HeliCorp. Tôi có thể giúp gì cho bạn
                      hôm nay?
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                          msg.role === "user"
                            ? "bg-accent-cyan text-black rounded-tr-sm"
                            : "bg-bg-primary text-text-primary border border-border-subtle rounded-tl-sm"
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}

                  {/* Loading Indicator */}
                  {status === "loading" && (
                    <div className="flex justify-start">
                      <div className="flex max-w-[85%] items-center gap-1 rounded-2xl rounded-tl-sm border border-border-subtle bg-bg-primary px-4 py-4 text-sm text-text-primary">
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0,
                          }}
                          className="h-1.5 w-1.5 rounded-full bg-accent-cyan"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0.2,
                          }}
                          className="h-1.5 w-1.5 rounded-full bg-accent-cyan"
                        />
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: 0.4,
                          }}
                          className="h-1.5 w-1.5 rounded-full bg-accent-cyan"
                        />
                      </div>
                    </div>
                  )}

                  {/* Error State */}
                  {status === "error" && (
                    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center mt-2">
                      <AlertCircle size={20} className="text-red-500" />
                      <p className="text-xs text-red-500/80">
                        Hiện không thể kết nối với AI, vui lòng thử lại sau!
                      </p>
                      <button
                        onClick={handleRetry}
                        className="mt-1 text-xs font-medium text-accent-cyan hover:underline"
                      >
                        Thử lại
                      </button>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-border-subtle bg-bg-primary p-4">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-2 rounded-full border border-border-subtle bg-bg-surface p-1 focus-within:border-accent-cyan"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 bg-transparent px-4 text-sm text-text-primary outline-none placeholder:text-text-muted"
                  disabled={status === "loading"}
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || status === "loading"}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-cyan text-black transition-opacity hover:bg-opacity-90 disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send size={16} className="ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
