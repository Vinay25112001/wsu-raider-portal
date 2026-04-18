// ═══════════════════════════════════════════════════
// Shared UI Components for WSU Raider Portal
// ═══════════════════════════════════════════════════

export function SectionHeader({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="section-header">
      <div className="section-header-top">
        <div className="section-icon-wrap">
          <Icon size={20} color="#E8A020" />
        </div>
        <h1 className="section-title">{title}</h1>
        {action && <div style={{ marginLeft: 'auto' }}>{action}</div>}
      </div>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

export function StatCard({ value, label, icon, color }) {
  return (
    <div className="stat-card">
      {icon && <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>}
      <div className="stat-value" style={color ? { color } : {}}>{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export function Avatar({ initials, size = 40 }) {
  const palette = ['#2B5234', '#1a6b3d', '#0d4a2a', '#1d5e30', '#2d7040'];
  const idx = (initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)) % palette.length;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `linear-gradient(135deg, ${palette[idx]}, ${palette[(idx + 1) % palette.length]})`,
      border: '2px solid var(--border-gold)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.34, fontWeight: 800, color: '#E8A020',
      fontFamily: 'var(--font-display)', flexShrink: 0,
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    }}>
      {initials}
    </div>
  );
}

export function Badge({ children, variant = 'green' }) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}

export function Spinner({ size = 20 }) {
  return (
    <div style={{
      width: size, height: size, border: `2px solid rgba(43,82,52,0.3)`,
      borderTopColor: '#E8A020', borderRadius: '50%', animation: 'spin 0.8s linear infinite',
    }} />
  );
}

export function EmptyState({ icon, title, desc }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px' }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>{icon}</div>
      <h3 style={{ fontSize: 18, color: 'var(--text-primary)', marginBottom: 6 }}>{title}</h3>
      <p style={{ fontSize: 14, color: 'var(--text-muted)' }}>{desc}</p>
    </div>
  );
}

export function ProgressBar({ value, max = 100, color, label }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      {label && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{label}</span>
          <span style={{ fontSize: 12, color: 'var(--wsu-gold)', fontWeight: 700 }}>{pct}%</span>
        </div>
      )}
      <div className="progress">
        <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export function Tabs({ tabs, active, onChange }) {
  return (
    <div className="tabs" style={{ marginBottom: 20 }}>
      {tabs.map(t => (
        <button
          key={t}
          className={`tab ${active === t ? 'active' : ''}`}
          onClick={() => onChange(t)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export function InfoTip({ children }) {
  return (
    <div style={{
      background: 'rgba(232,160,32,0.07)',
      border: '1px solid rgba(232,160,32,0.2)',
      borderRadius: 'var(--radius-md)',
      padding: '10px 14px',
      fontSize: 13,
      color: '#b89050',
      display: 'flex', gap: 8,
    }}>
      <span style={{ flexShrink: 0 }}>💡</span>
      <span>{children}</span>
    </div>
  );
}

export function LiveBadge({ updatedAt }) {
  return (
    <div className="live-indicator">
      <span className="live-dot" />
      LIVE{updatedAt ? ` · ${updatedAt}` : ''}
    </div>
  );
}

export function CodeBlock({ title, children }) {
  return (
    <div className="code-block">
      {title && <div className="code-block-header">// {title}</div>}
      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{children}</pre>
    </div>
  );
}
