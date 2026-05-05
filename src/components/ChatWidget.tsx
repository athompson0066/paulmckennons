import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, Send, Bot, User, Sparkles, 
  Home, Search, DollarSign, Paintbrush, Wrench, Truck,
  ArrowRight, Loader2
} from 'lucide-react';
import { TEAM, DEMO_CONVERSATIONS } from '../constants';

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

const ROUTING_QUESTIONS = [
  {
    question: "What brings you here today?",
    options: [
      { label: "I'm looking to buy", keywords: ['buy', 'looking', 'search'], route: 'Maya' },
      { label: "I'm looking to sell", keywords: ['sell', 'listing', 'list'], route: 'Maya' },
      { label: "Exclusive / off-market", keywords: ['exclusive', 'off-market', 'private'], route: 'Elias' },
      { label: "Schedule a viewing", keywords: ['viewing', 'tour', 'schedule', 'see'], route: 'Sarah' },
      { label: "Home design / staging", keywords: ['design', 'stage', 'reno', 'paint'], route: 'Bella' },
      { label: "Need a contractor", keywords: ['contractor', 'reno', 'repair', 'trades'], route: 'Vince' },
      { label: "Need moving help", keywords: ['move', 'moving', 'transition'], route: 'Penny' },
    ]
  }
];

const ROUTING_CONFIRMATIONS: Record<string, { intro: string; message: string }> = {
  Maya: {
    intro: "Connecting you to Maya — Market Intelligence...",
    message: "Perfect. I'm Maya. I monitor 2,400+ properties daily across the GTA. Let me find exactly what you're looking for. Tell me about your ideal property."
  },
  Elias: {
    intro: "Connecting you to Elias — Outreach Architect...",
    message: "Great choice. I'm Elias — I specialize in off-market and exclusive listings that never hit MLS. What area are you most interested in?"
  },
  Sarah: {
    intro: "Connecting you to Sarah — Elite Concierge...",
    message: "Wonderful. I'm Sarah. Let me get your ideal viewing times and I'll coordinate everything with Paul's calendar. What properties are you interested in?"
  },
  Bella: {
    intro: "Connecting you to Bella — Vision Architect...",
    message: "You've got vision. I'm Bella. Whether you're staging to sell or designing your dream home, I'll show you the transformation before you spend a dime. Tell me about your project."
  },
  Vince: {
    intro: "Connecting you to Vince — Trade Network Curator...",
    message: "Solid. I'm Vince. I've got 150+ triple-vetted contractors. Kitchen, bathroom, basement — tell me what you need and I'll match you with the best."
  },
  Penny: {
    intro: "Connecting you to Penny — Move Orchestrator...",
    message: "Moving day sorted. I'm Penny. I handle everything — movers, utilities, cleaning, key handoffs. When's your closing date?"
  }
};

const QUICK_OPTIONS = [
  "Tell me more about Paul",
  "What areas do you cover?",
  "Schedule a consultation",
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [stage, setStage] = useState<Stage>('greeting');
  const [routedTo, setRoutedTo] = useState<string | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && stage === 'greeting' && messages.length === 0) {
      setTimeout(() => {
        setMessages([
          {
            role: 'receptionist',
            text: "👋 Welcome to Paul McKennon Real Estate Intelligence! I'm your AI receptionist. I'll help connect you with the right specialist on our team."
          }
        ]);
        setStage('needs-analysis');
      }, 500);
    }
  }, [isOpen, stage, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const routeToAgent = (agentName: string) => {
    setIsThinking(true);
    const confirm = ROUTING_CONFIRMATIONS[agentName];
    
    setMessages(prev => [...prev, {
      role: 'receptionist',
      text: confirm.intro
    }]);
    scrollToBottom();

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'agent',
        text: confirm.message,
        agent: agentName
      }]);
      setRoutedTo(agentName);
      setStage('routed');
      setIsThinking(false);
      scrollToBottom();
    }, 1200);
  };

  const handleSend = (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || isThinking) return;
    
    const newMsg = msg;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: newMsg }]);
    setIsThinking(true);
    scrollToBottom();

    if (stage === 'needs-analysis') {
      // Check for routing keywords
      const lower = newMsg.toLowerCase();
      let matched = false;
      
      for (const q of ROUTING_QUESTIONS) {
        for (const opt of q.options) {
          if (opt.keywords.some(k => lower.includes(k))) {
            matched = true;
            routeToAgent(opt.route);
            return;
          }
        }
      }

      // Check for general questions
      if (lower.includes('paul') || lower.includes('about')) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'receptionist',
            text: "Paul McKennon has 38 years of experience in Toronto real estate with RE/MAX REALTRON. He's built an AI-powered team of 6 specialized agents to give his clients the best possible service — from market intelligence to moving day coordination. How can I connect you with the right specialist?"
          }]);
          setIsThinking(false);
          scrollToBottom();
        }, 1000);
        return;
      }
      
      if (lower.includes('area') || lower.includes('cover') || lower.includes('gta')) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'receptionist',
            text: "We cover the entire GTA — Toronto, Mississauga, Brampton, Markham, Richmond Hill, Vaughan, Oakville, Burlington, and beyond. Paul's team specializes in both luxury and investment properties. What brings you here today?"
          }]);
          setIsThinking(false);
          scrollToBottom();
        }, 1000);
        return;
      }
      
      if (lower.includes('consult') || lower.includes('meet') || lower.includes('call')) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: 'receptionist',
            text: "I'll have Sarah reach out to schedule a consultation with Paul. In the meantime, could you tell me what kind of real estate service you're looking for so I can prepare the right team?"
          }]);
          setIsThinking(false);
          scrollToBottom();
        }, 1000);
        return;
      }

      // Default: no match, ask more
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'receptionist',
          text: "I'd love to help! Here are a few things I can assist with: buying a home, selling your property, finding off-market deals, scheduling viewings, home design/staging, finding contractors, or moving coordination. Which one sounds closest to what you need?"
        }]);
        setIsThinking(false);
        scrollToBottom();
      }, 1000);
      
    } else if (stage === 'routed' && routedTo) {
      // Already routed to an agent — generic responses
      const demoKey = TEAM.find(a => a.name === routedTo)?.demoType as keyof typeof DEMO_CONVERSATIONS;
      const demoConvo = demoKey ? DEMO_CONVERSATIONS[demoKey] || [] : [];
      
      // Find next demo response
      const lastAgentMsgIndex = [...messages].reverse().findIndex(m => m.role === 'agent');
      const convoIndex = lastAgentMsgIndex >= 0 ? Math.floor(lastAgentMsgIndex / 2) + 1 : 0;

      setTimeout(() => {
        const agentInfo = TEAM.find(a => a.name === routedTo);
        const demoResponse = agentInfo ? agentInfo.insight : '';
        
        setMessages(prev => [...prev, {
          role: 'agent',
          text: demoResponse || `Great question! I specialize in ${AGENT_TAGS[routedTo]}. Let me look into this for you and get back with a detailed report. What specific details can you share?`,
          agent: routedTo
        }]);
        setIsThinking(false);
        scrollToBottom();
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
    <>
      {/* Chat Button — fixed bottom right */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-brand-blue to-brand-dark flex items-center justify-center shadow-xl shadow-brand-blue/30 border border-white/20 hover:shadow-brand-blue/50 transition-shadow"
      >
        {isOpen ? (
          <MessageSquare className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-red rounded-full animate-pulse" />
          </div>
        )}
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100vh-8rem)] glass-card-strong rounded-2xl border border-white/10 flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex-shrink-0 p-4 border-b border-white/10 bg-gradient-to-r from-brand-blue/20 to-brand-dark/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-blue to-brand-dark flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-white">
                      {routedTo ? `${routedTo}` : 'AI Reception'}
                    </h4>
                    <p className="text-[10px] text-slate-400">
                      {routedTo ? AGENT_TAGS[routedTo] : 'Paul McKennon Intelligence'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-[10px] text-emerald-400 font-medium">Online</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              {!routedTo && stage === 'needs-analysis' && (
                <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-brand-gold" />
                  Let me find the right specialist for you.
                </p>
              )}
              {routedTo && (
                <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-brand-gold" />
                  Connected to {routedTo}
                </p>
              )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence mode="popLayout">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                      msg.role === 'user'
                        ? 'bg-brand-blue/20 border border-brand-blue/30'
                        : msg.role === 'agent'
                        ? TEAM.find(a => a.name === msg.agent)?.gradient?.replace('from-', 'bg-gradient-to-br from-').replace('to-', ' to-')?.replace('from-blue-600 to-indigo-800', 'from-brand-blue to-brand-dark') || 'bg-gradient-to-br from-brand-blue to-brand-dark'
                        : 'bg-gradient-to-br from-brand-gold to-amber-700'
                    }`}>
                      {msg.role === 'user' ? (
                        <User className="w-3.5 h-3.5 text-white" />
                      ) : msg.role === 'agent' ? (
                        <span className="text-xs">{AGENT_EMOJIS[msg.agent || ''] || '🤖'}</span>
                      ) : (
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>

                    {/* Bubble */}
                    <div className={`max-w-[80%] ${
                      msg.role === 'user' ? 'items-end' : 'items-start'
                    }`}>
                      {/* Agent name label */}
                      {msg.role === 'agent' && msg.agent && (
                        <p className="text-[10px] font-bold text-brand-gold mb-1 ml-1">
                          {AGENT_EMOJIS[msg.agent]} {msg.agent} · {AGENT_TAGS[msg.agent]}
                        </p>
                      )}
                      {msg.role === 'receptionist' && (
                        <p className="text-[10px] font-medium text-brand-gold/70 mb-1 ml-1">AI Reception</p>
                      )}
                      <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-brand-blue text-white rounded-tr-md'
                          : 'bg-white/5 text-slate-200 border border-white/5 rounded-tl-md'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2.5"
                >
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-brand-gold to-amber-700 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="bg-white/5 rounded-2xl rounded-tl-md px-4 py-3 border border-white/5">
                    <div className="flex gap-1">
                      <Loader2 className="w-4 h-4 text-brand-gold animate-spin" />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick action buttons (before routing) */}
            {stage === 'needs-analysis' && messages.length > 1 && !isThinking && (
              <div className="flex-shrink-0 px-4 pb-2">
                <div className="flex flex-wrap gap-1.5">
                  {ROUTING_QUESTIONS[0].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(opt.label)}
                      className="text-[11px] px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:bg-brand-blue/20 hover:border-brand-blue/40 hover:text-white transition-all"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="flex-shrink-0 p-3 border-t border-white/10">
              <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2 border border-white/5 focus-within:border-brand-blue/40 focus-within:bg-white/10 transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={routedTo ? `Ask ${routedTo} anything...` : "Tell me what you need..."}
                  className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
                  disabled={isThinking}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isThinking}
                  className="p-1.5 rounded-lg bg-brand-blue/20 text-brand-blue hover:bg-brand-blue/40 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-slate-600 text-center mt-1.5">
                Powered by Paul McKennon AI Intelligence
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
