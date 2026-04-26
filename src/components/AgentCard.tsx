import { motion } from 'motion/react';
import { Linkedin, Twitter, Instagram } from 'lucide-react';

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

export default function AgentCard({ agent }: { agent: Agent }) {
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
      
      <div className="flex space-x-3 mb-4">
        <a href={agent.socialLinks.linkedin} className="text-slate-400 hover:text-brand-blue transition"><Linkedin size={16} /></a>
        <a href={agent.socialLinks.twitter} className="text-slate-400 hover:text-brand-blue transition"><Twitter size={16} /></a>
        <a href={agent.socialLinks.instagram} className="text-slate-400 hover:text-brand-blue transition"><Instagram size={16} /></a>
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
    </motion.div>
  );
}
