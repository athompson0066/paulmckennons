import { useState, useEffect } from 'react';

interface NewsItem {
  id: { videoId: string };
  snippet: {
    title: string;
    publishedAt: string;
    thumbnails: {
      high: { url: string };
      medium: { url: string };
      default: { url: string };
    };
  };
}

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export default function NewsGrid() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!API_KEY) {
      console.error('VITE_YOUTUBE_API_KEY not set');
      setError('API key not configured');
      setLoading(false);
      return;
    }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=GTA+real+estate+market+update&key=${API_KEY}&maxResults=6&type=video&order=date`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('YouTube News API Response:', data);
        if (data.items && Array.isArray(data.items)) {
          setNews(data.items);
        } else {
          setNews([]);
          setError('No videos found');
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('YouTube News API Fetch Error:', err);
        setError(err.message);
        setNews([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <section className="my-16"><p>Loading news...</p></section>;
  }

  if (error || news.length === 0) {
    return (
      <section className="my-16">
        <h3 className="font-heading text-sm font-bold mb-8 text-slate-400 uppercase tracking-[0.2em]">Real Estate News</h3>
        <p className="text-slate-500">{error || 'No news available at the moment.'}</p>
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
            <img 
              src={item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url} 
              alt={item.snippet.title} 
              className="w-full h-48 object-cover" 
            />
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
