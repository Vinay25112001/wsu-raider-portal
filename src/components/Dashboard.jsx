import { useState } from 'react';
import { ExternalLink, TrendingUp, Award, Users, FlaskConical, GraduationCap, Building2, Star, ChevronRight } from 'lucide-react';
import { WSU_FACTS, COLLEGES, WSU_STATS } from '../data/index.js';
import { SectionHeader, StatCard, Badge } from './UI.jsx';

export default function Dashboard({ setActive }) {
  const [hoveredCollege, setHoveredCollege] = useState(null);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(43,82,52,0.3), rgba(13,25,16,0.8))',
        border: '1px solid var(--border-gold)',
        borderRadius: 'var(--radius-xl)',
        padding: '32px 36px',
        marginBottom: 28,
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative glow */}
        <div style={{ position: 'absolute', right: -60, top: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,160,32,0.08), transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 28 }}>✈️</span>
              <div>
                <Badge variant="gold">Founded 1967 · Fairborn, Ohio</Badge>
              </div>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em', color: '#e8f0eb', marginBottom: 8, lineHeight: 1.2 }}>
              Wright State<br />
              <span style={{ color: 'var(--wsu-gold)' }}>Raider Portal</span>
            </h1>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', maxWidth: 440, lineHeight: 1.7 }}>
              Named for aviation pioneers Orville & Wilbur Wright, WSU is your launchpad for discovery, innovation, and career success. Explore courses, connect with 125,000+ alumni, and navigate all campus resources — right here.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => setActive('planner')}>
                <GraduationCap size={14} /> Plan My Degree
              </button>
              <button className="btn btn-secondary" onClick={() => setActive('ai')}>
                <span>🤖</span> Ask AI Assistant
              </button>
              <a href={WSU_FACTS.website} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <ExternalLink size={13} /> wright.edu
              </a>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, flexShrink: 0 }}>
            {[
              { icon: '🏆', val: '#1 in Ohio', sub: 'Student Experience (WSJ 2026)' },
              { icon: '📊', val: '5.0 / 5.0', sub: 'Financial Composite Score' },
              { icon: '🎓', val: '125K+', sub: 'Alumni Worldwide' },
              { icon: '🔬', val: 'R2', sub: 'High Research Activity' },
            ].map(s => (
              <div key={s.sub} style={{
                background: 'rgba(8,15,10,0.6)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
                textAlign: 'center',
                minWidth: 110,
              }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 800, color: 'var(--wsu-gold)' }}>{s.val}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.3 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid stagger" style={{ marginBottom: 28 }}>
        {WSU_STATS.map(s => (
          <StatCard key={s.label} value={s.value} label={s.label} icon={s.icon} />
        ))}
      </div>

      {/* President's Note */}
      <div className="card" style={{ marginBottom: 28, borderColor: 'rgba(232,160,32,0.2)' }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, var(--wsu-green), var(--wsu-green-dark))', border: '2px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 18 }}>👩‍💼</span>
          </div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4, fontFamily: 'var(--font-display)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>From the President</div>
            <blockquote style={{ fontSize: 14, color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.7, marginBottom: 8 }}>
              "Go out there, be absolutely brilliant, and show the world what Wright State Raiders are absolutely made of."
            </blockquote>
            <div style={{ fontSize: 12, color: 'var(--wsu-gold)', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
              {WSU_FACTS.president} — President, Wright State University
            </div>
          </div>
        </div>
      </div>

      {/* Colleges Grid */}
      <div style={{ marginBottom: 8 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Building2 size={16} color="var(--wsu-gold)" /> Colleges & Schools
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: 14 }}>
          {COLLEGES.map((col, i) => (
            <div
              key={col.id}
              className="card stagger"
              onMouseEnter={() => setHoveredCollege(col.id)}
              onMouseLeave={() => setHoveredCollege(null)}
              style={{ cursor: 'pointer', animationDelay: `${i * 60}ms`, borderColor: hoveredCollege === col.id ? `${col.color}66` : 'var(--border-default)' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                <div style={{ width: 42, height: 42, borderRadius: 'var(--radius-md)', background: `${col.color}22`, border: `1px solid ${col.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  {col.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', lineHeight: 1.3 }}>{col.name}</h3>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{col.programs} programs · {col.building}</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
                {col.highlights.slice(0, 2).map(h => (
                  <span key={h} style={{ fontSize: 10.5, padding: '2px 8px', borderRadius: 'var(--radius-full)', background: `${col.color}18`, color: col.color === '#E8A020' ? '#c78010' : col.color, border: `1px solid ${col.color}30`, fontWeight: 700 }}>{h}</span>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {col.degrees.slice(0, 4).map(d => (
                  <span key={d} className="badge badge-green" style={{ fontSize: 10 }}>{d}</span>
                ))}
                {col.degrees.length > 4 && <span className="badge badge-green" style={{ fontSize: 10 }}>+{col.degrees.length - 4} more</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access */}
      <div style={{ marginTop: 28 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <TrendingUp size={16} color="var(--wsu-gold)" /> Quick Access
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
          {[
            { label: 'Plan My 4-Year Degree', icon: '📅', section: 'planner', desc: 'Visual semester planner' },
            { label: 'Find Campus Resources', icon: '🆘', section: 'resources', desc: 'Tutoring, health, food & more' },
            { label: 'Connect with Alumni', icon: '🤝', section: 'alumni', desc: '125K+ mentor network' },
            { label: 'Upcoming Events', icon: '🎉', section: 'events', desc: 'Career fairs, capstones & more' },
            { label: 'AI Study Assistant', icon: '🤖', section: 'ai', desc: 'Powered by Grok AI' },
            { label: 'WSU Heritage', icon: '✈️', section: 'heritage', desc: 'From Wright Brothers to Raiders' },
          ].map(item => (
            <button
              key={item.label}
              className="card"
              onClick={() => setActive(item.section)}
              style={{ cursor: 'pointer', textAlign: 'left', width: '100%' }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', marginBottom: 3 }}>{item.label}</div>
              <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{item.desc}</div>
              <ChevronRight size={14} color="var(--wsu-gold)" style={{ marginTop: 8 }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
