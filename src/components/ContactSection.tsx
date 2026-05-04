import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactSection() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    return (
        <section id="contact" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                {/* Left Column */}
                <div>
                    <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-brand-blue mb-6 tracking-tight">Let's connect.</h2>
                    <p className="text-slate-600 mb-10 text-lg leading-relaxed">Whether you're looking to sell, buy, or just need expert insight into the GTA market, our team is here to provide the personalized guidance you deserve.</p>
                    <div className="space-y-6 text-slate-700">
                             <div className="flex items-center gap-4">
                                <div className="p-3 bg-brand-blue/10 rounded-full text-brand-blue">
                                    <Mail size={20} />
                                </div>
                                <span className="text-lg">567sale@gmail.com</span>
                            </div>
                             <div className="flex items-center gap-4">
                                <div className="p-3 bg-brand-blue/10 rounded-full text-brand-blue">
                                    <Phone size={20} />
                                </div>
                                <span className="text-lg">416-767-7253</span>
                            </div>
                             <div className="flex items-center gap-4">
                                <div className="p-3 bg-brand-blue/10 rounded-full text-brand-blue">
                                    <MapPin size={20} />
                                </div>
                                <span className="text-lg">885 Progress Ave, Toronto</span>
                            </div>
                    </div>
                </div>
                {/* Right Column (Form) */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-slate-50 p-8 md:p-10 rounded-3xl border border-slate-100 shadow-xl"
                >
                         <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                             <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-4 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-brand-blue outline-none" />
                             <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-brand-blue outline-none" />
                             <textarea placeholder="How can we help?" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-4 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-brand-blue outline-none h-32"></textarea>
                             <button type="submit" className="w-full bg-brand-blue text-white py-4 rounded-xl font-bold hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20">Send Message</button>
                         </form>
                </motion.div>
            </div>
        </section>
    );
}
