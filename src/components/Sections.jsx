// ═══════════════════════════════════════════════════
// All remaining section components for WSU Portal
// ═══════════════════════════════════════════════════

import { useState } from 'react';
import {
  BookOpen, Plus, Trash2, Info, Star, ExternalLink, GitFork,
  LifeBuoy, Search, Phone, Clock, MapPin, Users, Check,
  Calendar, MapPin as MapPinIcon, ChevronRight, ChevronDown, ChevronUp,
  Cpu, ArrowRight, ArrowLeft, Plane, Award
} from 'lucide-react';
import {
  COURSES_BY_CATEGORY, SEMESTERS, DEFAULT_PLAN,
  PROJECTS, RESOURCES, MENTORS, EVENTS, HERITAGE, SYSML_STEPS
} from '../data/index.js';
import { SectionHeader, Avatar, Badge, ProgressBar, Tabs, InfoTip, CodeBlock, EmptyState } from './UI.jsx';

// ─── COURSE PLANNER ─────────────────────────────────
export function CoursePlanner() {
  const allCourses = Object.values(COURSES_BY_CATEGORY).flat();
  const [plan, setPlan] = useState(() => {
    const saved = localStorage.getItem('wsu_course_plan');
    if (saved) try { return JSON.parse(saved); } catch {}
    return { ...DEFAULT_PLAN };
  });
  const [showPickerFor, setShowPickerFor] = useState(null);
  const [filterCat, setFilterCat] = useState('All');

  const savePlan = (newPlan) => {
    setPlan(newPlan);
    localStorage.setItem('wsu_course_plan', JSON.stringify(newPlan));
  };

  const usedCodes = new Set(Object.values(plan).flat());
  const totalCourses = usedCodes.size;
  const totalCredits = allCourses.filter(c => usedCodes.has(c.code)).reduce((s, c) => s + c.credits, 0);

  const addCourse = (sem, code) => {
    if (usedCodes.has(code)) return;
    const newPlan = { ...plan, [sem]: [...(plan[sem] || []), code] };
    savePlan(newPlan);
    setShowPickerFor(null);
  };

  const removeCourse = (sem, code) => {
    savePlan({ ...plan, [sem]: plan[sem].filter(c => c !== code) });
  };

  const getCourse = (code) => allCourses.find(c => c.code === code);
  const availCourses = allCourses.filter(c => !usedCodes.has(c.code));
  const filteredAvail = filterCat === 'All' ? availCourses : availCourses.filter(c => Object.entries(COURSES_BY_CATEGORY).find(([k]) => k === filterCat)?.[1]?.some(x => x.code === c.code));

  const catColors = { 'CS Foundation': '#2B5234', Mathematics: '#E8A020', 'CS Advanced': '#1a6b3d', 'Electrical Engineering': '#5c6bc0', 'General Education': '#00897b' };
  const getCourseColor = (code) => {
    for (const [cat, courses] of Object.entries(COURSES_BY_CATEGORY)) {
      if (courses.some(c => c.code === code)) return catColors[cat] || '#2B5234';
    }
    return '#2B5234';
  };

  return (
    <div className="animate-fade-in">
      <SectionHeader icon={BookOpen} title="Course Planner" subtitle="Build your personalized 4-year (or 5-year 4+1) degree path. Click courses to manage, auto-saved to browser." />

      {/* Stats */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 20 }}>
        {[
          { val: totalCourses, label: 'Courses Planned', icon: '📚' },
          { val: totalCredits, label: 'Total Credits', icon: '⚡' },
          { val: Math.max(0, 40 - totalCourses), label: 'Courses Left', icon: '📋' },
          { val: `${Math.round((totalCourses / 40) * 100)}%`, label: 'Completion', icon: '🎯' },
        ].map(s => (
          <div key={s.label} className="stat-card" style={{ padding: '14px 12px' }}>
            <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{s.val}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 20 }}>
        <ProgressBar value={totalCourses} max={40} label="Degree Progress (approx. 120 credits for BS)" />
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {Object.entries(catColors).map(([cat, color]) => (
          <span key={cat} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 'var(--radius-full)', background: `${color}20`, color, border: `1px solid ${color}40`, fontWeight: 700 }}>
            {cat}
          </span>
        ))}
      </div>

      {/* Semester Grid */}
      <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${SEMESTERS.length}, minmax(155px, 1fr))`, gap: 10, minWidth: 960 }}>
          {SEMESTERS.map(sem => {
            const semCourses = plan[sem] || [];
            return (
              <div key={sem}>
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--wsu-gold)', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{sem}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                    {semCourses.reduce((s, c) => s + (getCourse(c)?.credits || 3), 0)} credits
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {semCourses.map(code => {
                    const c = getCourse(code);
                    const col = getCourseColor(code);
                    return (
                      <div
                        key={code}
                        onClick={() => removeCourse(sem, code)}
                        style={{
                          background: `${col}15`, border: `1px solid ${col}40`,
                          borderRadius: 'var(--radius-md)', padding: '8px 10px',
                          cursor: 'pointer', transition: 'all 0.15s', minHeight: 58,
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = `${col}25`; e.currentTarget.style.borderColor = col; }}
                        onMouseLeave={e => { e.currentTarget.style.background = `${col}15`; e.currentTarget.style.borderColor = `${col}40`; }}
                        title={`${code}: ${c?.name} (${c?.credits} cr) — Click to remove`}
                      >
                        <div style={{ fontSize: 10.5, fontWeight: 800, color: col, fontFamily: 'var(--font-display)' }}>{code.split(' ')[0]} {code.split(' ')[1]}</div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2, lineHeight: 1.3 }}>{c?.name?.slice(0, 22)}</div>
                        <div style={{ fontSize: 9, color: `${col}99`, marginTop: 4 }}>{c?.credits} cr · ×</div>
                      </div>
                    );
                  })}

                  {/* Add button */}
                  <div
                    onClick={() => setShowPickerFor(showPickerFor === sem ? null : sem)}
                    style={{
                      border: '1px dashed var(--border-default)', borderRadius: 'var(--radius-md)',
                      padding: '8px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s',
                      background: showPickerFor === sem ? 'rgba(43,82,52,0.15)' : 'transparent',
                      minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--wsu-gold)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-default)'; }}
                  >
                    {showPickerFor === sem ? <ChevronUp size={12} color="var(--wsu-gold)" /> : <Plus size={12} color="var(--text-muted)" />}
                    <span style={{ fontSize: 10, color: showPickerFor === sem ? 'var(--wsu-gold)' : 'var(--text-muted)' }}>Add</span>
                  </div>

                  {/* Picker Dropdown */}
                  {showPickerFor === sem && (
                    <div style={{
                      background: 'var(--bg-elevated)', border: '1px solid var(--border-gold)',
                      borderRadius: 'var(--radius-md)', padding: 8, maxHeight: 200, overflowY: 'auto',
                      boxShadow: 'var(--shadow-lg)',
                    }}>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 6 }}>
                        {['All', ...Object.keys(COURSES_BY_CATEGORY)].map(cat => (
                          <span
                            key={cat}
                            onClick={e => { e.stopPropagation(); setFilterCat(cat); }}
                            style={{ fontSize: 9, padding: '2px 6px', borderRadius: 'var(--radius-full)', cursor: 'pointer', background: filterCat === cat ? 'var(--wsu-green)' : 'rgba(43,82,52,0.2)', color: filterCat === cat ? 'var(--wsu-gold)' : 'var(--text-muted)', fontWeight: 700, border: `1px solid ${filterCat === cat ? 'var(--border-gold)' : 'transparent'}` }}
                          >{cat === 'General Education' ? 'Gen Ed' : cat.split(' ')[0]}</span>
                        ))}
                      </div>
                      {filteredAvail.length === 0 ? (
                        <div style={{ fontSize: 11, color: 'var(--text-muted)', padding: '8px 4px' }}>All courses added!</div>
                      ) : filteredAvail.map(c => (
                        <div
                          key={c.code}
                          onClick={e => { e.stopPropagation(); addCourse(sem, c.code); }}
                          style={{ fontSize: 11, padding: '5px 8px', cursor: 'pointer', borderRadius: 4, color: 'var(--text-secondary)', lineHeight: 1.3, transition: 'all 0.1s' }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(43,82,52,0.3)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                        >
                          <strong>{c.code}</strong> · {c.name} <span style={{ color: 'var(--text-muted)' }}>({c.credits}cr)</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <InfoTip>Click a course block to remove it. Click "Add" to browse available courses by category. Your plan is auto-saved to your browser.</InfoTip>
    </div>
  );
}

// ─── PROJECT SHOWCASE ────────────────────────────────
export function ProjectShowcase() {
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const allTags = ['All', ...new Set(PROJECTS.flatMap(p => p.tags))].slice(0, 10);
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.tags.includes(filter));

  return (
    <div className="animate-fade-in">
      <SectionHeader icon={() => <span style={{fontSize:20}}>💼</span>} title="CECS Project Showcase" subtitle="Capstone and research projects from Wright State engineering & CS students — build your portfolio here" />

      <div style={{ marginBottom: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {allTags.map(t => (
          <button key={t} onClick={() => setFilter(t)} className={`tab ${filter === t ? 'active' : ''}`}>{t}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px,1fr))', gap: 16 }} className="stagger">
        {filtered.map((p, i) => (
          <div key={p.id} className="card" style={{ animationDelay: `${i * 60}ms`, border: p.featured ? '1px solid rgba(232,160,32,0.4)' : undefined }}>
            {p.featured && <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--wsu-gold)', background: 'rgba(232,160,32,0.1)', padding: '3px 10px', borderRadius: 'var(--radius-full)', display: 'inline-flex', alignItems: 'center', gap: 5, marginBottom: 10, border: '1px solid rgba(232,160,32,0.3)' }}><Star size={9} fill="#E8A020" /> Featured Project</div>}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: 14.5, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', lineHeight: 1.3, marginBottom: 4 }}>{p.title}</h3>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.student} · {p.major} · {p.year}</div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginLeft: 12, flexShrink: 0 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 12, color: 'var(--wsu-gold)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 3 }}><Star size={11} fill="var(--wsu-gold)" />{p.stars}</div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>stars</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 12, color: 'var(--text-green)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 3 }}><GitFork size={10} />{p.forks}</div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>forks</div>
                </div>
              </div>
            </div>

            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65, marginBottom: 12 }}>
              {expanded === p.id ? p.description : p.description.slice(0, 110) + '...'}
            </p>

            {p.advisorNote && expanded === p.id && (
              <div style={{ background: 'rgba(232,160,32,0.07)', border: '1px solid rgba(232,160,32,0.2)', borderRadius: 'var(--radius-sm)', padding: '8px 12px', fontSize: 12, color: '#b89050', marginBottom: 12, fontStyle: 'italic' }}>
                💬 Advisor: "{p.advisorNote}"
              </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
              {p.tags.map(t => <span key={t} className="badge badge-green">{t}</span>)}
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a href={p.github} className="btn btn-primary btn-sm"><ExternalLink size={11} /> GitHub</a>
              <a href={p.demo} className="btn btn-secondary btn-sm">Live Demo</a>
              <button className="btn btn-ghost btn-sm" onClick={() => setExpanded(expanded === p.id ? null : p.id)}>
                {expanded === p.id ? 'Less ↑' : 'More ↓'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, textAlign: 'center', padding: '24px', border: '1px dashed var(--border-default)', borderRadius: 'var(--radius-xl)' }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>🚀</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--text-primary)', marginBottom: 6 }}>Submit Your Project</h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 14 }}>Are you a WSU student with a capstone, research, or personal project? Get it featured here.</p>
        <button className="btn btn-primary"><Plus size={14} /> Submit Project</button>
      </div>
    </div>
  );
}

// ─── RESOURCE HUB ───────────────────────────────────
export function ResourceHub() {
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('All');
  const allCats = ['All', ...RESOURCES.map(r => r.category)];

  const filtered = RESOURCES.filter(group =>
    activeCat === 'All' || group.category === activeCat
  ).map(group => ({
    ...group,
    items: group.items.filter(item =>
      !search || item.name.toLowerCase().includes(search.toLowerCase()) || item.desc.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(g => g.items.length > 0);

  return (
    <div className="animate-fade-in">
      <SectionHeader icon={LifeBuoy} title="Raider Resource Hub" subtitle="Every WSU support service in one place — tutoring, mental health, food, tech, housing, and more" />

      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 200px' }}>
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
          <input className="input" placeholder="Search resources..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36 }} />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
        {allCats.map(cat => (
          <button key={cat} onClick={() => setActiveCat(cat)} className={`tab ${activeCat === cat ? 'active' : ''}`} style={{ fontSize: 11.5 }}>{cat}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="🔍" title="No resources found" desc="Try a different search term or category." />
      ) : filtered.map(group => (
        <div key={group.category} style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 22 }}>{group.emoji}</span>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>{group.category}</h2>
            <div style={{ flex: 1, height: 1, background: 'var(--border-subtle)', marginLeft: 8 }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))', gap: 12 }} className="stagger">
            {group.items.map((item, i) => (
              <div key={item.name} className="card" style={{ padding: 16, animationDelay: `${i * 50}ms` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <h3 style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', flex: 1, lineHeight: 1.3 }}>{item.name}</h3>
                </div>
                <p style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 10 }}>{item.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12 }}>
                  <div style={{ fontSize: 11.5, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Clock size={11} color="var(--wsu-gold)" />{item.hours}
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <MapPin size={11} color="var(--wsu-gold)" />{item.location}
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Phone size={11} color="var(--wsu-gold)" />{item.phone}
                  </div>
                </div>
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm btn-full" style={{ justifyContent: 'center' }}>
                  <ArrowRight size={11} /> Visit Resource
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── ALUMNI CONNECT ──────────────────────────────────
export function AlumniConnect() {
  const [filter, setFilter] = useState('All');
  const [requested, setRequested] = useState(new Set());
  const areas = ['All', 'Technology', 'Engineering', 'Business', 'Medicine'];

  const areaOf = (m) => {
    if (['CS', 'Statistics / CS', 'Computer Science'].some(x => m.major.includes(x.split('/')[0]))) return 'Technology';
    if (['Mechanical', 'Electrical', 'ECE'].some(x => m.major.includes(x))) return 'Engineering';
    if (m.major.includes('Business') || m.major.includes('MBA')) return 'Business';
    if (m.major.includes('Medicine') || m.major.includes('Pre-Med') || m.major.includes('Biology')) return 'Medicine';
    return 'Technology';
  };

  const filtered = filter === 'All' ? MENTORS : MENTORS.filter(m => areaOf(m) === filter);

  const toggle = (name) => setRequested(r => {
    const n = new Set(r);
    n.has(name) ? n.delete(name) : n.add(name);
    return n;
  });

  return (
    <div className="animate-fade-in">
      <SectionHeader icon={Users} title="Alumni Mentor Connect" subtitle="Connect with 125,000+ Wright State Raiders for mentorship, career guidance, and networking" />

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginBottom: 24 }}>
        {[{ icon: '🌐', val: '125K+', lab: 'Alumni Network' }, { icon: '🤝', val: '340+', lab: 'Active Mentors' }, { icon: '⭐', val: '4.8', lab: 'Avg Rating' }, { icon: '🌍', val: '80+', lab: 'Countries' }].map(s => (
          <div key={s.lab} className="stat-card" style={{ padding: '14px 12px' }}>
            <div style={{ fontSize: 22 }}>{s.icon}</div>
            <div className="stat-value" style={{ fontSize: 22 }}>{s.val}</div>
            <div className="stat-label">{s.lab}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {areas.map(a => (
          <button key={a} className={`tab ${filter === a ? 'active' : ''}`} onClick={() => setFilter(a)}>{a}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))', gap: 14 }} className="stagger">
        {filtered.map((m, i) => (
          <div key={m.id} className="card" style={{ animationDelay: `${i * 70}ms` }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <Avatar initials={m.initials} size={48} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{m.name}</div>
                <div style={{ fontSize: 12, color: 'var(--wsu-gold)', marginTop: 1 }}>{m.role}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{m.company}</div>
              </div>
            </div>

            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10, lineHeight: 1.55 }}>{m.bio}</div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
              {m.skills.map(s => <span key={s} className="badge badge-blue">{s}</span>)}
            </div>

            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4, display: 'flex', gap: 12 }}>
              <span><Award size={10} style={{ display:'inline', marginRight:3 }} />WSU '{m.grad} · {m.major}</span>
              <span><MapPin size={10} style={{ display:'inline', marginRight:3 }} />{m.location}</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12 }}>
              <Clock size={10} style={{ display:'inline', marginRight:3 }} />Available: {m.avail}
            </div>

            <button
              className={`btn btn-sm btn-full ${requested.has(m.name) ? 'btn-secondary' : 'btn-primary'}`}
              style={{ justifyContent: 'center' }}
              onClick={() => toggle(m.name)}
            >
              {requested.has(m.name) ? <><Check size={12} /> Requested!</> : <><Users size={12} /> Request Mentorship</>}
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, padding: 24, background: 'rgba(43,82,52,0.1)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--text-primary)', marginBottom: 6 }}>Are you a WSU Alum?</h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 14 }}>Join 340+ mentors giving back to Raider Country. Help current students navigate their path.</p>
        <button className="btn btn-gold">Become a Mentor →</button>
      </div>
    </div>
  );
}

// ─── SYSML MODULE ────────────────────────────────────
export function SysMLModule() {
  const [active, setActive] = useState(0);
  const step = SYSML_STEPS[active];

  return (
    <div className="animate-fade-in">
      <SectionHeader icon={Cpu} title="SysML Learning Module" subtitle="Master SysML modeling in CATIA Magic / Cameo Systems Modeler — from Package Diagrams to Sequence Diagrams" />

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20 }}>
        {/* Step List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {SYSML_STEPS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              style={{
                padding: '12px 14px', borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'left',
                border: `1px solid ${active === i ? 'var(--wsu-gold)' : 'var(--border-default)'}`,
                background: active === i ? 'rgba(232,160,32,0.06)' : 'var(--bg-card)', width: '100%',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: active === i ? 'var(--wsu-gold)' : 'var(--text-secondary)', fontFamily: 'var(--font-display)', lineHeight: 1.3 }}>{s.title}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{s.category}</div>
              {i < active && <div style={{ fontSize: 10, color: 'var(--text-green)', marginTop: 4 }}>✓ Completed</div>}
            </button>
          ))}
        </div>

        {/* Step Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }} className="animate-fade-in" key={active}>
          <div className="card card-elevated" style={{ borderColor: 'rgba(232,160,32,0.2)' }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 36 }}>{step.icon}</span>
              <div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-primary)' }}>{step.title}</h2>
                  <Badge variant="gold">{step.badge}</Badge>
                  <Badge variant="blue">Step {step.id}/{SYSML_STEPS.length}</Badge>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{step.category} Diagram</div>
              </div>
            </div>

            <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: 14 }}>{step.overview}</p>

            <div style={{ background: 'rgba(43,82,52,0.12)', border: '1px solid var(--border-default)', borderRadius: 'var(--radius-md)', padding: '12px 16px', marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-green)', marginBottom: 6, fontFamily: 'var(--font-display)' }}>💡 WHY IT MATTERS FOR YOUR EVTOL PROJECT</div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65 }}>{step.whyItMatters}</p>
            </div>
          </div>

          {/* CATIA Magic Steps */}
          <div className="card">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 800, color: 'var(--wsu-gold)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              🛠 CATIA Magic Step-by-Step
            </h3>
            {step.catiaSteps.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, var(--wsu-green), var(--wsu-green-dark))', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: 'var(--wsu-gold)', flexShrink: 0 }}>{i + 1}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s}</div>
              </div>
            ))}
            <InfoTip>{step.tip}</InfoTip>
          </div>

          {/* Code Example */}
          <CodeBlock title={`SysML Syntax — ${step.title}`}>{step.code}</CodeBlock>

          {/* Common Errors */}
          <div className="card" style={{ borderColor: 'rgba(239,68,68,0.2)' }}>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: '#f87171', marginBottom: 10, fontFamily: 'var(--font-display)' }}>⚠️ Common Mistakes to Avoid</h3>
            {step.commonErrors.map((e, i) => (
              <div key={i} style={{ fontSize: 13, color: 'var(--text-muted)', padding: '4px 0', display: 'flex', gap: 8, borderBottom: i < step.commonErrors.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                <span style={{ color: '#f87171', flexShrink: 0 }}>✗</span>{e}
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-ghost" onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0}>
              <ArrowLeft size={14} /> Previous
            </button>
            {active < SYSML_STEPS.length - 1 ? (
              <button className="btn btn-primary" onClick={() => setActive(active + 1)}>
                Next Step <ArrowRight size={14} />
              </button>
            ) : (
              <button className="btn btn-gold" onClick={() => setActive(0)}>
                🎉 Restart Module
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── EVENTS ──────────────────────────────────────────
export function EventsHub() {
  const [filter, setFilter] = useState('All');
  const [rsvped, setRsvped] = useState(new Set());
  const cats = ['All', 'Academic', 'Career', 'Research', 'Wellness', 'Athletics', 'Culture', 'Military'];

  const today = new Date('2026-04-17');
  const sorted = [...EVENTS].sort((a, b) => new Date(a.date) - new Date(b.date));
  const filtered = filter === 'All' ? sorted : sorted.filter(e => e.category === filter);
  const upcoming = filtered.filter(e => new Date(e.date) >= today);
  const past = filtered.filter(e => new Date(e.date) < today);

  const toggleRsvp = (id) => setRsvped(r => { const n = new Set(r); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const EventCard = ({ e }) => {
    const dateObj = new Date(e.date);
    const daysAway = Math.ceil((dateObj - today) / (1000 * 60 * 60 * 24));
    const isPast = dateObj < today;
    return (
      <div className="card" style={{ display: 'flex', gap: 0, padding: 0, overflow: 'hidden', opacity: isPast ? 0.6 : 1 }}>
        <div style={{ width: 6, background: e.color, flexShrink: 0 }} />
        <div style={{ flex: 1, padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', marginBottom: 5 }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', lineHeight: 1.3 }}>{e.title}</h3>
                <span className="badge badge-green" style={{ fontSize: 10 }}>{e.category}</span>
                {!isPast && daysAway <= 7 && <span className="badge badge-gold" style={{ fontSize: 10 }}>Soon!</span>}
              </div>
              <p style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.55, marginBottom: 8 }}>{e.description}</p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: 11.5, color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={11} color={e.color} />{new Date(e.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} color={e.color} />{e.time}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={11} color={e.color} />{e.location}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
              {!isPast && daysAway >= 0 && (
                <div style={{ fontSize: 10, fontWeight: 800, color: daysAway <= 3 ? 'var(--wsu-gold)' : 'var(--text-muted)', fontFamily: 'var(--font-display)', textAlign: 'center' }}>
                  {daysAway === 0 ? 'TODAY' : `${daysAway}d away`}
                </div>
              )}
              {e.rsvp && !isPast && (
                <button
                  className={`btn btn-sm ${rsvped.has(e.id) ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={() => toggleRsvp(e.id)}
                >
                  {rsvped.has(e.id) ? <><Check size={11} /> RSVP'd</> : 'RSVP'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <SectionHeader icon={Calendar} title="Campus Events" subtitle="All WSU events — career fairs, capstone expos, athletics, wellness, and more. Filter by category." />

      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)} className={`tab ${filter === c ? 'active' : ''}`} style={{ fontSize: 11.5 }}>{c}</button>
        ))}
      </div>

      {upcoming.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 800, color: 'var(--wsu-gold)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="live-dot" /> Upcoming Events ({upcoming.length})
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }} className="stagger">
            {upcoming.map(e => <EventCard key={e.id} e={e} />)}
          </div>
        </div>
      )}

      {past.length > 0 && (
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 800, color: 'var(--text-muted)', marginBottom: 14 }}>Past Events</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {past.map(e => <EventCard key={e.id} e={e} />)}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── HERITAGE ────────────────────────────────────────
export function Heritage() {
  return (
    <div className="animate-fade-in">
      <SectionHeader icon={Plane} title="WSU Heritage" subtitle="From the bicycle shop on West Third Street in Dayton to the skies of Kitty Hawk — and beyond" />

      {/* Hero cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 32 }}>
        <div className="card" style={{ background: 'linear-gradient(135deg, rgba(43,82,52,0.3), rgba(13,25,16,0.9))', borderColor: 'rgba(232,160,32,0.3)', textAlign: 'center', padding: 28 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🛩️</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 800, color: 'var(--wsu-gold)', lineHeight: 1 }}>1903</div>
          <h3 style={{ fontSize: 15, color: 'var(--text-primary)', margin: '8px 0 6px' }}>12 Seconds Changed Everything</h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65 }}>On December 17, 1903, at Kitty Hawk, NC, Orville Wright piloted the world's first powered, controlled airplane flight — 120 feet in 12 seconds — made possible by Dayton ingenuity.</p>
        </div>
        <div className="card" style={{ background: 'linear-gradient(135deg, rgba(29,58,38,0.4), rgba(13,25,16,0.9))', borderColor: 'var(--border-default)', textAlign: 'center', padding: 28 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🦅</div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 800, color: 'var(--text-green)', lineHeight: 1 }}>1967</div>
          <h3 style={{ fontSize: 15, color: 'var(--text-primary)', margin: '8px 0 6px' }}>A University Earns Its Wings</h3>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.65 }}>Wright State officially became an independent university, named in honor of aviation's greatest pioneers. From a single building to a nationally ranked institution of 12,000+ students.</p>
        </div>
      </div>

      {/* Timeline */}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 20 }}>Full Timeline</h2>
      <div className="timeline">
        {HERITAGE.map((h, i) => (
          <div key={h.year} className={`timeline-item animate-fade-in`} style={{ animationDelay: `${i * 80}ms` }}>
            <div className={`timeline-dot ${h.highlight ? 'highlight' : ''}`} />
            <div className="card" style={{ borderColor: h.highlight ? 'rgba(232,160,32,0.3)' : 'var(--border-default)' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ textAlign: 'center', flexShrink: 0 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 800, color: h.highlight ? 'var(--wsu-gold)' : 'var(--text-green)', lineHeight: 1 }}>{h.year}</div>
                  <div style={{ fontSize: 20, marginTop: 4 }}>{h.emoji}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 5 }}>{h.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>{h.desc}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
