import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, School, TrendingUp, DollarSign, Briefcase, Coffee, Trees, Train } from 'lucide-react';
import { NEIGHBORHOODS } from '../constants';

export default function NeighborhoodDeepDive() {
  const [selected, setSelected] = useState(NEIGHBORHOODS[0]);

  return (
    <section className="my-20 px-6">
      <h3 className="font-heading text-sm font-bold mb-10 text-slate-400 uppercase tracking-[0.3em] text-center">Neighborhood Deep Dive</h3>
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="space-y-4">
          {NEIGHBORHOODS.map(n => (
            <button 
              key={n.id}
              onClick={() => setSelected(n)}
              className={`w-full p-4 rounded-xl text-left transition ${selected.id === n.id ? 'bg-brand-blue text-white shadow-lg' : 'bg-white text-slate-700 hover:bg-slate-100'}`}
            >
              <h4 className="font-bold">{n.name}</h4>
              <p className="text-xs opacity-80">{n.avgPrice}</p>
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div 
          key={selected.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-3 bg-white p-8 rounded-3xl shadow-xl border border-slate-100"
        >
          <div className="flex justify-between items-start mb-6">
            <h2 className="font-heading text-3xl font-bold text-slate-900">{selected.name}</h2>
            <div className="flex gap-2">
              <span className="bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full text-xs font-bold">{selected.avgPrice}</span>
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold">{selected.trend}</span>
            </div>
          </div>
          
          <p className="text-slate-600 mb-8 leading-relaxed">{selected.description}</p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
              <School className="text-brand-blue" />
              <div>
                <p className="text-xs text-slate-500 uppercase">Schools</p>
                <p className="font-bold text-slate-900">{selected.schools}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
              <Briefcase className="text-brand-blue" />
              <div>
                <p className="text-xs text-slate-500 uppercase">Avg Sold</p>
                <p className="font-bold text-slate-900">{selected.soldProperties} this month</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
              <TrendingUp className="text-brand-blue" />
              <div>
                <p className="text-xs text-slate-500 uppercase">Trend</p>
                <p className="font-bold text-slate-900">{selected.trend}</p>
              </div>
            </div>
          </div>

          <h5 className="font-bold text-slate-900 mb-4">Local Highlights</h5>
          <div className="flex flex-wrap gap-2">
            {selected.amenities.map(a => (
              <span key={a} className="flex items-center gap-2 bg-slate-100 text-slate-700 px-3 py-2 rounded-lg text-sm">
                {a === 'High-end Dining' && <Coffee size={16}/>}
                {a === 'Luxury Shopping' && <DollarSign size={16}/>}
                {a === 'Parks' && <Trees size={16}/>}
                {a === 'Transit Hub' && <Train size={16}/>}
                {a}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
