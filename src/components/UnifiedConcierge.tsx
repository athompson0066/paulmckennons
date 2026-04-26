import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Phone, Image as ImageIcon } from 'lucide-react';
import { TEAM } from '../constants';

const AGENTS = TEAM; // Reuse team data

export default function UnifiedConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAgent, setActiveAgent] = useState(AGENTS[0]);
  const [messages, setMessages] = useState<{ sender: 'user' | 'agent', text: string, agent?: typeof AGENTS[0] }[]>([
    { sender: 'agent', text: 'Hello! I am Maya, how can I help you with your property search today?', agent: AGENTS[0] }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Simulate agent switching based on user keywords or just random for demonstration
  const simulateAgentHandover = (text: string) => {
    if (text.toLowerCase().includes('contractor')) setActiveAgent(AGENTS[3]); // Vince
    else if (text.toLowerCase().includes('design')) setActiveAgent(AGENTS[4]); // Bella
    else if (text.toLowerCase().includes('meet')) setActiveAgent(AGENTS[2]); // Sarah
    else setActiveAgent(AGENTS[0]); // Default back to Maya
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
    setIsTyping(true);
    
    // Simulate thinking and handover
    setTimeout(() => {
      simulateAgentHandover(input);
      setMessages(prev => [...prev, { sender: 'agent', text: `Analyzing your request regarding "${input}"...`, agent: activeAgent }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 bg-brand-blue text-white rounded-full shadow-lg hover:bg-opacity-90 transition z-50"
      >
        <MessageSquare size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-24 right-6 w-96 max-w-[90vw] h-[500px] bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-brand-blue/30 overflow-hidden flex flex-col z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={activeAgent.image} alt={activeAgent.name} className="w-10 h-10 rounded-full border-2 border-brand-blue" />
                <div>
                  <h4 className="font-bold text-slate-900">{activeAgent.name}</h4>
                  <p className="text-[10px] text-slate-500 uppercase">{activeAgent.title}</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            {/* Thread */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.sender === 'agent' && (
                    <img src={m.agent?.image} alt={m.agent?.name} className="w-8 h-8 rounded-full mr-2 self-end" />
                  )}
                  <div className={`p-3 rounded-2xl max-w-[80%] ${m.sender === 'user' ? 'bg-slate-200 text-slate-800' : 'bg-white text-slate-700 shadow-sm border border-slate-100'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                   <div className="p-3 bg-white text-slate-500 italic text-sm">{activeAgent.name} is analyzing your request...</div>
                </div>
              )}
            </div>

            {/* Actions & Input */}
            <div className="p-4 border-t border-slate-100 space-y-3">
              <div className="flex space-x-2">
                <button className="flex-1 py-2 text-xs border border-brand-blue text-brand-blue rounded-lg hover:bg-brand-blue hover:text-white transition">Book Showing</button>
                <button className="flex-1 py-2 text-xs border border-brand-blue text-brand-blue rounded-lg hover:bg-brand-blue hover:text-white transition">Get Staged Photo</button>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask Paul's team..."
                  className="flex-grow p-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-blue"
                />
                <button onClick={handleSendMessage} className="p-2 bg-brand-blue text-white rounded-lg hover:bg-opacity-90">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
