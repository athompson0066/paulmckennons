import { motion } from 'motion/react';
import { Award, TrendingUp, Clock, Users, Star, TrendingDown, Shield, Globe } from 'lucide-react';

export default function PaulSection() {
  return (
    <section id="paul" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0 bg-grid bg-center opacity-20" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-6">
                <Award className="w-4 h-4 text-brand-gold" />
                <span className="text-sm font-medium text-brand-gold">38 Years of Excellence</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Experience Meets
                <br />
                <span className="gradient-text-gold">Intelligence</span>
              </h2>
              
              <div className="space-y-4 text-slate-300 text-lg">
                <p>
                  For nearly four decades, I've built relationships across the GTA — from 
                  first-time buyers to luxury investors. I've seen every market cycle, every 
                  neighborhood transformation, every opportunity that others miss.
                </p>
                
                <p>
                  Today, I'm not just a realtor. I'm the <span className="text-white font-semibold">CEO of a digital intelligence agency</span> 
                  that operates 24/7. Six AI agents work alongside me, amplifying my expertise 
                  to deliver what no single agent — or even a team — can match.
                </p>
                
                <p className="text-brand-gold font-medium italic border-l-2 border-brand-gold/30 pl-4">
                  "This isn't science fiction. This is happening right now. And I'm the first 
                  Realtor in Canada — maybe the world — to prove that AI and human expertise 
                  can work as one."
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: Users, value: "2,400+", label: "Happy Clients", color: "text-blue-400" },
                  { icon: Star, value: "98%", label: "Client Satisfaction", color: "text-amber-400" },
                  { icon: Globe, value: "GTA", label: "Market Coverage", color: "text-emerald-400" },
                  { icon: Shield, value: "24/7", label: "AI Monitoring", color: "text-rose-400" },
                ].map((item, i) => (
                  <div key={i} className="glass-card p-4 rounded-xl flex items-center gap-3">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <div>
                      <p className="text-lg font-bold text-white">{item.value}</p>
                      <p className="text-xs text-slate-400">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* RE/MAX Brand Highlight */}
              <div className="glass-card-strong rounded-3xl p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-red to-red-700 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">R</span>
                  </div>
                  <div>
                    <p className="font-heading text-lg font-bold">RE/MAX REALTRON</p>
                    <p className="text-xs text-slate-400">REALTY INC. | Brokerage</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-300">Market Position</span>
                      <span className="text-xs text-emerald-400 font-medium">#1 in GTA</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div className="bg-gradient-to-r from-emerald-500 to-brand-gold h-2 rounded-full" style={{ width: '98%' }} />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Top 1% of RE/MAX agents nationwide</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Experience", value: "38 Years", icon: Clock },
                      { label: "Avg Sale Price", value: "$1.2M+", icon: TrendingUp },
                      { label: "Response Time", value: "15 Seconds", icon: TrendingDown },
                      { label: "AI Agents", value: "6 Active", icon: Users },
                    ].map((item, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                        <item.icon className="w-5 h-5 text-brand-blue mx-auto mb-2" />
                        <p className="text-sm font-bold text-white">{item.value}</p>
                        <p className="text-[10px] text-slate-400">{item.label}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 rounded-xl bg-brand-blue/5 border border-brand-blue/10">
                    <p className="text-sm text-slate-300">
                      <span className="text-brand-gold font-bold">The Future Is Here:</span>{" "}
                      Paul McKennon is pioneering AI-powered real estate in Canada. 
                      His 6-agent intelligence core operates 24/7, delivering unmatched 
                      market intelligence and client service.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decorative glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-blue/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-red/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
