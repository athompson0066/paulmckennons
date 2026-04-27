import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bot, User, Zap, Send } from 'lucide-react';
import { TEAM, DEMO_CONVERSATIONS } from '../constants';

interface AgentDemoProps {
  agentName: string;
  onClose: () => void;
}

export default function AgentDemo({ agentName, onClose }: AgentDemoProps) {
  const agent = TEAM.find(a => a.name === agentName);
  const convo = DEMO_CONVERSATIONS[agent?.demoType || 'market'] || [];
  
  const [messages, setMessages] = useState<{role: string, text: string, isTyping?: boolean}[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying || currentIndex >= convo.length) return;

    const timer = setTimeout(() => {
      const msg = convo[currentIndex];
      setMessages(prev => [...prev, { ...msg, isTyping: true }]);
      
      // Typing effect duration based on text length
      const typingDuration = msg.text.length * 30 + 500;
      
      setTimeout(() => {
        setMessages(prev => prev.map((m, i) => 
          i === prev.length - 1 ? { ...m, isTyping: false } : m
        ));
        setCurrentIndex(prev => prev + 1);
      }, typingDuration);
    }, currentIndex === 0 ? 500 : 1500);

    return () => clearTimeout(timer);
  }, [currentIndex, isPlaying, convo]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!agent) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-2xl max-h-[85vh] glass-card-strong rounded-3xl border border-white/10 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center`}>
              <img 
                src={agent.image} 
                alt={agent.name} 
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white">{agent.name}</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <p className="text-sm text-slate-400">{agent.title} — Live Demo</p>
              </div>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Chat area */}
        <div 
          ref={scrollRef}
          className="p-6 overflow-y-auto space-y-4 max-h-[60vh]"
          style={{ scrollbarWidth: 'thin' }}
        >
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'agent' && (
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${agent.gradient} flex items-center justify-center flex-shrink-0`}>
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                
                <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                  msg.role === 'user' 
                    ? 'bg-brand-blue/20 border border-brand-blue/30 text-white' 
                    : 'bg-white/5 border border-white/10 text-slate-200'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-400">
                      {msg.role === 'agent' ? agent.name : 'Client'}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">
                    {msg.isTyping ? (
                      <span className="flex items-center gap-1">
                        <span>{msg.text}</span>
                        <span className="w-2 h-4 bg-brand-red animate-pulse" />
                      </span>
                    ) : msg.text}
                  </p>
                </div>
                
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-slate-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          {currentIndex >= convo.length && messages.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-emerald-400">Demo Complete — {agent.name} is Ready</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-slate-400">{agent.name} is active and monitoring</span>
          </div>
          {currentIndex >= convo.length && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setMessages([]);
                setCurrentIndex(0);
                setIsPlaying(true);
              }}
              className="px-4 py-2 rounded-full bg-brand-blue/20 border border-brand-blue/30 text-brand-blue text-sm font-bold hover:bg-brand-blue/30 transition"
            >
              Replay Demo
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
