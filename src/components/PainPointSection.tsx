import { ArrowRight, Search, Home, Hammer } from 'lucide-react';

export default function PainPointSection() {
  const options = [
    { title: "I want to Sell", subtitle: "Top dollar guaranteed", icon: <Home className="w-5 h-5" />, hoverClass: "hover:bg-brand-red hover:text-white" },
    { title: "I want to Buy", subtitle: "Dream GTA neighborhoods", icon: <Search className="w-5 h-5" />, hoverClass: "hover:bg-brand-blue hover:text-white" },
    { title: "Vetted Contractor", subtitle: "Paul's private network", icon: <Hammer className="w-5 h-5" />, hoverClass: "hover:bg-slate-800 hover:text-white" },
  ];

  return (
    <section className="bg-white border border-slate-200 p-8 my-16 rounded-2xl">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto w-full gap-8">
        <div className="md:w-1/3">
          <h4 className="text-lg font-bold text-brand-blue">How can we help you today?</h4>
          <p className="text-sm text-slate-500">Select a path to deploy our specialist team.</p>
        </div>
        <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-4">
            {options.map((option, i) => (
                <button key={i} className={`flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50 transition-all group ${option.hoverClass}`}>
                    <span className="text-xs font-bold uppercase mb-1">{option.title}</span>
                    <span className="text-[10px] opacity-70">{option.subtitle}</span>
                </button>
            ))}
        </div>
      </div>
    </section>
  );
}
