import { Phone, MessageCircle } from 'lucide-react';

export default function PaulIntro() {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[1fr,2fr] gap-12 items-start">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <img 
            src="https://cdn.realtor.ca/individuals/TS638851689600000000/highres/1054816.jpg" 
            alt="Paul McKennon" 
            className="w-24 h-24 rounded-full mb-6 shadow-lg object-cover" 
          />
          <h4 className="font-bold text-brand-blue text-lg">Paul McKennon</h4>
          <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">Founding Director</p>
        </div>
        
        <div className="text-left">
          <h3 className="font-heading text-3xl font-bold text-brand-blue mb-6">
            A note from Paul McKennon
          </h3>
          <p className="text-xl text-slate-700 leading-relaxed italic mb-8 border-l-4 border-brand-red pl-4">
            "With 38 years in the GTA real estate market, I’ve seen every cycle, every trend, and nearly every challenge you might face. 
            While technology changes, the heart of this business remains the same: trust, relationships, and human insight."
          </p>
          <p className="text-slate-600 leading-relaxed mb-6">
            I’ve built this platform not to replace the human element, but to amplify it. 
            I am the brain behind the advice and strategies you receive here, and I’m supported by an incredible, 
            AI-driven intelligence team that works tirelessly in the background. 
            They handle the data, the logistics, and the scheduling, freeing me up to focus on what matters most: 
            providing you with the personalized, human-centered guidance you deserve when making some of life's most important decisions.
          </p>
          <p className="text-slate-600 leading-relaxed font-semibold mb-8">
            Ready to navigate the GTA market with confidence and a competitive edge? Contact us today for a personal consultation and discover how we can tailor our strategy to your goals.
          </p>

          <div className="flex flex-wrap gap-4">
            <a 
              href="tel:+14165677253" 
              className="flex items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-blue/90 transition"
            >
              <Phone size={20} />
              Call Now
            </a>
            <a 
              href="https://wa.me/14165677253" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition"
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
