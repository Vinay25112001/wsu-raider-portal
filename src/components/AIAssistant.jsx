import { useState, useRef, useEffect } from 'react';
import { Send, Bot, Settings, X, Zap, BookOpen, Cpu, Check } from 'lucide-react';
import { SectionHeader, Spinner, Avatar } from './UI.jsx';

const GROK_SYSTEM_PROMPT = `You are the WSU Raider AI Study Assistant, powered by Grok, for Wright State University students in Fairborn/Dayton, Ohio.

Key facts about WSU you know deeply:
- President: Sue Edwards, Ph.D. | Provost: Amy Thompson, Ph.D.
- Rankings: #1 Public University in Ohio for Student Experience (WSJ/College Pulse 2026)
- 160 undergraduate + 155 graduate programs | 125,000+ alumni | 95.2% acceptance rate
- Colleges: CECS (Engineering/CS), RSCOB (Business, AACSB-accredited), Boonshoft School of Medicine, CHEHS (Nursing/Education), COLA (Liberal Arts), COSM (Science/Math)
- Notable: Kno.e.sis Center (AI/ML research), DoD SMART Scholarships, Intel-RSCOB partnership, U.S. Space Command partner
- Wright Guarantee: locks tuition, housing, dining costs for 4 years
- Athletics: NCAA Division I, Horizon League, Raiders
- Named for Orville & Wilbur Wright, Dayton's aviation pioneers
- WINGS portal: academic/financial hub | CaTS: IT support | ASC: tutoring
- Fall Break added 2025: Oct 9-10 | Summer 2026 starts May 18
- SysML/CATIA Magic (Cameo Systems Modeler): You are an expert in this tool

For SysML/CATIA Magic expertise:
- Block Definition Diagrams (BDD), Package Diagrams, Use Case Diagrams, Requirements Diagrams, IBD, Sequence/Activity Diagrams
- Stereotypes: «use», «refine», «deriveReqt», «extend», «satisfy», «verify»
- CATIA Magic workarounds: Member Ends section, right-click menus, direct diagram labeling
- eVTOL modeling: HybridEVTOL, FixedLiftRotor, TiltingRotor, TiltActuator, requirements HFT-001 through HFT-006

Your personality: Encouraging, precise, practical. You help with homework, explain concepts, quiz students, give career advice, and navigate WSU services. Keep answers under 250 words unless a detailed technical answer is needed. Use bullet points for steps/lists. Always be specific to WSU when relevant.`;

const QUICK_PROMPTS = [
  { label: 'SysML Help', text: 'How do I create a Block Definition Diagram in CATIA Magic with proper multiplicity on associations?', icon: '🧱' },
  { label: 'Course Advice', text: 'I\'m a sophomore CS major at WSU. What electives should I take to prepare for an AI/ML career?', icon: '📚' },
  { label: 'Grad School', text: 'What are WSU\'s strengths for MS in Computer Science or Human Factors? What should my application highlight?', icon: '🎓' },
  { label: 'Internship Tips', text: 'How do I get an internship at WPAFB or with Northrop Grumman as a WSU CECS student?', icon: '🏢' },
  { label: 'Quiz Me', text: 'Quiz me on Data Structures — give me a medium-difficulty question about trees or graphs.', icon: '🧠' },
  { label: 'WINGS Help', text: 'How do I register for classes in WINGS and what is the best time to get priority registration?', icon: '🔗' },
];

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey Raider! 👋 I'm your WSU AI Study Assistant, powered by Grok. I know everything about Wright State — courses, CATIA Magic/SysML, career paths, campus resources, and more.\n\nEnter your **Grok API key** in Settings (free at console.x.ai — $25/month credits) and let's get started. What can I help you with today?",
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('wsu_grok_key') || '');
  const [showSettings, setShowSettings] = useState(false);
  const [tempKey, setTempKey] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const saveKey = () => {
    const key = tempKey.trim();
    setApiKey(key);
    localStorage.setItem('wsu_grok_key', key);
    setShowSettings(false);
    setTempKey('');
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    if (!apiKey) {
      setShowSettings(true);
      return;
    }

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setLoading(true);

    try {
      const history = messages
        .filter(m => m.role !== 'system')
        .map(m => ({ role: m.role, content: m.content }));
      history.push({ role: 'user', content: userText });

      const res = await fetch('https://api.x.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'grok-3',
          max_tokens: 800,
          system: GROK_SYSTEM_PROMPT,
          messages: history,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error?.message || `API Error ${res.status}`);
      }

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response. Please try again.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `⚠️ Error: ${err.message}\n\nIf this is an API key issue, click the Settings icon to update your Grok API key. Get a free key at **console.x.ai** ($25 free credits/month).`,
      }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const renderMessage = (content) => {
    return content
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('**') && line.endsWith('**')) {
          return <strong key={i} style={{ color: 'var(--wsu-gold)' }}>{line.slice(2, -2)}</strong>;
        }
        if (line.startsWith('• ') || line.startsWith('- ')) {
          return <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 2 }}><span style={{ color: 'var(--wsu-gold)', flexShrink: 0 }}>•</span><span>{line.slice(2).replace(/\*\*(.*?)\*\*/g, '$1')}</span></div>;
        }
        return <span key={i}>{line.replace(/\*\*(.*?)\*\*/g, '$1')}{i < content.split('\n').length - 1 ? ' ' : ''}</span>;
      });
  };

  return (
    <div className="animate-fade-in">
      <SectionHeader
        icon={Bot}
        title="AI Study Assistant"
        subtitle="Powered by Grok (xAI) — your WSU-aware academic companion for courses, SysML, career advice and more"
        action={
          <button className="btn btn-ghost btn-sm" onClick={() => { setTempKey(apiKey); setShowSettings(!showSettings); }}>
            <Settings size={14} /> {apiKey ? 'API Key ✓' : 'Setup Key'}
          </button>
        }
      />

      {/* API Key Setup */}
      {showSettings && (
        <div className="card" style={{ marginBottom: 20, borderColor: 'var(--border-gold)', background: 'rgba(232,160,32,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>🔑 Grok API Configuration</h3>
            <button className="btn btn-ghost btn-sm" onClick={() => setShowSettings(false)}><X size={14} /></button>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16, lineHeight: 1.7 }}>
            Get your <strong style={{ color: 'var(--wsu-gold)' }}>free Grok API key</strong> at{' '}
            <a href="https://console.x.ai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--wsu-gold)' }}>console.x.ai</a>.
            xAI provides <strong style={{ color: 'var(--wsu-gold)' }}>$25 free credits/month</strong>.
            Your key is stored only in this browser (localStorage) and never sent anywhere except xAI's API.
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              className="input"
              type="password"
              placeholder="xai-xxxxxxxxxxxxxxxxxxxxxxxx"
              value={tempKey}
              onChange={e => setTempKey(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && saveKey()}
              style={{ flex: 1 }}
            />
            <button className="btn btn-primary" onClick={saveKey} disabled={!tempKey.trim()}>
              <Check size={14} /> Save Key
            </button>
          </div>
          {apiKey && (
            <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-green)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Check size={11} /> API key saved — Grok is ready!
            </div>
          )}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: 20 }}>
        {/* Chat Window */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', height: 560, padding: 0, overflow: 'hidden' }}>
          {/* Chat Header */}
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(43,82,52,0.1)' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg, var(--wsu-green), var(--wsu-green-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-gold)' }}>
              <Bot size={16} color="#E8A020" />
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Raider AI Assistant</div>
              <div style={{ fontSize: 10.5, color: apiKey ? 'var(--text-green)' : 'var(--text-muted)' }}>
                {apiKey ? '● Grok-3 connected' : '○ API key required'}
              </div>
            </div>
            <div style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--text-muted)', background: 'rgba(43,82,52,0.2)', padding: '3px 8px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)' }}>
              WSU-Aware
            </div>
          </div>

          {/* Messages */}
          <div className="chat-container" style={{ flex: 1, overflowY: 'auto' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.role === 'user' ? 'user' : ''}`}>
                {msg.role === 'assistant' ? (
                  <div className="chat-avatar" style={{ background: 'linear-gradient(135deg, var(--wsu-green), var(--wsu-green-dark))', border: '1px solid var(--border-gold)' }}>
                    <Bot size={14} color="#E8A020" />
                  </div>
                ) : (
                  <div className="chat-avatar" style={{ background: 'rgba(43,82,52,0.4)', border: '1px solid var(--border-default)' }}>
                    <span style={{ fontSize: 12 }}>🎓</span>
                  </div>
                )}
                <div className={`chat-bubble ${msg.role}`} style={{ fontSize: 13.5, lineHeight: 1.65 }}>
                  {renderMessage(msg.content)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="chat-message">
                <div className="chat-avatar" style={{ background: 'linear-gradient(135deg, var(--wsu-green), var(--wsu-green-dark))', border: '1px solid var(--border-gold)' }}>
                  <Bot size={14} color="#E8A020" />
                </div>
                <div className="chat-bubble ai" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Spinner size={14} />
                  <span style={{ fontSize: 12, color: 'var(--text-muted)', animation: 'pulse 1.5s ease infinite' }}>Grok is thinking...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: 10, background: 'rgba(8,15,10,0.5)' }}>
            <input
              ref={inputRef}
              className="input"
              placeholder={apiKey ? 'Ask anything about WSU, SysML, courses, career...' : 'Enter your Grok API key first ↑'}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              disabled={loading}
              style={{ flex: 1, fontSize: 13.5 }}
            />
            <button
              className="btn btn-primary"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{ padding: '10px 14px', flexShrink: 0 }}
              aria-label="Send message"
            >
              {loading ? <Spinner size={14} /> : <Send size={14} />}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Quick Prompts */}
          <div className="card">
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--wsu-gold)', marginBottom: 10, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Zap size={12} /> Quick Prompts
            </div>
            {QUICK_PROMPTS.map(q => (
              <button
                key={q.label}
                onClick={() => setInput(q.text)}
                style={{
                  width: '100%', textAlign: 'left', background: 'none', cursor: 'pointer',
                  padding: '8px 10px', borderRadius: 'var(--radius-sm)', marginBottom: 5,
                  border: '1px solid var(--border-subtle)', fontSize: 12, color: 'var(--text-muted)',
                  lineHeight: 1.4, transition: 'all 0.15s', display: 'flex', gap: 8, alignItems: 'flex-start',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--wsu-gold)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
              >
                <span style={{ flexShrink: 0 }}>{q.icon}</span>
                <span><strong style={{ fontFamily: 'var(--font-display)' }}>{q.label}:</strong> {q.text.slice(0, 55)}...</span>
              </button>
            ))}
          </div>

          {/* Capabilities */}
          <div className="card">
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--wsu-gold)', marginBottom: 10, fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <BookOpen size={12} /> AI Capabilities
            </div>
            {[
              'SysML & CATIA Magic expert',
              'WSU course guidance',
              'Career & internship advice',
              'Study strategies & quizzes',
              'Grad school planning',
              'Research & citation help',
              'WINGS portal navigation',
              'Real-time Grok web search',
            ].map(c => (
              <div key={c} style={{ fontSize: 11.5, color: 'var(--text-muted)', padding: '4px 0', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: 'var(--text-green)', flexShrink: 0 }}>✓</span>{c}
              </div>
            ))}
          </div>

          {/* API Info */}
          <div className="card" style={{ background: 'rgba(232,160,32,0.04)', borderColor: 'var(--border-gold)' }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--wsu-gold)', marginBottom: 6, fontFamily: 'var(--font-display)' }}>🔑 Free API Setup</div>
            <div style={{ fontSize: 11.5, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 8 }}>
              1. Go to <strong style={{ color: 'var(--wsu-gold)' }}>console.x.ai</strong><br />
              2. Sign up → Create API Key<br />
              3. Paste key in Settings above<br />
              4. $25 free credits/month!
            </div>
            <a href="https://console.x.ai" target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center', fontSize: 11 }}>
              Get Free Grok Key →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
