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
  const [error, setError] = useState<string | null>(null);

  // YouTube Data API v3 — requires API key
  // For demo, we'll use a placeholder. Replace with your real API key:
  const YOUTUBE_API_KEY = import.meta.env?.VITE_YOUTUBE_API_KEY || '';
  const SEARCH_QUERY = 'GTA real estate market update';

  useEffect(() => {
    if (!YOUTUBE_API_KEY) {
      setError('YouTube API key not configured');
      setLoading(false);
      return;
    }

    fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&q=${encodeURIComponent(SEARCH_QUERY)}&part=snippet&type=video&maxResults=6&order=date`)
      .then((res) => {
        if (!res.ok) throw new Error(`YouTube API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        console.log('YouTube News API Response:', data);
        const items = data?.items || [];
        setNews(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('YouTube News API Fetch Error:', err);
        setError(err.message || 'Failed to load news');
        setNews([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="my-16">
        <h3 className="font-heading text-sm font-bold mb-8 text-slate-400 uppercase tracking-[0.2em]">Real Estate News</h3>
        <div className="flex items-center justify-center py-8">
          <p className="text-slate-500">Loading news...</p>
        </div>
      </section>
    );
  }

  if (error || news.length === 0) {
    return (
      <section className="my-16">
        <h3 className="font-heading text-sm font-bold mb-8 text-slate-400 uppercase tracking-[0.2em]">Real Estate News</h3>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
          <p className="text-slate-500 text-sm mb-2">{error || 'No news available'}</p>
          <p className="text-slate-400 text-xs">YouTube Data API v3 key required</p>
          <a 
            href="https://console.cloud.google.com/apis/credentials" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-brand-blue text-xs font-bold hover:underline mt-2 inline-block"
          >
            Get API Key →
          </a>
        </div>
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
