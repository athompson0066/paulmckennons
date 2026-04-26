import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, X, Bed, Bath, Home } from 'lucide-react';

const PROPERTIES = [
  { 
    id: 1, 
    title: "Modern Condo, Yorkville", 
    price: "$1,250,000", 
    beds: 2, 
    baths: 2, 
    description: "Experience unparalleled luxury in the heart of Yorkville. Floor-to-ceiling windows, integrated smart appliances, and a private terrace overlooking the city skyline.", 
    image: "https://picsum.photos/seed/prop1/800/600" 
  },
  { 
    id: 2, 
    title: "Heritage Home, The Beaches", 
    price: "$2,400,000", 
    beds: 4, 
    baths: 3, 
    description: "A meticulously maintained heritage home just steps from the boardwalk. Featuring original crown molding, gourmet kitchen, and an expansive backyard oasis.", 
    image: "https://picsum.photos/seed/prop2/800/600" 
  },
];

export default function FeaturedPropertyShowcase() {
  const [current, setCurrent] = useState(0);
  const [showTour, setShowTour] = useState(false);

  return (
    <section className="my-20">
      <h3 className="font-heading text-sm font-bold mb-10 text-slate-400 uppercase tracking-[0.3em] text-center">Curated Estates</h3>
      
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8">
            <div className="relative h-80 md:h-[400px] group rounded-2xl overflow-hidden shadow-lg border border-white/10">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={current}
                        initial={{ opacity: 0, scale: 1.05 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        src={PROPERTIES[current].image} alt="Property" className="w-full h-full object-cover"
                    />
                </AnimatePresence>
                <div className="absolute inset-0 flex justify-between items-center p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setCurrent(p => p === 0 ? PROPERTIES.length - 1 : p - 1)} className="p-3 bg-white/30 backdrop-blur-md rounded-full text-white hover:bg-white/50 transition"><ChevronLeft /></button>
                    <button onClick={() => setCurrent(p => (p + 1) % PROPERTIES.length)} className="p-3 bg-white/30 backdrop-blur-md rounded-full text-white hover:bg-white/50 transition"><ChevronRight /></button>
                </div>
            </div>
            
            <div className="flex flex-col justify-center">
                <h4 className="font-heading text-3xl font-bold text-white mb-2">{PROPERTIES[current].title}</h4>
                <p className="text-3xl font-bold text-brand-blue mb-4">{PROPERTIES[current].price}</p>
                <p className="text-slate-200 leading-relaxed mb-8 flex-grow">{PROPERTIES[current].description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3">
                        <Bed className="text-brand-blue" />
                        <span className="text-white font-bold">{PROPERTIES[current].beds} Beds</span>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3">
                        <Bath className="text-brand-blue" />
                        <span className="text-white font-bold">{PROPERTIES[current].baths} Baths</span>
                    </div>
                </div>
                
                <button onClick={() => setShowTour(true)} className="flex items-center justify-center gap-3 bg-brand-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-blue/90 transition shadow-lg">
                    <Play className="w-5 h-5 fill-current"/> Experience Virtual Tour
                </button>
            </div>
        </div>
        
        {showTour && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-lg p-6">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl max-w-3xl w-full text-center relative">
                    <button onClick={() => setShowTour(false)} className="absolute top-4 right-4 text-white hover:text-brand-blue"><X size={24} /></button>
                    <h4 className="text-2xl font-bold mb-8 text-white">Interactive 3D Walkthrough</h4>
                    <div className="w-full h-80 bg-slate-900/50 rounded-2xl flex items-center justify-center text-slate-400 italic mb-8 border border-white/10">
                        <Home size={48} className="mr-4"/> 3D Tour Engine Placeholder
                    </div>
                </div>
            </div>
        )}
      </div>
    </section>
  );
}
