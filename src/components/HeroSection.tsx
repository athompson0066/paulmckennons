import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Shield, Clock, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 5 + Math.random() * 10,
    size: 2 + Math.random() * 4,
  }));

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute inset-0 bg-grid bg-center opacity-30" />
      <div className="absolute inset-0 noise-overlay" />
      
      {/* Floating particles */}
      {mounted && particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-10px',
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-blue/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-brand-red/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
        >
          <Sparkles className="w-4 h-4 text-brand-gold" />
          <span className="text-sm font-medium text-brand-gold tracking-wide">
            Canada's First AI-Powered Real Estate Team
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 leading-[0.95] tracking-tight"
        >
          <span className="text-white">The GTA's Only</span>
          <br />
          <span className="gradient-text-gold shimmer-text">Intelligence Agency</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-4 font-light"
        >
          38 years of Paul McKennon's expertise, amplified by
          <span className="text-white font-semibold"> six AI agents</span> working 24/7 to find, negotiate, and close your perfect deal.
        </motion.p>

        {/* Trust badges */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-slate-400 mb-10 text-base"
        >
          RE/MAX REALTRON REALTY INC. | Brokerage | Toronto, Ontario
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <motion.a
            href="#agents"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-brand-blue to-brand-dark text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl hover:shadow-brand-blue/30 transition-all"
          >
            Meet the AI Team
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
          
          <motion.a
            href="#stats"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 glass-card-strong text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/10 transition-all border border-white/20"
          >
            <Zap className="w-5 h-5 text-brand-gold" />
            See Live Metrics
          </motion.a>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm text-slate-400"
        >
          {[
            { icon: Shield, label: "24/7 Active Monitoring", color: "text-emerald-400" },
            { icon: Clock, label: "15s Avg Response Time", color: "text-brand-blue" },
            { icon: Zap, label: "Real-Time Market Intelligence", color: "text-brand-gold" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <item.icon className={`w-4 h-4 ${item.color}`} />
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-xs tracking-widest uppercase">Scroll to Explore</span>
          <ArrowRight className="w-4 h-4 rotate-90" />
        </motion.div>
      </motion.div>
    </section>
  );
}
