// ═══════════════════════════════════════════════════
// useWSUNews — Dynamic live news from WSU Newsroom
// Uses rss2json.com as a CORS-free RSS proxy
// ═══════════════════════════════════════════════════

import { useState, useEffect, useCallback } from 'react';

const WSU_NEWSROOM_RSS = 'https://webapp2.wright.edu/web1/newsroom/feed/';
const RSS2JSON_API = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(WSU_NEWSROOM_RSS)}&api_key=&count=20`;

// Fallback news (shown while loading or if fetch fails)
const FALLBACK_NEWS = [
  {
    title: "Wright State ranked #1 Public University in Ohio for Student Experience",
    description: "Wall Street Journal/College Pulse 2026 America's Best Colleges rankings places WSU at the top of all Ohio public universities for student experience.",
    pubDate: "2025-10-22",
    link: "https://webapp2.wright.edu/web1/newsroom",
    categories: ["Rankings"],
    isLive: false,
  },
  {
    title: "WSU commits $6M to expand nursing education facilities",
    description: "Wright State University's CHEHS is investing $6 million to expand nursing education facilities, addressing the national nursing shortage.",
    pubDate: "2025-11-15",
    link: "https://webapp2.wright.edu/web1/newsroom",
    categories: ["Academics"],
    isLive: false,
  },
  {
    title: "Wright State selected for U.S. Space Command academic engagement",
    description: "WSU has been selected to participate in the U.S. Space Command Academic Engagement Enterprise, building research partnerships in space technology.",
    pubDate: "2025-12-01",
    link: "https://webapp2.wright.edu/web1/newsroom",
    categories: ["Research"],
    isLive: false,
  },
  {
    title: "Raj Soin College of Business partners with Intel for AI education",
    description: "RSCOB and Intel Corporation partner to integrate artificial intelligence education into the business curriculum, preparing students for AI-driven workforce.",
    pubDate: "2025-09-15",
    link: "https://webapp2.wright.edu/web1/newsroom",
    categories: ["Academics", "Technology"],
    isLive: false,
  },
  {
    title: "WSU Board of Trustees approves $277.1M FY2026 budget",
    description: "Budget includes investments in program expansions, student success initiatives, and a 3% raise for employees. Second consecutive year with a perfect SB-6 score of 5.0.",
    pubDate: "2025-05-02",
    link: "https://webapp2.wright.edu/web1/newsroom",
    categories: ["Administration"],
    isLive: false,
  },
  {
    title: "Six CECS students earn prestigious DoD SMART Scholarships",
    description: "Six Wright State engineering and computer science students receive the Department of Defense Science, Mathematics and Research for Transformation Scholarships.",
    pubDate: "2025-11-20",
    link: "https://webapp2.wright.edu/web1/newsroom",
    categories: ["Research", "Students"],
    isLive: false,
  },
  {
    title: "Scene75 founder funds new entrepreneurship hub at RSCOB",
    description: "A new entrepreneurship hub is coming to the Raj Soin College of Business, funded by the founder of Scene75 Entertainment Centers.",
    pubDate: "2025-10-05",
    link: "https://webapp2.wright.edu/web1/newsroom",
    categories: ["Business", "Campus"],
    isLive: false,
  },
  {
    title: "New fall break added to 2025–2026 academic calendar",
    description: "Beginning Fall 2025, WSU students enjoy a two-day fall break on Oct 9–10, a Mental Health Task Force recommendation approved by Faculty Senate.",
    pubDate: "2024-08-30",
    link: "https://webapp2.wright.edu/web1/newsroom",
    categories: ["Students", "Campus"],
    isLive: false,
  },
];

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 220);
}

export function useWSUNews() {
  const [news, setNews] = useState(FALLBACK_NEWS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isLive, setIsLive] = useState(false);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(RSS2JSON_API);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      
      if (data.status === 'ok' && data.items && data.items.length > 0) {
        const liveNews = data.items.map(item => ({
          title: item.title || 'WSU News Update',
          description: stripHtml(item.description || item.content),
          pubDate: formatDate(item.pubDate),
          link: item.link || 'https://webapp2.wright.edu/web1/newsroom',
          categories: item.categories || ['News'],
          thumbnail: item.thumbnail,
          isLive: true,
        }));
        setNews(liveNews);
        setIsLive(true);
        setLastUpdated(new Date().toLocaleTimeString());
      } else {
        setNews(FALLBACK_NEWS);
        setIsLive(false);
      }
    } catch (err) {
      console.warn('WSU news fetch failed, using curated fallback:', err.message);
      setError('Using curated news — live feed temporarily unavailable.');
      setNews(FALLBACK_NEWS);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
    // Refresh every 15 minutes
    const interval = setInterval(fetchNews, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchNews]);

  return { news, loading, error, lastUpdated, isLive, refresh: fetchNews };
}
