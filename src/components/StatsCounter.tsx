import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  suffix: string;
  description: string;
}

function AnimatedNumber({ value, suffix, inView }: { value: string; suffix: string; inView: boolean }) {
  const [display, setDisplay] = useState('0');
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  
  useEffect(() => {
    if (!inView) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.floor(increment * step), numericValue);
      setDisplay(current.toLocaleString());
      
      if (step >= steps) {
        setDisplay(value);
        clearInterval(timer);
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [inView, value, numericValue]);
  
  return <span>{display}{suffix}</span>;
}

export default function StatsCounter({ stats }: { stats: Stat[] }) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="glass-card p-6 rounded-2xl border border-white/5 text-center group hover:border-white/10 transition-all"
>
          <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue/20 to-brand-dark/20 border border-brand-blue/10">
            <TrendingUp className="w-6 h-6 text-brand-blue" />
          </div>
          
          <p className="text-3xl md:text-4xl font-bold font-heading text-white mb-1">
            <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
          </p>
          
          <p className="text-sm font-medium text-slate-300 mb-1">{stat.label}</p>
          
          <p className="text-xs text-slate-500">{stat.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
