import { useState, useEffect } from 'react';
import './styles/globals.css';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import LiveNews from './components/LiveNews.jsx';
import AIAssistant from './components/AIAssistant.jsx';
import {
  CoursePlanner,
  ProjectShowcase,
  ResourceHub,
  AlumniConnect,
  SysMLModule,
  EventsHub,
  Heritage,
} from './components/Sections.jsx';

const SECTION_MAP = {
  dashboard: Dashboard,
  news:      LiveNews,
  planner:   CoursePlanner,
  showcase:  ProjectShowcase,
  resources: ResourceHub,
  alumni:    AlumniConnect,
  ai:        AIAssistant,
  sysml:     SysMLModule,
  events:    EventsHub,
  heritage:  Heritage,
};

export default function App() {
  const [active, setActive] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll to top on section change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [active]);

  const ActiveSection = SECTION_MAP[active] || Dashboard;

  return (
    <div className="portal-layout bg-grid">
      <Sidebar
        active={active}
        setActive={setActive}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <main className="portal-main">
        {/* Mobile top bar */}
        <div style={{
          display: 'none',
          position: 'sticky', top: 0, zIndex: 100,
          background: 'rgba(8,15,10,0.95)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '12px 20px',
          alignItems: 'center',
          gap: 12,
        }} className="mobile-topbar">
          <button
            onClick={() => setMobileOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-primary)', padding: 4 }}
            aria-label="Open menu"
          >
            ☰
          </button>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, color: 'var(--text-primary)' }}>
            WSU Raider Portal
          </span>
        </div>

        {/* Main content */}
        <div style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '32px 28px',
          minHeight: '100vh',
        }}>
          <ActiveSection key={active} setActive={setActive} />
        </div>

        {/* Footer */}
        <footer style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '20px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          background: 'rgba(8,15,10,0.5)',
          maxWidth: 1180,
          margin: '0 auto',
        }}>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            <strong style={{ color: 'var(--wsu-gold)', fontFamily: 'var(--font-display)' }}>WSU Raider Portal</strong>
            {' '}· Wright State University · 3640 Colonel Glenn Hwy, Fairborn, OH 45435
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {[
              ['wright.edu', 'https://www.wright.edu'],
              ['Newsroom', 'https://webapp2.wright.edu/web1/newsroom'],
              ['WINGS', 'https://wings.wright.edu'],
              ['CaTS Help', 'https://www.wright.edu/information-technology'],
            ].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11.5, color: 'var(--text-muted)', transition: 'color 0.15s' }}
                onMouseEnter={e => e.target.style.color = 'var(--wsu-gold)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >{label}</a>
            ))}
          </div>
        </footer>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .mobile-topbar { display: flex !important; }
          .mobile-close { display: block !important; }
        }
      `}</style>
    </div>
  );
}
