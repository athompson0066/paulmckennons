/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { MapPin, Palette, Users, Wrench, Calendar, Truck, Search } from 'lucide-react';
import AgentCard from './components/AgentCard';
import PainPointSection from './components/PainPointSection';
import FeaturedPropertyShowcase from './components/FeaturedPropertyShowcase';
import NewsGrid from './components/NewsGrid';
import PaulIntro from './components/PaulIntro';
import UnifiedConcierge from './components/UnifiedConcierge';
import PodcastSection from './components/PodcastSection';
import LeadMagnetsSection from './components/LeadMagnetsSection';
import ContactSection from './components/ContactSection';
import { TEAM, LIVE_ACTIVITIES } from './constants';

export default function App() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
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
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="p-6 bg-white shadow-sm sticky top-0 z-50"
      >
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="font-heading text-2xl font-bold text-brand-blue">REALTRON <span className="font-light italic text-slate-500">Intelligence</span></h1>
            <div className="hidden md:flex gap-8 text-xs font-bold text-slate-600 tracking-wider">
                <a href="#about" className="hover:text-brand-blue transition">ABOUT</a>
                <a href="#agents" className="hover:text-brand-blue transition">AGENTS</a>
                <a href="#featured" className="hover:text-brand-blue transition">LISTINGS</a>
                <a href="#magnets" className="hover:text-brand-blue transition">RESOURCES</a>
                <a href="#concierge" className="hover:text-brand-blue transition">CONCIERGE</a>
                <a href="#news" className="hover:text-brand-blue transition">NEWS</a>
                <a href="#contact" className="hover:text-brand-blue transition">CONTACT</a>
            </div>
            <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="bg-brand-blue text-white px-6 py-2 text-xs font-bold rounded-full hover:bg-opacity-90"
            >
                PRIVATE ACCESS
            </motion.button>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[80vh] flex items-center justify-start text-white p-6 overflow-hidden">
        <motion.img 
          src="https://static.vecteezy.com/system/resources/thumbnails/074/596/009/small_2x/excited-interracial-couple-looking-at-smartphone-on-urban-rooftop-happy-man-and-woman-laughing-at-phone-screen-with-city-skyline-background-technology-and-success-concept-free-photo.jpg" 
          alt="Hero Background" 
          className="absolute inset-0 w-full h-full object-cover object-center scale-x-[-1]"
          style={{ y }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02, transition: { duration: 0.4 } }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-left max-w-4xl pl-6 md:pl-24 cursor-default"
        >
          <span className="inline-block bg-brand-red text-white py-1 px-4 rounded-full text-xs font-bold tracking-widest uppercase mb-4">Now Serving the GTA</span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-lg">The GTA’s Only Real Estate Intelligence Team.</h2>
          <p className="text-lg md:text-2xl mb-10 text-blue-100 font-light max-w-3xl drop-shadow">Your 24/7 Real Estate Hub. 38 Years of Paul McKennon’s Expertise, <span className="font-semibold italic text-white">Amplified by Advanced AI Intelligence.</span></p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-blue text-white text-lg px-10 py-4 font-bold rounded-full hover:bg-opacity-90 shadow-xl transition-transform"
          >
            EXPLORE EXCLUSIVE LISTINGS
          </motion.button>
        </motion.div>
      </section>

      <div id="about"><PaulIntro /></div>

      <main className="max-w-7xl mx-auto p-6 md:p-12">
        <PainPointSection />
        
        {/* Roster & Feed Layout */}
        <motion.div 
            id="agents"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12"
        >
          <div className="md:col-span-3">
             <h3 className="font-heading text-sm font-bold mb-8 text-slate-400 uppercase tracking-[0.2em]">Your Dedicated Intelligence Core</h3>
             <motion.div 
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: { staggerChildren: 0.2 }
                    }
                }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
             >
                {TEAM.map((agent, i) => (
                    <AgentCard key={agent.name} agent={agent} />
                ))}
             </motion.div>
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
        </motion.div>
        
        <motion.div id="featured" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <FeaturedPropertyShowcase />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <PodcastSection />
        </motion.div>
        <motion.div id="magnets" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <LeadMagnetsSection />
        </motion.div>
        <motion.div id="news" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <NewsGrid />
        </motion.div>

        <ContactSection />
      </main>

      <motion.div id="concierge" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <UnifiedConcierge />
      </motion.div>

      <motion.footer 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-slate-950 text-slate-400 py-12 px-6"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          <div className="space-y-4">
            <h5 className="font-bold text-white text-lg">Paul McKennon</h5>
            <p>The GTA’s leading real estate concierge, bridging tradition with AI intelligence.</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-white">Quick Links</h5>
            <motion.a href="#" whileHover={{ x: 5 }} className="block hover:text-white">Active Listings</motion.a>
            <motion.a href="#" whileHover={{ x: 5 }} className="block hover:text-white">Services</motion.a>
            <motion.a href="#" whileHover={{ x: 5 }} className="block hover:text-white">Concierge AI</motion.a>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-white">Contact</h5>
            <p>RE/MAX REALTRON REALTY INC.</p>
            <p>Brokerage</p>
            <p>885 PROGRESS AVENUE, STE. 209</p>
            <p>TORONTO, Ontario M1H3G3</p>
            <p>416-767-7253</p>
            <p>416-289-4535</p>
          </div>
          <div className="space-y-2">
            <h5 className="font-bold text-white">Legal</h5>
            <motion.a href="#" whileHover={{ x: 5 }} className="block hover:text-white">Privacy Policy</motion.a>
            <motion.a href="#" whileHover={{ x: 5 }} className="block hover:text-white">Terms of Service</motion.a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 text-xs text-center text-slate-500">
          &copy; 2026 Paul McKennon Real Estate. All rights reserved.
        </div>
      </motion.footer>
    </div>
  );
}
