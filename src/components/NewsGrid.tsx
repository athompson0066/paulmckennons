import { useState, useEffect } from 'react';

interface NewsItem {
  id: { videoId: string };
  snippet: {
    title: string;
    publishedAt: string;
    thumbnails: {
      high: { url: string };
    };
  };
}

export default function NewsGrid() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/youtube-news')
      .then((res) => res.json())
      .then((data) => {
        console.log('YouTube News API Response:', data);
        if (Array.isArray(data)) {
          setNews(data);
        } else {
          setNews([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('YouTube News API Fetch Error:', err);
        setNews([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <section className="my-16"><p>Loading news...</p></section>;
  }

  if (news.length === 0) {
    return (
      <section className="my-16">
        <h3 className="font-heading text-sm font-bold mb-8 text-slate-400 uppercase tracking-[0.2em]">Real Estate News</h3>
        <p className="text-slate-500">No news available at the moment. Please check the API configuration.</p>
      </section>
    );
  }

  return (
    <section className="my-16">
      <h3 className="font-heading text-sm font-bold mb-8 text-slate-400 uppercase tracking-[0.2em]">Real Estate News</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {news.map((item) => (
          <a 
            key={item.id.videoId} 
            href={`https://www.youtube.com/watch?v=${item.id.videoId}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:border-brand-blue transition-all group"
          >
            <img src={item.snippet.thumbnails.high.url} alt={item.snippet.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">
                {new Date(item.snippet.publishedAt).toLocaleDateString()}
              </p>
              <h4 className="font-bold text-sm text-brand-blue group-hover:text-brand-red transition">{item.snippet.title}</h4>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
