import { motion } from 'motion/react';
import { Play, Zap, BarChart3, Bot, ArrowRight } from 'lucide-react';

interface Agent {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  insight: string;
  stat: string;
  statLabel: string;
  gradient: string;
  image: string;
  capabilities: string[];
}

export default function AgentCard({ agent, onDemo }: { agent: Agent; onDemo: () => void }) {
  return (
    <motion.div
      whileHover={{ 
        y: -8,
      }}
      className="relative group h-full"
    >
      <div className="relative h-full glass-card rounded-2xl p-6 border border-white/5 overflow-hidden transition-all duration-300 group-hover:border-brand-blue/30 group-hover:shadow-xl group-hover:shadow-brand-blue/10">
        {/* Gradient accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${agent.gradient}`} />
        
        {/* Glow effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${agent.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className="relative">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agent.gradient} flex items-center justify-center shadow-lg overflow-hidden`}>
                <img 
                  src={agent.image} 
                  alt={agent.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-slate-950 flex items-center justify-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-lg font-bold text-white">{agent.name}</h3>
              <p className="text-sm font-medium text-brand-blue">{agent.title}</p>
              <p className="text-xs text-slate-500">{agent.subtitle}</p>
            </div>
          </div>

          {/* Bio */}
          <p className="text-sm text-slate-300 leading-relaxed mb-4">{agent.bio}</p>

          {/* Key stat */}
          <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-white/5 border border-white/5">
            <BarChart3 className="w-5 h-5 text-brand-gold" />
            <div>
              <p className="text-2xl font-bold text-white font-heading">{agent.stat}</p>
              <p className="text-xs text-slate-400">{agent.statLabel}</p>
            </div>
          </div>

          {/* Capabilities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {agent.capabilities.slice(0, 3).map((cap, i) => (
              <span 
                key={i} 
                className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 font-medium"
              >
                {cap}
              </span>
            ))}
            {agent.capabilities.length > 3 && (
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-500"
>
                +{agent.capabilities.length - 3}
              </span>
            )}
          </div>

          {/* Insight card */}
          <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 mb-4">
            <p className="text-[10px] font-bold text-brand-blue uppercase tracking-wide mb-1">Live Insight</p>
            <p className="text-xs text-slate-300 leading-relaxed">{agent.insight}</p>
          </div>

          {/* Demo button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onDemo}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-brand-blue/20 to-brand-dark/20 border border-brand-blue/30 text-brand-blue text-sm font-bold hover:from-brand-blue/30 hover:to-brand-dark/30 transition-all group/btn"
          >
            <Play className="w-4 h-4" />
            Watch {agent.name} in Action
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
