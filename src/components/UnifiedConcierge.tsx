import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send } from 'lucide-react';
import { TEAM } from '../constants';
import { AGENT_API_MAP } from './AgentCard';
import TypewriterMessage from './TypewriterMessage';

const AGENTS = TEAM;

interface Message {
  sender: 'user' | 'agent';
  text: string;
  agent?: typeof AGENTS[0];
  id: number;
  isStreaming?: boolean;
}

export default function UnifiedConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeAgent, setActiveAgent] = useState(AGENTS[2]);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'agent', text: AGENTS[2].welcomeMessage, agent: AGENTS[2], id: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const simulateAgentHandover = (text: string) => {
    if (text.toLowerCase().includes('contractor')) setActiveAgent(AGENTS[3]);
    else if (text.toLowerCase().includes('design')) setActiveAgent(AGENTS[4]);
    else if (text.toLowerCase().includes('meet')) setActiveAgent(AGENTS[2]);
    else setActiveAgent(AGENTS[0]);
  };

  const parseSSEChunk = (chunk: string): string => {
    const lines = chunk.split('\n');
    let result = '';
    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') break;
        try {
          const parsed = JSON.parse(data);
          if (parsed.token) {
            result += parsed.token;
          } else if (parsed.data) {
            result += parsed.data;
          } else if (typeof parsed === 'string') {
            result += parsed;
          }
        } catch {
          if (data && data !== '[DONE]') {
            result += data;
          }
        }
      }
    }
    return result;
  };

  const handleSendMessage = useCallback(async () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { sender: 'user', text: input, id: Date.now() }]);
    setInput('');
    setIsTyping(true);
    
    const messageId = Date.now() + 1;
    setMessages(prev => [...prev, { sender: 'agent', text: '', agent: activeAgent, id: messageId, isStreaming: true }]);
    
    try {
      const flowiseUrl = AGENT_API_MAP[activeAgent.name];
      if (!flowiseUrl) {
        throw new Error(`No Flowise endpoint configured for ${activeAgent.name}`);
      }
      
      const response = await fetch(flowiseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input, streaming: true })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || '';
      
      if (contentType.includes('text/event-stream') || contentType.includes('application/x-ndjson')) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullText = '';

        if (!reader) throw new Error('No response body');

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const text = parseSSEChunk(chunk);
          
          if (text) {
            fullText += text;
            setMessages(prev =>
              prev.map(m =>
                m.id === messageId
                  ? { ...m, text: fullText, isStreaming: true }
                  : m
              )
            );
          }
        }

        simulateAgentHandover(fullText);
        setMessages(prev =>
          prev.map(m =>
            m.id === messageId
              ? { ...m, text: fullText, isStreaming: false }
              : m
          )
        );
      } else {
        const data = await response.json();
        const text = data.text || JSON.stringify(data);
        simulateAgentHandover(text);
        setMessages(prev =>
          prev.map(m =>
            m.id === messageId
              ? { ...m, text, isStreaming: false }
              : m
          )
        );
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev =>
        prev.map(m =>
          m.id === messageId
            ? { ...m, text: "Sorry, I'm having trouble connecting at the moment.", isStreaming: false }
            : m
        )
      );
    } finally {
      setIsTyping(false);
    }
  }, [input, activeAgent]);

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

            <div className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.sender === 'agent' && (
                    <img src={m.agent?.image} alt={m.agent?.name} className="w-8 h-8 rounded-full mr-2 self-end" />
                  )}
                  <div className={`p-3 rounded-2xl max-w-[80%] ${m.sender === 'user' ? 'bg-slate-200 text-slate-800' : 'bg-white text-slate-700 shadow-sm border border-slate-100'}`}>
                    {m.sender === 'agent' && !m.isStreaming ? (
                      <TypewriterMessage text={m.text} />
                    ) : (
                      <span>{m.text || ''}{m.isStreaming && <span className="inline-block w-2 h-2 bg-brand-blue rounded-full animate-pulse ml-1" />}</span>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && messages[messages.length - 1]?.sender !== 'agent' && (
                <div className="flex justify-start">
                   <div className="p-3 bg-white text-slate-500 italic text-sm">{activeAgent.name} is analyzing your request...</div>
                </div>
              )}
            </div>

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
