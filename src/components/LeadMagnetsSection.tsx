import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, DollarSign, Calculator, Eye, FileText } from 'lucide-react';

const MAGNETS = [
  { id: 1, title: 'The "Hidden Inventory" Weekly List', shortTitle: 'Off-Market Access', description: 'Get access to GTA homes before they hit the public market. Tired of seeing the same stale listings? Receive our curated, weekly PDF of "Off-Market & Coming Soon" properties directly to your inbox.', hook: 'Get access to GTA homes before they hit the public market.' },
  { id: 2, title: 'Hyper-Local "Sold" Report', shortTitle: 'Sold Report', description: 'Stop guessing what homes are worth. See actual sale prices for your specific neighborhood over the last 30 days and understand the real market value versus the asking price.', hook: 'See actual sale prices in your neighborhood.' },
  { id: 3, title: 'Curb Appeal & ROI Guide', shortTitle: 'Renovator Guide', description: 'Focus your renovation dollars on the upgrades that matter most. We provide a checklist of 7 DIY-friendly projects specifically tuned to GTA-style homes that offer the highest return on investment.', hook: '7 DIY upgrades that add $25,000 in value.' },
  { id: 4, title: 'Hidden Costs Calculator', shortTitle: 'Buyer Costs', description: 'Don\'t get blindsided at closing. Our calculator provides a breakdown of land transfer taxes, lawyer fees, and adjustment costs for first-time buyers in the GTA.', hook: 'Don\'t get surprised by $20,000 in closing costs.' },
  { id: 5, title: 'Virtual Home Staging Lookbook', shortTitle: 'AI Staging', description: 'See our technical edge in action. We use cutting-edge AI to virtually stage homes, making them appeal to a wider range of buyers and selling them faster.', hook: 'See how we use AI to sell faster.' },
  { id: 6, title: 'Free Home Evaluation', shortTitle: 'Home Value', description: 'Wondering what your home is worth in today\'s market? Get a comprehensive, data-driven home evaluation tailored specifically to your home\'s unique features and location.', hook: 'Know your home\'s true market potential.' },
  { id: 7, title: 'Mortgage Affordability Calculator', shortTitle: 'Mortgage Calc', description: 'Understand exactly how much you can afford in the current GTA market. Our intuitive, step-by-step calculator helps you map out your financial capacity before you start your search.', hook: 'Calculate your maximum affordability' }
];

import MortgageCalculator from './MortgageCalculator';

export default function LeadMagnetsSection() {
    const [selected, setSelected] = useState(MAGNETS[0]);
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');

    return (
        <section id="magnets" className="my-20 px-6">
            <h3 className="font-heading text-sm font-bold mb-10 text-slate-400 uppercase tracking-[0.3em] text-center">Exclusive Real Estate Resources</h3>
            
            <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
                {/* Sidebar */}
                <div className="space-y-4">
                {MAGNETS.map(m => (
                    <button 
                    key={m.id}
                    onClick={() => setSelected(m)}
                    className={`w-full p-4 rounded-xl text-left transition ${selected.id === m.id ? 'bg-brand-blue text-white shadow-lg' : 'bg-white text-slate-700 hover:bg-slate-100'}`}
                    >
                    <h4 className="font-bold">{m.shortTitle}</h4>
                    </button>
                ))}
                </div>

                {/* Content */}
                <motion.div 
                key={selected.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="md:col-span-3 bg-white p-8 rounded-3xl shadow-xl border border-slate-100 flex flex-col justify-between"
                >
                    <div>
                        <h2 className="font-heading text-3xl font-bold text-slate-900 mb-4">{selected.title}</h2>
                        <p className="text-brand-blue font-semibold mb-6">{selected.hook}</p>
                        <p className="text-slate-600 mb-8 leading-relaxed">{selected.description}</p>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        {selected.id === 7 ? (
                            <MortgageCalculator />
                        ) : (
                            <>
                                <h5 className="font-bold text-slate-900 mb-4">Get This Resource</h5>
                                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                    <input 
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Full Name"
                                        className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-blue"
                                    />
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email" 
                                        className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-blue" 
                                    />
                                    {selected.id === 6 && (
                                        <input 
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Property Address"
                                            className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-brand-blue"
                                        />
                                    )}
                                    <button type="submit" className="w-full bg-brand-blue text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-blue/90 transition text-center">Download</button>
                                </form>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
