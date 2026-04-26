import { Play, Mic, Headphones } from 'lucide-react';
import { motion } from 'motion/react';

export default function PodcastSection() {
  return (
    <section className="py-20 px-6 bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 text-brand-red font-bold text-sm uppercase tracking-widest">
            <Mic size={18} /> Podcast Series
          </div>
          <h3 className="font-heading text-4xl font-extrabold leading-tight">
            GTA Real Estate <span className="text-brand-blue">Uncovered</span>
          </h3>
          <p className="text-slate-300 text-lg">
            Join Paul McKennon as he breaks down the most pressing pain points in the GTA market, from inventory shortages to financing hurdles. Learn how his private AI workforce is shifting the paradigm and solving these challenges for his clients in real-time.
          </p>
          <button className="flex items-center gap-3 bg-brand-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-blue/90 transition shadow-lg">
            <Play className="w-5 h-5 fill-current"/> Listen to Latest Episode
          </button>
        </div>
        
        <div className="flex-1 w-full bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl flex flex-col items-center justify-center gap-4">
             <Headphones size={64} className="text-brand-blue"/>
             <p className="text-slate-400 font-medium">Episode #12: Solving the Inventory Crunch</p>
             <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                <div className="bg-brand-red w-1/3 h-full"></div>
             </div>
        </div>
      </div>
    </section>
  );
}
