import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, Send, Bot, User, Sparkles, 
  Loader2
} from 'lucide-react';
import { TEAM } from '../constants';

type Message = {
  role: 'receptionist' | 'user' | 'agent';
  text: string;
  agent?: string;
};

type Stage = 'greeting' | 'needs-analysis' | 'routed';

const AGENT_EMOJIS: Record<string, string> = {
  Maya: '🔍',
  Elias: '🤝',
  Sarah: '📅',
  Bella: '🎨',
  Vince: '🔧',
  Penny: '📦',
};

const AGENT_TAGS: Record<string, string> = {
  Maya: 'Market Intelligence',
  Elias: 'Outreach Architect',
  Sarah: 'Elite Concierge',
  Bella: 'Vision Architect',
  Vince: 'Trade Network Curator',
  Penny: 'Move Orchestrator',
};

const ROUTING_OPTIONS = [
  { label: "I'm looking to buy", keywords: ['buy', 'looking', 'search', 'find'], route: 'Maya' },
  { label: "I'm looking to sell", keywords: ['sell', 'listing', 'list', 'price'], route: 'Maya' },
  { label: "Exclusive / off-market", keywords: ['exclusive', 'off-market', 'private'], route: 'Elias' },
  { label: "Schedule a viewing", keywords: ['viewing', 'tour', 'schedule', 'see', 'show'], route: 'Sarah' },
  { label: "Home design / staging", keywords: ['design', 'stage', 'reno', 'paint'], route: 'Bella' },
  { label: "Need a contractor", keywords: ['contractor', 'reno', 'repair', 'trades', 'vendor'], route: 'Vince' },
  { label: "Need moving help", keywords: ['move', 'moving', 'transition', 'relocate'], route: 'Penny' },
];

const ROUTING_CONFIRMATIONS: Record<string, { message: string }> = {
  Maya: { message: "Perfect. I'm Maya. I monitor 2,400+ properties daily across the GTA — off-market listings, price drops, emerging neighborhoods. Tell me about your ideal property." },
  Elias: { message: "Great choice. I'm Elias. I specialize in off-market and exclusive listings that never hit MLS. What area are you most interested in?" },
  Sarah: { message: "Wonderful. I'm Sarah. Let me get your ideal viewing times and coordinate everything with Paul's calendar. What properties are you interested in?" },
  Bella: { message: "You've got vision! I'm Bella. Staging, design, virtual transformations — I'll show you the ROI before you spend a dime. Tell me about your project." },
  Vince: { message: "Solid. I'm Vince. 150+ triple-vetted contractors. Kitchen, bathroom, basement — tell me what you need and I'll match you with the best." },
  Penny: { message: "Moving day sorted. I'm Penny. Movers, utilities, cleaning, key handoffs — I handle it all. When's your closing date?" },
};

export default function SidebarChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [stage, setStage] = useState<Stage>('greeting');
  const [routedTo, setRoutedTo] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting
  useEffect(() => {
    if (stage === 'greeting' && messages.length === 0) {
      const timer = setTimeout(() => {
        setMessages([{
          role: 'receptionist',
          text: "👋 Welcome! I'm your AI receptionist. Tell me what you need and I'll connect you with the right specialist."
        }]);
        setStage('needs-analysis');
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [stage, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const routeToAgent = (agentName: string) => {
    setIsThinking(true);
    const confirm = ROUTING_CONFIRMATIONS[agentName];

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'receptionist',
        text: `Connecting you to ${agentName}...`
      }]);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'agent',
          text: confirm.message,
          agent: agentName
        }]);
        setRoutedTo(agentName);
        setStage('routed');
        setIsThinking(false);
      }, 1000);
    }, 200);
  };

  const handleSend = (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || isThinking) return;
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setIsThinking(true);

    if (stage === 'needs-analysis') {
      const lower = msg.toLowerCase();
      
      // Try to route based on keywords
      for (const opt of ROUTING_OPTIONS) {
        if (opt.keywords.some(k => lower.includes(k))) {
          routeToAgent(opt.route);
          return;
        }
      }

      // General questions
      if (lower.includes('paul') || lower.includes('about') || lower.includes('who')) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'receptionist',
            text: "Paul McKennon has 38 years of Toronto real estate experience with RE/MAX REALTRON. He leads an AI-powered team of 6 specialized agents. What are you looking for? I can connect you with the right specialist."
          }]);
          setIsThinking(false);
        }, 1000);
        return;
      }

      // Generic fallback
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'receptionist',
          text: "I can help with buying, selling, off-market deals, viewings, home staging, contractors, or moving. Which sounds like what you need?"
        }]);
        setIsThinking(false);
      }, 1000);

    } else if (stage === 'routed' && routedTo) {
      // Already routed — give agent-specific response
      const agentInfo = TEAM.find(a => a.name === routedTo);
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'agent',
          text: agentInfo?.insight || `Great question! I'm looking into this now. What specific area or property type interests you?`,
          agent: routedTo
        }]);
        setIsThinking(false);
      }, 1200);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-2xl border border-white/10 overflow-hidden mb-6"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-gradient-to-r from-brand-blue/10 to-brand-dark/10">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-dark flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-sm text-white">
                {routedTo ? routedTo : 'AI Reception'}
              </h4>
              <p className="text-[10px] text-slate-400">
                {routedTo ? AGENT_TAGS[routedTo] : 'Paul McKennon Intelligence'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-[10px] text-emerald-400 font-medium">Online</span>
          </div>
        </div>
        {!routedTo && stage === 'needs-analysis' && (
          <p className="text-[10px] text-slate-500 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-brand-gold" />
            Tell me what you need, I'll connect you to the right specialist.
          </p>
        )}
      </div>

      {/* Messages */}
      <div className="h-[320px] overflow-y-auto p-3 space-y-2.5">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <Loader2 className="w-5 h-5 text-brand-gold animate-spin" />
          </div>
        )}
        
        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                msg.role === 'user'
                  ? 'bg-brand-blue/20 border border-brand-blue/30'
                  : 'bg-gradient-to-br from-brand-gold to-amber-700'
              }`}>
                {msg.role === 'user' ? (
                  <User className="w-3 h-3 text-white" />
                ) : (
                  <Sparkles className="w-3 h-3 text-white" />
                )}
              </div>
              <div className={`max-w-[85%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                {msg.role === 'agent' && msg.agent && (
                  <p className="text-[9px] font-bold text-brand-gold mb-0.5 ml-1">
                    {AGENT_EMOJIS[msg.agent]} {msg.agent}
                  </p>
                )}
                <div className={`rounded-xl px-3 py-2 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-brand-blue text-white rounded-tr-sm'
                    : 'bg-white/5 text-slate-200 border border-white/5 rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isThinking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-2"
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-brand-gold to-amber-700 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <div className="bg-white/5 rounded-xl rounded-tl-sm px-3 py-2 border border-white/5">
              <Loader2 className="w-3.5 h-3.5 text-brand-gold animate-spin" />
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick action chips (before routing) */}
      {stage === 'needs-analysis' && messages.length > 1 && !isThinking && (
        <div className="px-3 pb-1">
          <div className="flex flex-wrap gap-1">
            {ROUTING_OPTIONS.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleSend(opt.label)}
                className="text-[10px] px-2 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:bg-brand-blue/20 hover:border-brand-blue/40 hover:text-white transition-all"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-3 pt-2 border-t border-white/10">
        <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-1.5 border border-white/5 focus-within:border-brand-blue/40 focus-within:bg-white/10 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={routedTo ? `Ask ${routedTo}...` : "What do you need?"}
            className="flex-1 bg-transparent text-xs text-white placeholder-slate-500 outline-none"
            disabled={isThinking}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isThinking}
            className="p-1 rounded-md bg-brand-blue/20 text-brand-blue hover:bg-brand-blue/40 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
