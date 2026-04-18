import { GraduationCap, BookOpen, Briefcase, LifeBuoy, Users, Bot, Cpu, Calendar, Plane, Newspaper, BarChart3, X, ExternalLink } from 'lucide-react';

export const SECTIONS = [
  { id: 'dashboard', icon: BarChart3, label: 'Dashboard', badge: null },
  { id: 'news',      icon: Newspaper, label: 'Live WSU News', badge: 'LIVE' },
  { id: 'planner',   icon: BookOpen,  label: 'Course Planner', badge: null },
  { id: 'showcase',  icon: Briefcase, label: 'Project Showcase', badge: null },
  { id: 'resources', icon: LifeBuoy,  label: 'Resource Hub', badge: null },
  { id: 'alumni',    icon: Users,     label: 'Alumni Connect', badge: null },
  { id: 'ai',        icon: Bot,       label: 'AI Assistant', badge: 'GROK' },
  { id: 'sysml',     icon: Cpu,       label: 'SysML Module', badge: null },
  { id: 'events',    icon: Calendar,  label: 'Campus Events', badge: null },
  { id: 'heritage',  icon: Plane,     label: 'WSU Heritage', badge: null },
];

export default function Sidebar({ active, setActive, mobileOpen, setMobileOpen }) {
  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 199 }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`portal-sidebar ${mobileOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <GraduationCap size={22} color="#E8A020" />
          </div>
          <div className="sidebar-logo-text">
            <div className="sidebar-logo-title">WSU Portal</div>
            <div className="sidebar-logo-sub">Wright State University</div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 4 }}
            className="mobile-close"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Student Tools</div>

          {SECTIONS.map(({ id, icon: Icon, label, badge }) => (
            <button
              key={id}
              className={`nav-item ${active === id ? 'active' : ''}`}
              onClick={() => { setActive(id); setMobileOpen(false); }}
              style={{ width: '100%', textAlign: 'left', cursor: 'pointer', background: 'none', border: '1px solid transparent' }}
              aria-current={active === id ? 'page' : undefined}
            >
              <span className="nav-item-icon">
                <Icon size={15} />
              </span>
              <span style={{ flex: 1, fontSize: 13.5 }}>{label}</span>
              {badge && (
                <span
                  className="nav-item-badge"
                  style={badge === 'LIVE' ? {
                    background: 'rgba(92,184,122,0.15)',
                    color: 'var(--text-green)',
                    border: '1px solid rgba(92,184,122,0.3)',
                    animation: 'pulse 1.5s ease infinite',
                  } : {}}
                >
                  {badge}
                </span>
              )}
            </button>
          ))}

          <div className="sidebar-section-label" style={{ marginTop: 12 }}>External Links</div>
          {[
            { label: 'WINGS Portal', href: 'https://wings.wright.edu' },
            { label: 'WSU Newsroom', href: 'https://webapp2.wright.edu/web1/newsroom' },
            { label: 'Course Catalog', href: 'https://www.wright.edu/degrees-and-programs' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-item"
              style={{ fontSize: 12.5 }}
            >
              <span className="nav-item-icon">
                <ExternalLink size={13} />
              </span>
              {label}
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div style={{ color: 'var(--text-muted)', marginBottom: 4 }}>🟢 Raiders Go Green!</div>
          <div style={{ color: '#2a4030', fontSize: 10 }}>3640 Colonel Glenn Hwy · Fairborn, OH</div>
        </div>
      </aside>
    </>
  );
}
