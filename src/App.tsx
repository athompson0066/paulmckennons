/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { MapPin, Palette, Users, Wrench, Calendar, Truck, Search } from 'lucide-react';
import AgentCard from './components/AgentCard';
import PainPointSection from './components/PainPointSection';
import FeaturedPropertyShowcase from './components/FeaturedPropertyShowcase';
import NewsGrid from './components/NewsGrid';
import PaulIntro from './components/PaulIntro';
import UnifiedConcierge from './components/UnifiedConcierge';
import PodcastSection from './components/PodcastSection';
import { TEAM, LIVE_ACTIVITIES } from './constants';

export default function App() {
  const getActivityIcon = (type: string) => {
    switch(type) {
        case 'market': return <MapPin size={14} className="text-brand-red" />;
        case 'design': return <Palette size={14} className="text-purple-500" />;
        case 'outreach': return <Users size={14} className="text-brand-blue" />;
        case 'trades': return <Wrench size={14} className="text-orange-500" />;
        case 'concierge': return <Calendar size={14} className="text-emerald-500" />;
        case 'moving': return <Truck size={14} className="text-sky-500" />;
        default: return <Search size={14} className="text-slate-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans">
      {/* Navbar */}
      <header className="p-6 bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="font-heading text-2xl font-bold text-brand-blue">REALTRON <span className="font-light italic text-slate-500">Intelligence</span></h1>
            <button className="bg-brand-blue text-white px-6 py-2 text-xs font-bold rounded-full hover:bg-opacity-90">PRIVATE ACCESS</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center text-white p-6 overflow-hidden">
        <img 
          src="https://www.realtronhomes.com/partials/realtronhomes_com/images/slider/3-bg.jpg" 
          alt="Hero Background" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-3xl bg-black/20 backdrop-blur-sm border border-white/10 p-10 rounded-3xl"
        >
          <h2 className="font-heading text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">The GTA’s Only 24/7 Real Estate Intelligence Team.</h2>
          <p className="text-xl mb-8 text-blue-100 font-light max-w-2xl mx-auto">38 Years of Paul McKennon’s Expertise, <span className="font-medium italic border-b-2 border-brand-red">Powered by a Private AI Workforce.</span></p>
          <p className="text-md italic text-blue-200">Experience the ultimate evolution in real estate. Let our blend of timeless experience and cutting-edge intelligence secure your best possible transaction in the GTA today.</p>
        </motion.div>
      </section>

      <PaulIntro />

      <main className="max-w-7xl mx-auto p-6 md:p-12">
        <PainPointSection />
        
        {/* Roster & Feed Layout */}
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-3">
             <h3 className="font-heading text-sm font-bold mb-8 text-slate-400 uppercase tracking-[0.2em]">Your Dedicated Intelligence Core</h3>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {TEAM.map((agent, i) => (
                    <AgentCard key={i} agent={agent} />
                ))}
             </div>
          </div>
          <aside className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
             <h4 className="font-heading text-lg font-semibold mb-4 text-brand-blue">Live Activity</h4>
             <div className="space-y-4 text-sm text-slate-600">
                {LIVE_ACTIVITIES.map((act, i) => (
                    <div key={i} className="flex items-start gap-3">
                        <div className="mt-0.5">{getActivityIcon(act.type)}</div>
                        <p><span className="font-bold text-slate-800">{act.agent}:</span> {act.text}</p>
                    </div>
                ))}
             </div>
          </aside>
        </div>
        
        <FeaturedPropertyShowcase />
        <PodcastSection />
        <NewsGrid />

      </main>

      <UnifiedConcierge />

      <footer className="bg-slate-950 text-slate-400 py-12 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 text-sm">
          <div className="space-y-4">
            <h5 className="font-bold text-white text-lg">McKennon Elite</h5>
            <p>The GTA’s leading real estate concierge, bridging tradition with AI intelligence.</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-white">Quick Links</h5>
            <a href="#" className="block hover:text-white">Active Listings</a>
            <a href="#" className="block hover:text-white">Services</a>
            <a href="#" className="block hover:text-white">Concierge AI</a>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-white">Contact</h5>
            <p>RE/MAX REALTRON REALTY INC.</p>
            <p>Brokerage</p>
            <p>885 PROGRESS AVENUE, STE. 209</p>
            <p>TORONTO, Ontario M1H3G3</p>
            <p>416-289-3333</p>
            <p>416-289-4535</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-white">Legal</h5>
            <a href="#" className="block hover:text-white">Privacy Policy</a>
            <a href="#" className="block hover:text-white">Terms of Service</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 text-xs text-center text-slate-500">
          &copy; 2026 McKennon Elite Real Estate. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
