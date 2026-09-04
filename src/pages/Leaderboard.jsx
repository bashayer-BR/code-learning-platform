import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

function Leaderboard() {
  const { lang }     = useLang();
  const navigate     = useNavigate();
  const { user }     = useAuth();
  const [players,    setPlayers]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [activeTab,  setActiveTab]  = useState('points');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        const q    = query(
          collection(db, 'users'),
          orderBy(activeTab === 'points' ? 'points' : 'completedLessons', 'desc'),
          limit(20)
        );
        const snap = await getDocs(q);
        setPlayers(snap.docs.map((d, i) => ({ rank: i + 1, ...d.data() })));
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetchLeaderboard();
  }, [activeTab]);

  const tabs = [
    { key: 'points',  label: lang === 'ar' ? '⭐ النقاط'  : '⭐ Points'  },
    { key: 'lessons', label: lang === 'ar' ? '📚 الدروس'  : '📚 Lessons' },
  ];

  const rankColors = ['🥇', '🥈', '🥉'];

  return (
    <div className="container py-5" style={{ maxWidth: '800px' }}>

      {/* ── Header ───────────────────────── */}
      <div className="mb-5 text-center">
        <h1 className="fw-black mb-2" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
          {lang === 'ar' ? '🏆 لوحة المتصدرين' : '🏆 Leaderboard'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-m)' }}>
          {lang === 'ar' ? 'تنافس مع المبرمجين حول العالم' : 'Compete with developers around the world'}
        </p>
      </div>

      {/* ── Tabs ─────────────────────────── */}
      <div className="d-flex gap-2 justify-content-center mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '10px 24px', borderRadius: 'var(--radius-xl)',
              border: `1px solid ${activeTab === tab.key ? 'var(--primary)' : 'var(--divider)'}`,
              background: activeTab === tab.key ? 'rgba(232, 130, 74, 0.12)' : 'var(--bg-card)',
              color: activeTab === tab.key ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === tab.key ? '700' : '500',
              fontSize: 'var(--font-m)', fontFamily: 'Cairo, sans-serif', cursor: 'pointer',
              transition: 'var(--transition)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Top 3 ────────────────────────── */}
      {!loading && players.length >= 3 && (
        <div className="row g-3 mb-5 align-items-end justify-content-center">
          {[players[1], players[0], players[2]].map((p, i) => {
            const isFirst  = i === 1;
            const heights  = ['140px', '180px', '120px'];
            const medals   = ['🥈', '🥇', '🥉'];
            const colors   = ['var(--blue)', 'var(--orange)', 'var(--green)'];
            return (
              <div className="col-4 text-center" key={p?.uid || i}>
                <div style={{ marginBottom: '8px', fontSize: isFirst ? '40px' : '30px' }}>
                  {medals[i]}
                </div>
                <div style={{
                  width: '50px', height: '50px', borderRadius: '50%',
                  background: colors[i],
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px', color: 'white', fontWeight: '900',
                  margin: '0 auto 8px',
                  border: isFirst ? '3px solid var(--orange)' : 'none',
                }}>
                  {p?.name?.[0] || p?.email?.[0] || '؟'}
                </div>
                <div className="fw-bold" style={{ fontSize: 'var(--font-s)', marginBottom: '4px' }}>
                  {p?.name || p?.email?.split('@')[0] || '---'}
                </div>
                <div style={{ color: colors[i], fontWeight: '900', fontSize: 'var(--font-m)' }}>
                  ⭐ {activeTab === 'points' ? p?.points : p?.completedLessons?.length || 0}
                </div>
                <div style={{
                  height: heights[i], marginTop: '8px',
                  background: `${colors[i]}20`,
                  border: `2px solid ${colors[i]}`,
                  borderRadius: 'var(--radius-m) var(--radius-m) 0 0',
                }} />
              </div>
            );
          })}
        </div>
      )}

      {/* ── List ─────────────────────────── */}
      <div className="card">
        {loading ? (
          <div className="text-center p-5">
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>⏳</div>
            <p style={{ color: 'var(--text-hint)' }}>
              {lang === 'ar' ? 'جاري التحميل...' : 'Loading...'}
            </p>
          </div>
        ) : players.length === 0 ? (
          <div className="text-center p-5">
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>👥</div>
            <p style={{ color: 'var(--text-hint)' }}>
              {lang === 'ar' ? 'لا يوجد مستخدمين بعد' : 'No users yet'}
            </p>
          </div>
        ) : (
          <div>
            {players.map((p, i) => {
              const isCurrentUser = p.uid === user?.uid;
              const value = activeTab === 'points' ? p.points : p.completedLessons?.length || 0;
              return (
                <div
                  key={p.uid}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '16px 20px',
                    borderBottom: i < players.length - 1 ? '1px solid var(--divider)' : 'none',
                    background: isCurrentUser ? 'rgba(232, 130, 74, 0.06)' : 'transparent',
                    transition: 'var(--transition)',
                  }}
                >
                  {/* Rank */}
                  <div style={{
                    width: '36px', textAlign: 'center',
                    fontSize: i < 3 ? '24px' : 'var(--font-m)',
                    fontWeight: '900',
                    color: i < 3 ? 'inherit' : 'var(--text-hint)',
                  }}>
                    {i < 3 ? rankColors[i] : `#${i + 1}`}
                  </div>

                  {/* Avatar */}
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: isCurrentUser ? 'var(--gradient-primary)' : 'var(--bg-surface)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', fontWeight: '900',
                    color: isCurrentUser ? 'white' : 'var(--text-secondary)',
                    flexShrink: 0,
                  }}>
                    {p.name?.[0] || p.email?.[0] || '؟'}
                  </div>

                  {/* Name */}
                  <div style={{ flex: 1 }}>
                    <div className="fw-bold" style={{ fontSize: 'var(--font-m)', color: isCurrentUser ? 'var(--primary)' : 'var(--text-primary)' }}>
                      {p.name || p.email?.split('@')[0] || '---'}
                      {isCurrentUser && (
                        <span style={{ marginRight: '8px', fontSize: 'var(--font-xs)', color: 'var(--primary)' }}>
                          {lang === 'ar' ? '(أنت)' : '(You)'}
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-hint)' }}>
                      {p.completedLessons?.length || 0} {lang === 'ar' ? 'درس' : 'lessons'} •
                      {p.completedChallenges?.length || 0} {lang === 'ar' ? 'تحدي' : 'challenges'}
                    </div>
                  </div>

                  {/* Score */}
                  <div style={{
                    fontWeight: '900', fontSize: 'var(--font-l)',
                    color: isCurrentUser ? 'var(--primary)' : 'var(--text-primary)',
                  }}>
                    {activeTab === 'points' ? '⭐' : '📚'} {value}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── My rank ──────────────────────── */}
      {!loading && user && (
        <div className="card p-4 mt-4 text-center" style={{ background: 'rgba(232, 130, 74, 0.06)', border: '1px solid rgba(232, 130, 74, 0.3)' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontSize: 'var(--font-s)' }}>
            {lang === 'ar' ? 'ترتيبك الحالي' : 'Your Current Rank'}
          </p>
          <div className="gradient-text fw-black" style={{ fontSize: 'var(--font-xxl)' }}>
            #{players.findIndex((p) => p.uid === user.uid) + 1 || '--'}
          </div>
          <button className="btn-primary mt-3" onClick={() => navigate('/lessons')} style={{ padding: '10px 24px' }}>
            {lang === 'ar' ? 'ارفع ترتيبك ←' : 'Improve Your Rank →'}
          </button>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;