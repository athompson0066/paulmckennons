import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, MapPin, Palette, Users, Wrench, Calendar, Truck } from 'lucide-react';
import { LIVE_ACTIVITIES } from '../constants';

export default function LiveFeed() {
  const [activities, setActivities] = useState(LIVE_ACTIVITIES.slice(0, 6));
  const [newActivityIndex, setNewActivityIndex] = useState(0);

  const getIcon = (type: string) => {
    switch(type) {
      case 'market': return <MapPin className="w-4 h-4 text-blue-400" />;
      case 'design': return <Palette className="w-4 h-4 text-purple-400" />;
      case 'outreach': return <Users className="w-4 h-4 text-emerald-400" />;
      case 'trades': return <Wrench className="w-4 h-4 text-amber-400" />;
      case 'concierge': return <Calendar className="w-4 h-4 text-rose-400" />;
      case 'moving': return <Truck className="w-4 h-4 text-cyan-400" />;
      default: return <Activity className="w-4 h-4 text-slate-400" />;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Rotate activities to simulate live feed
      setActivities(prev => {
        const next = [...prev];
        const removed = next.shift();
        if (removed) {
          next.push({
            ...removed,
            text: removed.text + ` (${Math.floor(Math.random() * 2) + 1}m ago)`,
            time: 'Just now'
          });
        }
        return next;
      });
      setNewActivityIndex(0);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sticky top-24">
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl border border-white/10 overflow-hidden"
      >
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-red" />
              <h4 className="font-heading text-lg font-bold">Live Activity</h4>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs text-emerald-400 font-medium">Live</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-1">Real-time intelligence feed from all 6 agents</p>
        </div>
        
        <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {activities.map((act, i) => (
              <motion.div
                key={act.text + i}
                initial={i === 0 ? { opacity: 0, x: -20, height: 0 } : {}}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="mt-0.5 flex-shrink-0">
                  {getIcon(act.type)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-200">
                    <span className="font-bold text-white">{act.agent}: </span>
                    {act.text}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-slate-500">{act.time}</span>
                    {act.text.includes('🔥') && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-500/10 text-red-400 font-medium">
                        Hot
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>6 agents monitoring</span>
            <span>GTA-wide coverage</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
