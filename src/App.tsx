import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Sparkles, Zap, TrendingUp, Users, MessageSquare, 
  ArrowRight, Shield, Clock, Award, ChevronDown, Play,
  X, Bot, Circle, CheckCircle2
} from 'lucide-react';
import AgentCard from './components/AgentCard';
import AgentDemo from './components/AgentDemo';
import LiveFeed from './components/LiveFeed';
import StatsCounter from './components/StatsCounter';
import HeroSection from './components/HeroSection';
import PaulSection from './components/PaulSection';
import { TEAM, STATS } from './constants';

function App() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const openDemo = (agentName: string) => {
    setSelectedAgent(agentName);
    setShowDemo(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden" ref={scrollRef}>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-brand-red to-brand-gold z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card-strong border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-dark flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-red rounded-full animate-pulse" />
            </div>
            <div>
              <h1 className="font-heading text-lg font-bold tracking-tight">
                <span className="text-white">Paul</span>
                <span className="text-brand-red">McKennon</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Real Estate Intelligence</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#agents" className="hover:text-white transition-colors">Intelligence Core</a>
            <a href="#stats" className="hover:text-white transition-colors">Live Metrics</a>
            <a href="#paul" className="hover:text-white transition-colors">Paul's Vision</a>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-emerald-400">6 Agents Active</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-brand-blue to-brand-dark text-white px-5 py-2 rounded-full text-sm font-bold hover:shadow-lg hover:shadow-brand-blue/25 transition-all"
              onClick={() => document.getElementById('agents')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Meet the Team
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Live Stats Counter */}
      <section id="stats" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-grid bg-center" />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 mb-6">
              <Zap className="w-4 h-4 text-brand-blue" />
              <span className="text-sm font-medium text-brand-blue">Real-Time Intelligence</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Numbers That <span className="gradient-text-gold">Speak</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              38 years of experience. Amplified by 6 AI agents working around the clock. 
              This isn't the future of real estate — <span className="text-white font-medium">this is right now.</span>
            </p>
          </motion.div>
          
          <StatsCounter stats={STATS} />
        </div>
      </section>

      {/* Agent Roster */}
      <section id="agents" className="py-24 relative">
        <div className="absolute inset-0 animated-gradient opacity-30" />
        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/10 border border-brand-red/20 mb-6">
              <Bot className="w-4 h-4 text-brand-red" />
              <span className="text-sm font-medium text-brand-red">The Intelligence Core</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Meet Your <span className="gradient-text-blue">AI Workforce</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Six specialized agents. One unified mission: find, negotiate, coordinate, 
              and close the best real estate deals in the GTA — faster and smarter than any human team.
            </p>
          </motion.div>

          {/* Two-column: Agents grid + Live feed */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-6">
                {TEAM.map((agent, i) => (
                  <motion.div
                    key={agent.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <AgentCard 
                      agent={agent} 
                      onDemo={() => openDemo(agent.name)} 
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <LiveFeed />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/5 via-transparent to-brand-red/5" />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="glass-card-strong p-12 rounded-3xl border border-white/10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-red flex items-center justify-center mx-auto mb-6 glow-blue">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                See the AI in <span className="text-brand-red">Action</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                Don't just read about it — experience it. Click any agent above to watch a live 
                demonstration of how Paul McKennon's AI team works in real-time.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-4 text-left">
                {[
                  { icon: MessageSquare, label: "Real Conversations", desc: "Watch agents respond to genuine client inquiries" },
                  { icon: TrendingUp, label: "Live Market Data", desc: "See real-time property alerts and market shifts" },
                  { icon: Shield, label: "End-to-End Service", desc: "From search to closing — zero human delays" },
                ].map((item, i) => (
                  <div key={i} className="glass-card p-4 rounded-xl">
                    <item.icon className="w-6 h-6 text-brand-blue mb-2" />
                    <p className="font-semibold text-sm">{item.label}</p>
                    <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 bg-gradient-to-r from-brand-blue to-brand-dark text-white px-8 py-4 rounded-full text-base font-bold hover:shadow-lg hover:shadow-brand-blue/30 transition-all flex items-center gap-2 mx-auto"
                onClick={() => openDemo("Maya")}
              >
                <Play className="w-5 h-5" />
                Watch Maya Demo
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Paul Section */}
      <PaulSection />

      {/* Footer */}
      <footer className="relative py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-dark flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-heading text-xl font-bold">
                  <span className="text-white">Paul</span>
                  <span className="text-brand-red">McKennon</span>
                </h3>
              </div>
              <p className="text-slate-400 max-w-md">
                Toronto's first AI-powered real estate team. 38 years of expertise, 
                amplified by cutting-edge intelligence. The future of real estate is here.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <a href="#agents" className="block hover:text-brand-blue transition">AI Team</a>
                <a href="#stats" className="block hover:text-brand-blue transition">Live Metrics</a>
                <a href="#paul" className="block hover:text-brand-blue transition">About Paul</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-slate-400">
                <p>RE/MAX REALTRON REALTY INC.</p>
                <p>885 PROGRESS AVENUE, STE. 209</p>
                <p>TORONTO, Ontario M1H3G3</p>
                <p className="text-brand-gold font-medium">416-289-3333</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500">
              &copy; 2026 Paul McKennon Real Estate Intelligence. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Circle className="w-2 h-2 text-emerald-400 fill-emerald-400" />
              <span>6 AI Agents Active</span>
              <span className="text-slate-700">|</span>
              <span>24/7 Intelligence</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Agent Demo Modal */}
      <AnimatePresence>
        {showDemo && selectedAgent && (
          <AgentDemo 
            agentName={selectedAgent} 
            onClose={() => { setShowDemo(false); setSelectedAgent(null); }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
