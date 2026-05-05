import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, X, Bed, Bath, Home } from 'lucide-react';

const PROPERTIES = [
  { 
    id: 1, 
    title: "10 Lagerfeld Drive #511, Brampton", 
    price: "$498,000", 
    beds: 1, 
    baths: 1, 
    description: "Welcome to this beautiful 1-bedroom plus den suite with unobstructed views in Daniels MPV, ideally located in the heart of Brampton's vibrant Mount Pleasant Village community.", 
    image: "https://media.remarketer.ca/VOW/W13074282-1.jpg?tr=di-propertynoimage_pj5ksb5iM.jpg,w-1200,h-805,c-force,pr-true" 
  },
  { 
    id: 2, 
    title: "20 Amberwood Court, Markham", 
    price: "$2,298,000", 
    beds: 4, 
    baths: 5, 
    description: "Your dream home in prestigious Unionville! Rarely offered on a tranquil cul-de-sac, this exceptional 2-storey residence offers approx. 5,000 sq ft of beautifully upgraded living space with refined, luxury finishes throughout.", 
    image: "https://media.remarketer.ca/VOW/N13073946-1.jpg?tr=di-propertynoimage_pj5ksb5iM.jpg,w-1200,h-805,c-force,pr-true" 
  },
  { 
    id: 3, 
    title: "30 Ordnance Street #2704, Toronto", 
    price: "$748,000", 
    beds: 2, 
    baths: 2, 
    description: "Discover the pinnacle of urban living within this refined 2-bed, 2-bath condo nestled in the heart of Liberty Village perched on the 27th floor. Encompassing an expansive 690 sq. ft., this residence boasts a generous balcony offering breathtaking north-facing city vistas.", 
    image: "https://media.remarketer.ca/VOW/C13072744-5.jpg?tr=di-propertynoimage_pj5ksb5iM.jpg,w-1200,h-805,c-force,pr-true" 
  },
];

export default function FeaturedPropertyShowcase() {
  const [current, setCurrent] = useState(0);
  const [showTour, setShowTour] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPausedRef.current) {
        setCurrent((p) => (p + 1) % PROPERTIES.length);
      }
    }, 5000); 

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="my-10 md:my-20">
      <h3 className="font-heading text-sm font-bold mb-6 md:mb-10 text-slate-400 uppercase tracking-[0.3em] text-center">Curated Estates</h3>
      
      <div 
        className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 md:p-8 shadow-2xl overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
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
                <h4 className="font-heading text-3xl font-bold text-brand-blue mb-2">{PROPERTIES[current].title}</h4>
                <p className="text-3xl font-bold text-brand-blue mb-2 md:mb-4">{PROPERTIES[current].price}</p>
                <p className="text-slate-600 leading-relaxed mb-4 md:mb-8 flex-grow">{PROPERTIES[current].description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4 md:mb-8">
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3">
                        <Bed className="text-brand-blue" />
                        <span className="text-brand-blue font-bold">
                            {current === 0 
                                ? `${PROPERTIES[current].beds} Bed` 
                                : `${PROPERTIES[current].beds} ${PROPERTIES[current].beds === 1 ? 'Bedroom' : 'Bedrooms'}`}
                        </span>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3">
                        <Bath className="text-brand-blue" />
                        <span className="text-brand-blue font-bold">
                            {current === 0 
                                ? `${PROPERTIES[current].baths} Bath` 
                                : `${PROPERTIES[current].baths} ${PROPERTIES[current].baths === 1 ? 'Bathroom' : 'Bathrooms'}`}
                        </span>
                    </div>
                </div>
                
                <button 
                    onClick={() => {
                        if (current === 0) {
                            window.open('https://www.realtronhomes.com/details/W13074282/10-Lagerfeld%20Drive', '_blank');
                        } else if (current === 1) {
                            window.open('https://www.realtronhomes.com/details/N13073946/20-Amberwood%20Court', '_blank');
                        } else if (current === 2) {
                            window.open('https://www.realtronhomes.com/details/C13072744/30-Ordnance%20Street', '_blank');
                        } else {
                            setShowTour(true);
                        }
                    }} 
                    className="flex items-center justify-center gap-3 bg-brand-blue text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-blue/90 transition shadow-lg"
                >
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
