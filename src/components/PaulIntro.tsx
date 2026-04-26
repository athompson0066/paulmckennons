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
          <p className="text-slate-600 leading-relaxed">
            I’ve built this platform not to replace the human element, but to amplify it. 
            I am the brain behind the advice and strategies you receive here, and I’m supported by an incredible, 
            AI-driven intelligence team that works tirelessly in the background. 
            They handle the data, the logistics, and the scheduling, freeing me up to focus on what matters most: 
            providing you with the personalized, human-centered guidance you deserve when making some of life's most important decisions.
          </p>
        </div>
      </div>
    </section>
  );
}
