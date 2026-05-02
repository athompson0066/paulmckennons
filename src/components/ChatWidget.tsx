import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, ChevronDown, Sparkles } from 'lucide-react';

// Flowise chatflow IDs - these map to your agents
const AGENTS = {
  Paul: { id: '265fe4cd-2e87-437c-8633-ac4ee8f1fb3d', color: 'from-blue-600 to-indigo-700', title: 'Paul McKennon' },
  Maya: { id: 'b2332d63-511e-484a-afc7-a1a570462111', color: 'from-blue-600 to-indigo-800', title: 'Market Intelligence' },
  Elias: { id: 'ffc08529-cd30-4ce1-afca-1abe5f9149c5', color: 'from-emerald-600 to-teal-800', title: 'Outreach Architect' },
  Sarah: { id: '1600fdb2-2d41-48d0-b8b8-12e4f521ee7b', color: 'from-rose-600 to-pink-800', title: 'Elite Concierge' },
  Vince: { id: 'fb170a66-116b-4c7b-80b7-f784c78add47', color: 'from-amber-600 to-orange-800', title: 'Trade Network' },
  Bella: { id: '4dd56503-fd61-4090-aa3d-0e24d7011c98', color: 'from-purple-600 to-violet-800', title: 'Vision Architect' },
  Penny: { id: '4a129e23-31c9-4a78-8089-da37d137d451', color: 'from-cyan-600 to-blue-800', title: 'Move Orchestrator' },
  Sade: { id: 'c0423c15-71cd-471a-857f-793d286dfc69', color: 'from-slate-600 to-gray-800', title: 'Operations' },
};

// Use local API proxy to avoid CORS
const API_BASE = import.meta.env.VITE_API_URL || '/api';

interface Message {
  role: 'user' | 'agent';
  text: string;
  isTyping?: boolean;
  timestamp?: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<keyof typeof AGENTS>('Paul');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'agent', text: "Hi! I'm Paul McKennon. How can I help you with your real estate needs today?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAgentSelector, setShowAgentSelector] = useState(false);
  const [sessionId, setSessionId] = useState(`web-${Date.now()}`);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentAgent = AGENTS[selectedAgent];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: inputText.trim(), timestamp: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    // Add typing indicator
    setMessages(prev => [...prev, { role: 'agent', text: '', isTyping: true }]);

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent: selectedAgent,
          message: userMsg.text,
          sessionId: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const agentText = data.text || "I'm processing your request...";
      
      // Update session ID if returned
      if (data.sessionId) {
        setSessionId(data.sessionId);
      }

      // Remove typing indicator and add real response
      setMessages(prev => {
        const filtered = prev.filter(m => !m.isTyping);
        return [...filtered, { 
          role: 'agent', 
          text: agentText,
          timestamp: new Date().toLocaleTimeString()
        }];
      });
    } catch (error) {
      // Remove typing indicator and add error
      setMessages(prev => {
        const filtered = prev.filter(m => !m.isTyping);
        return [...filtered, { 
          role: 'agent', 
          text: "I'm currently offline. Please try again in a moment, or contact Paul directly at (416) 567-7253.",
          timestamp: new Date().toLocaleTimeString()
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const switchAgent = (agentName: keyof typeof AGENTS) => {
    setSelectedAgent(agentName);
    setShowAgentSelector(false);
    // Add welcome message for new agent
    const welcomeMessages: Record<string, string> = {
      Paul: "Hi! I'm Paul McKennon. How can I help you with your real estate needs today?",
      Maya: "Hey there! I'm Maya, Paul's market intelligence agent. Ask me about neighborhoods, price trends, or off-market opportunities.",
      Elias: "Hello! I'm Elias, the outreach specialist. I can connect you with exclusive listings and off-market properties.",
      Sarah: "Hi! I'm Sarah, Paul's concierge. I can help schedule viewings, answer questions, and coordinate your real estate journey.",
      Vince: "Hey! I'm Vince, the trade network curator. Need contractor recommendations or renovation advice? I'm your guy.",
      Bella: "Hello! I'm Bella, the vision architect. Ask me about staging, design trends, or how to maximize your property's value.",
      Penny: "Hi! I'm Penny, the move orchestrator. I handle all the logistics - utilities, movers, cleaners, and more.",
      Sade: "Hello! I'm Sade. How can I assist with your real estate operations today?",
    };
    
    setMessages(prev => [...prev, {
      role: 'agent',
      text: welcomeMessages[agentName] || `Hi! I'm ${agentName}. How can I help?`,
      timestamp: new Date().toLocaleTimeString()
    }]);
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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full bg-gradient-to-r from-brand-blue to-brand-dark flex items-center justify-center shadow-lg shadow-brand-blue/30 hover:shadow-xl hover:shadow-brand-blue/40 transition-all"
          >
            <MessageSquare className="w-6 h-6 text-white" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-950 animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-[100] w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-6rem)] glass-card-strong rounded-2xl border border-white/10 overflow-hidden flex flex-col shadow-2xl shadow-black/50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-slate-900/80 to-slate-800/80">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentAgent.color} flex items-center justify-center`}>
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold text-white">{selectedAgent}</h3>
                  <p className="text-[10px] text-slate-400">{currentAgent.title}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Agent Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowAgentSelector(!showAgentSelector)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-brand-gold" />
                  </button>
                  
                  <AnimatePresence>
                    {showAgentSelector && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-2 w-48 glass-card-strong rounded-xl border border-white/10 overflow-hidden z-10"
                      >
                        <div className="p-2">
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 py-1">Select Agent</p>
                          {Object.entries(AGENTS).map(([name, config]) => (
                            <button
                              key={name}
                              onClick={() => switchAgent(name as keyof typeof AGENTS)}
                              className={`w-full flex items-center gap-2 px-2 py-2 rounded-lg text-left text-sm transition-colors ${
                                selectedAgent === name ? 'bg-brand-blue/20 text-brand-blue' : 'text-slate-300 hover:bg-white/5'
                              }`}
                            >
                              <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${config.color} flex items-center justify-center`}>
                                <span className="text-[10px] font-bold text-white">{name[0]}</span>
                              </div>
                              <span className="font-medium">{name}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </motion.button>
              </div>
            </div>

            {/* Messages Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-3"
              style={{ scrollbarWidth: 'thin' }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'agent' && (
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${currentAgent.color} flex items-center justify-center flex-shrink-0 mt-1`}>
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                    msg.role === 'user'
                      ? 'bg-brand-blue/20 border border-brand-blue/30 text-white'
                      : 'bg-white/5 border border-white/10 text-slate-200'
                  }`}>
                    {msg.isTyping ? (
                      <div className="flex items-center gap-1.5 py-1">
                        <span className="text-sm text-slate-400">Thinking</span>
                        <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    ) : (
                      <>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                        {msg.timestamp && (
                          <p className="text-[10px] text-slate-500 mt-1">{msg.timestamp}</p>
                        )}
                      </>
                    )}
                  </div>
                  
                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-white/10 bg-slate-900/50">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`Message ${selectedAgent}...`}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue/30 transition-all"
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className={`p-2.5 rounded-xl transition-all ${
                    inputText.trim() && !isLoading
                      ? 'bg-gradient-to-r from-brand-blue to-brand-dark text-white shadow-lg shadow-brand-blue/25'
                      : 'bg-white/5 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
              <p className="text-[10px] text-slate-600 mt-1.5 text-center">
                Powered by AI • Responses may not reflect real-time market data
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
