import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Trash2, Printer } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { TEAM } from '../constants';
import ListingCards from './ListingCards';
import ContractorCards from './ContractorCards';

interface ChatPopupProps {
  isOpen: boolean;
  onClose: () => void;
  agentName: string;
  apiUrl: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

export default function ChatPopup({ isOpen, onClose, agentName, apiUrl }: ChatPopupProps) {
  const agent = TEAM.find(t => t.name === agentName);
  const welcomeMessage = agent?.welcomeMessage || `Hello! I'm ${agentName}. How can I assist you with your GTA real estate needs today?`;

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: welcomeMessage }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const clearChat = () => {
    setMessages([
      { id: '1', role: 'assistant', content: welcomeMessage }
    ]);
  };

  const printChat = () => {
    window.print();
  };

  const sendMessage = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const assistantId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '', isStreaming: true }]);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input, agentName, streaming: true })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = '';
      let buffer = '';

      if (!reader) throw new Error('No response body');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.startsWith('data:')) continue;
          
          const dataStr = line.slice(5).trim();
          if (!dataStr) continue;

          try {
            const parsed = JSON.parse(dataStr);
            
            if (parsed.event === 'token' && typeof parsed.data === 'string') {
              fullText += parsed.data;
              setMessages(prev =>
                prev.map(m =>
                  m.id === assistantId
                    ? { ...m, content: fullText, isStreaming: true }
                    : m
                )
              );
            } else if (parsed.event === 'agentFlowEvent' && parsed.data === 'FINISHED') {
              // Flow complete
            }
          } catch {
            // Not JSON, ignore
          }
        }
      }

      // Process remaining buffer
      if (buffer.startsWith('data:')) {
        const dataStr = buffer.slice(5).trim();
        try {
          const parsed = JSON.parse(dataStr);
          if (parsed.event === 'token' && typeof parsed.data === 'string') {
            fullText += parsed.data;
          }
        } catch { /* ignore */ }
      }

      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, content: fullText || 'No response received', isStreaming: false }
            : m
        )
      );
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev =>
        prev.map(m =>
          m.id === assistantId
            ? { ...m, content: "Error connecting to service.", isStreaming: false }
            : m
        )
      );
    } finally {
      setLoading(false);
    }
  }, [input, loading, apiUrl, agentName]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
          <div className="bg-white rounded-3xl w-full max-w-md h-[500px] flex flex-col shadow-2xl border border-slate-200">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-sm rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {agent && <img src={agent.image} alt={agent.name} className="w-12 h-12 rounded-full object-cover border-2 border-slate-100" />}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 leading-none">{agent?.name}</h3>
                  <p className="text-xs text-brand-blue font-medium">{agent?.title}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={printChat}
                  title="Print Chat"
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Printer size={18} className="text-slate-400 hover:text-brand-blue"/></button>
                <button 
                  onClick={clearChat}
                  title="Clear Chat"
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Trash2 size={18} className="text-slate-400 hover:text-brand-red"/></button>
                <button 
                  onClick={onClose} 
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20} className="text-slate-400 hover:text-brand-red"/></button>
              </div>
            </div>
            <div className="flex-grow overflow-y-auto p-5 space-y-5 bg-slate-50 scrollbar-hide">
              {messages.map((m) => {
                let textToRender = m.content;
                let isListings = false;
                let isContractors = false;
                let responseData: any = null;

                if (m.role === 'assistant' && m.content) {
                  try {
                    const parsed = JSON.parse(m.content);
                    if (parsed.response_type === "listings") {
                      isListings = true;
                      responseData = parsed;
                    } else if (parsed.response_type === "contractors") {
                      isContractors = true;
                      responseData = parsed;
                    } else {
                      textToRender = parsed.text || parsed.message || JSON.stringify(parsed);
                    }
                  } catch (e) {
                    // Not JSON, keep as is
                  }
                }

                if (isListings && responseData) {
                  return <ListingCards key={m.id} listings={responseData.listings} message={responseData.message} />;
                }
                
                if (isContractors && responseData) {
                  return <ContractorCards key={m.id} contractors={responseData.results} message={responseData.message || ""} />;
                }

                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={m.id} 
                    className={`p-4 rounded-2xl shadow-sm max-w-[85%] text-sm ${m.role === 'assistant' ? 'bg-white border border-slate-200 text-slate-800 rounded-bl-none' : 'bg-brand-blue text-white rounded-br-none ml-auto'}`}
                  >
                    <ReactMarkdown
                      components={{
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc ml-4 mb-2" {...props} />,
                        li: ({node, ...props}) => <li className="mb-1" {...props} />,
                      }}
                    >
                      {textToRender || (m.isStreaming ? '●' : '')}
                    </ReactMarkdown>
                    {m.isStreaming && (
                      <span className="inline-block w-2 h-2 bg-brand-blue rounded-full animate-pulse ml-1" />
                    )}
                  </motion.div>
                );
              })}
              {loading && messages[messages.length - 1]?.role !== 'assistant' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-slate-400 pl-4 py-2">
                  {agentName} is thinking...
                </motion.div>
              )}
            </div>
            <form onSubmit={sendMessage} className="p-4 border-t border-slate-100 flex gap-2">
              <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow border border-slate-200 rounded-xl p-2 text-sm"
                placeholder="Ask me anything..."
              />
              <button type="submit" className="bg-brand-blue text-white p-2 rounded-xl" disabled={loading}><Send size={18}/></button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
