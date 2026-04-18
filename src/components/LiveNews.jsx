import { RefreshCw, ExternalLink, Clock, Tag } from 'lucide-react';
import { useWSUNews } from '../hooks/useWSUNews.js';
import { SectionHeader, Spinner, LiveBadge } from './UI.jsx';
import { Newspaper } from 'lucide-react';

const CATEGORY_COLORS = {
  Rankings: '#E8A020', Academics: '#2B5234', Research: '#e53935',
  Students: '#5c6bc0', Business: '#E8A020', Campus: '#00897b',
  Technology: '#2B5234', Administration: '#8d6e63', News: '#2B5234',
};

export default function LiveNews() {
  const { news, loading, error, lastUpdated, isLive, refresh } = useWSUNews();

  return (
    <div className="animate-fade-in">
      <SectionHeader
        icon={Newspaper}
        title="Live WSU News"
        subtitle="Real-time updates from the Wright State University Newsroom — auto-refreshes every 15 minutes"
        action={
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {isLive && <LiveBadge updatedAt={lastUpdated} />}
            <button
              className="btn btn-ghost btn-sm"
              onClick={refresh}
              disabled={loading}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        }
      />

      {/* Source Banner */}
      <div style={{
        background: isLive ? 'rgba(43,82,52,0.15)' : 'rgba(232,160,32,0.07)',
        border: `1px solid ${isLive ? 'rgba(92,184,122,0.3)' : 'rgba(232,160,32,0.2)'}`,
        borderRadius: 'var(--radius-md)',
        padding: '10px 16px',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontSize: 13,
        color: isLive ? 'var(--text-green)' : '#b89050',
      }}>
        {isLive ? (
          <>
            <span className="live-dot" style={{ flexShrink: 0 }} />
            Live feed from <strong style={{ marginLeft: 4 }}>webapp2.wright.edu/web1/newsroom</strong>
            <a href="https://webapp2.wright.edu/web1/newsroom" target="_blank" rel="noopener noreferrer" style={{ marginLeft: 'auto', color: 'inherit' }}>
              <ExternalLink size={13} />
            </a>
          </>
        ) : (
          <>
            <span>📰</span>
            <span>Showing curated WSU news. {error || 'Live feed will auto-retry.'}</span>
          </>
        )}
      </div>

      {loading && news.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
          <Spinner size={32} />
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px,1fr))', gap: 14 }} className="stagger">
          {news.map((item, i) => {
            const catColor = CATEGORY_COLORS[item.categories?.[0]] || '#2B5234';
            return (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="news-card"
                style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 10, padding: 18, background: 'var(--bg-card)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', transition: 'all 0.2s', cursor: 'pointer', animationDelay: `${i * 50}ms` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = catColor + '66'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-default)'; e.currentTarget.style.transform = ''; }}
              >
                {/* Category stripe */}
                <div style={{ height: 3, borderRadius: 2, background: catColor, flexShrink: 0 }} />

                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', lineHeight: 1.4, flex: 1 }}>
                      {item.title}
                    </h3>
                  </div>

                  {item.description && (
                    <p style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 10 }}>
                      {item.description}...
                    </p>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    {item.categories?.slice(0, 2).map(cat => (
                      <span key={cat} style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--radius-full)', background: `${catColor}20`, color: catColor, border: `1px solid ${catColor}40`, fontFamily: 'var(--font-display)' }}>
                        <Tag size={9} style={{ display: 'inline', marginRight: 3 }} />{cat}
                      </span>
                    ))}
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
                      <Clock size={10} /> {item.pubDate}
                    </span>
                    {item.isLive && (
                      <span style={{ fontSize: 10, color: 'var(--text-green)', fontWeight: 700 }}>● LIVE</span>
                    )}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}

      {/* Footer link */}
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <a
          href="https://webapp2.wright.edu/web1/newsroom"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary"
        >
          <ExternalLink size={13} /> View All WSU News
        </a>
      </div>
    </div>
  );
}
