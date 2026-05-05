import { useState } from 'react';
import { motion } from 'framer-motion'; // Ensure you are using 'framer-motion' or your specific 'motion/react' alias
import { Linkedin, Twitter, Instagram, MessageCircle } from 'lucide-react';
import ChatPopup from './ChatPopup';

interface Agent {
  name: string;
  title: string;
  bio: string;
  insight: string;
  roleHighlight: string;
  aboutMe: string;
  image: string;
  socialLinks: {
    linkedin: string;
    twitter: string;
    instagram: string;
  };
}

// Map agent names to their specific Flowise API endpoints
export const AGENT_API_MAP: Record<string, string> = {
  'Sarah': 'https://flowise.aiolosmedia.com/api/v1/prediction/1600fdb2-2d41-48d0-b8b8-12e4f521ee7b',
  'Elias': 'https://flowise.aiolosmedia.com/api/v1/prediction/ffc08529-cd30-4ce1-afca-1abe5f9149c5',
  'Maya':  'https://flowise.aiolosmedia.com/api/v1/prediction/2655efdb-f498-41dd-a6b1-d9b7b5e0fb1c',
  'Vince': 'https://flowise.aiolosmedia.com/api/v1/prediction/fb170a66-116b-4c7b-80b7-f784c78add47',
  'Bella': 'https://flowise.aiolosmedia.com/api/v1/prediction/4dd56503-fd61-4090-aa3d-0e24d7011c98',
  'Penny': 'https://flowise.aiolosmedia.com/api/v1/prediction/4a129e23-31c9-4a78-8089-da37d137d451'
};

export default function AgentCard({ agent }: { agent: Agent }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Check if this agent has a chat capability
  const hasChat = !!AGENT_API_MAP[agent.name];

  return (
    <motion.div
       whileHover={{ 
         borderColor: "#003DA5",
         boxShadow: "0 0 20px rgba(0, 61, 165, 0.3)" 
       }}
       className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 transition-all hover:border-brand-blue group flex flex-col h-full"
    >
      <img src={agent.image} alt={agent.name} className="w-12 h-12 rounded-full mb-3 object-cover shadow-sm" />
      <h4 className="font-bold text-sm text-brand-blue">{agent.name}</h4>
      <p className="text-[10px] text-slate-400 font-semibold mb-2 uppercase">{agent.title}</p>
      <p className="text-[11px] leading-relaxed text-slate-600 italic mb-4">"{agent.bio}"</p>
      <p className="text-[11px] text-slate-600 leading-relaxed mb-4 flex-grow">{agent.aboutMe}</p>
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-3">
          <a href={agent.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-blue transition">
            <Linkedin size={16} />
          </a>
          <a href={agent.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-blue transition">
            <Twitter size={16} />
          </a>
          <a href={agent.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-blue transition">
            <Instagram size={16} />
          </a>
        </div>
        
        {hasChat && (
            <button 
              onClick={() => setIsChatOpen(true)} 
              className="flex items-center gap-1 bg-brand-blue text-white text-[10px] font-bold px-2 py-1 rounded-full hover:bg-brand-red transition"
            >
              <MessageCircle size={10} /> Chat
            </button>
        )}
      </div>

      <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 mt-auto space-y-2">
        <div>
           <p className="text-[10px] font-bold text-brand-red uppercase tracking-wide">Daily Insight</p>
           <p className="text-[11px] text-slate-700">{agent.insight}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-brand-blue uppercase tracking-wide">Role Highlight</p>
          <p className="text-[11px] text-slate-700">{agent.roleHighlight}</p>
        </div>
      </div>

      {hasChat && (
        <ChatPopup 
          isOpen={isChatOpen} 
          onClose={() => setIsChatOpen(false)} 
          agentName={agent.name} 
          apiUrl={AGENT_API_MAP[agent.name]} 
        />
      )}
    </motion.div>
  );
}
