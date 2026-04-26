export const NEWS = [
  { title: "GTA Market Trends: Q2 Insights", date: "April 25, 2026", image: "https://picsum.photos/seed/news1/400/300" },
  { title: "Interest Rate Adjustments Impacting Buyers", date: "April 24, 2026", image: "https://picsum.photos/seed/news2/400/300" },
  { title: "Yorkville Luxury Condo Demand Surges", date: "April 23, 2026", image: "https://picsum.photos/seed/news3/400/300" },
  { title: "Pre-construction Condo Guide 2026", date: "April 22, 2026", image: "https://picsum.photos/seed/news4/400/300" },
  { title: "Sustainable Home Features that Add Value", date: "April 21, 2026", image: "https://picsum.photos/seed/news5/400/300" },
  { title: "Top 5 Neighborhoods for First-Time Homebuyers", date: "April 20, 2026", image: "https://picsum.photos/seed/news6/400/300" },
];

export default function NewsGrid() {
  return (
    <section className="my-16">
      <h3 className="font-heading text-sm font-bold mb-8 text-slate-400 uppercase tracking-[0.2em]">Real Estate News</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {NEWS.map((item, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:border-brand-blue transition-all group">
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">{item.date}</p>
              <h4 className="font-bold text-sm text-brand-blue group-hover:text-brand-red transition">{item.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
