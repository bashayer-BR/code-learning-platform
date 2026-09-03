import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

function Profile() {
  const { lang, toggleLang }        = useLang();
  const navigate                    = useNavigate();
  const { user, logout }            = useAuth();
  const { profile, refreshProfile } = useUser();
  const [activeTab, setActiveTab]   = useState('overview');
  const [notify,    setNotify]      = useState(true);
  const [saved,     setSaved]       = useState(false);

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>👤</div>
        <h2 className="fw-black mb-3">
          {lang === 'ar' ? 'سجّل دخولك أولاً' : 'Sign In First'}
        </h2>
        <button className="btn-primary" onClick={() => navigate('/auth')} style={{ padding: '12px 32px' }}>
          {lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
        </button>
      </div>
    );
  }

  const completedLessons    = profile?.completedLessons?.length    || 0;
  const completedChallenges = profile?.completedChallenges?.length || 0;
  const points              = profile?.points || 0;

  const certificates = [
    { icon: '🌐', title: lang === 'ar' ? 'أساسيات الويب'     : 'Web Fundamentals',   unlocked: completedLessons    >= 2, condition: lang === 'ar' ? 'أكمل درسين'    : 'Complete 2 lessons',    color: 'var(--orange)' },
    { icon: '🏆', title: lang === 'ar' ? 'محترف التحديات'    : 'Challenges Pro',     unlocked: completedChallenges >= 3, condition: lang === 'ar' ? 'حل 3 تحديات'  : 'Solve 3 challenges',    color: 'var(--blue)'   },
    { icon: '⭐', title: lang === 'ar' ? 'جامع النقاط'       : 'Points Collector',   unlocked: points              >= 100, condition: lang === 'ar' ? '100 نقطة'    : '100 Points',            color: 'var(--green)'  },
    { icon: '🚀', title: lang === 'ar' ? 'المبرمج المتميز'   : 'Elite Developer',    unlocked: points              >= 500, condition: lang === 'ar' ? '500 نقطة'    : '500 Points',            color: 'var(--purple)' },
    { icon: '📚', title: lang === 'ar' ? 'متعلم نشيط'        : 'Active Learner',     unlocked: completedLessons    >= 5,  condition: lang === 'ar' ? 'أكمل 5 دروس' : 'Complete 5 lessons',    color: 'var(--orange)' },
    { icon: '👑', title: lang === 'ar' ? 'خبير البرمجة'      : 'Programming Expert', unlocked: completedLessons    >= 9 && completedChallenges >= 6, condition: lang === 'ar' ? 'أكمل الكل' : 'Complete all', color: 'var(--yellow)' },
  ];

  const tabs = [
    { key: 'overview',      icon: '📊', label: lang === 'ar' ? 'نظرة عامة'  : 'Overview'      },
    { key: 'certificates',  icon: '📜', label: lang === 'ar' ? 'الشهادات'   : 'Certificates'  },
    { key: 'settings',      icon: '⚙️', label: lang === 'ar' ? 'الإعدادات'  : 'Settings'      },
    { key: 'dashboard', icon: '📊', label: lang === 'ar' ? 'لوحتي' : 'Dashboard' },
  ];

  const handleSave = async () => {
    await updateDoc(doc(db, 'users', user.uid), { notify });
    await refreshProfile();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const Toggle = ({ value, onChange }) => (
    <div onClick={() => onChange(!value)} style={{
      width: '44px', height: '24px', borderRadius: '12px',
      background: value ? 'var(--primary)' : 'var(--bg-surface)',
      border: `1px solid ${value ? 'var(--primary)' : 'var(--divider)'}`,
      cursor: 'pointer', position: 'relative', transition: 'var(--transition)',
    }}>
      <div style={{
        width: '18px', height: '18px', borderRadius: '50%',
        background: 'white', position: 'absolute', top: '2px',
        left: value ? '22px' : '2px', transition: 'var(--transition)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
      }} />
    </div>
  );

  return (
    <div className="container py-5">

      {/* ── Profile header ───────────────── */}
      <div className="card p-4 mb-4">
        <div className="d-flex flex-wrap align-items-center gap-4">
          {/* Avatar */}
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'var(--gradient-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '36px', color: 'white', fontWeight: '900', flexShrink: 0,
          }}>
            {user.displayName?.[0] || user.email?.[0] || '؟'}
          </div>

          {/* Info */}
          <div style={{ flex: 1 }}>
            <h2 className="fw-black mb-1" style={{ fontSize: 'var(--font-xl)' }}>
              {user.displayName || (lang === 'ar' ? 'مستخدم' : 'User')}
            </h2>
            <p style={{ color: 'var(--text-hint)', fontSize: 'var(--font-s)', marginBottom: '12px' }}>
              {user.email}
            </p>
            <div className="d-flex flex-wrap gap-2">
              {[
                { icon: '📚', value: completedLessons,    label: lang === 'ar' ? 'درس'    : 'lessons',    color: 'var(--blue)'   },
                { icon: '🏆', value: completedChallenges, label: lang === 'ar' ? 'تحدي'   : 'challenges', color: 'var(--orange)' },
                { icon: '⭐', value: points,              label: lang === 'ar' ? 'نقطة'   : 'points',     color: 'var(--green)'  },
              ].map((s) => (
                <div key={s.label} style={{
                  padding: '6px 14px', borderRadius: 'var(--radius-xl)',
                  background: `${s.color}15`, border: `1px solid ${s.color}30`,
                  fontSize: 'var(--font-s)', fontWeight: '700', color: s.color,
                }}>
                  {s.icon} {s.value} {s.label}
                </div>
              ))}
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={async () => { await logout(); navigate('/'); }}
            style={{
              padding: '8px 20px', borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              background: 'rgba(239, 68, 68, 0.08)',
              color: 'var(--red)', fontWeight: '700',
              fontSize: 'var(--font-s)', fontFamily: 'Cairo, sans-serif', cursor: 'pointer',
            }}
          >
            🚪 {lang === 'ar' ? 'خروج' : 'Sign Out'}
          </button>
        </div>
      </div>

      {/* ── Tabs ─────────────────────────── */}
      <div className="d-flex gap-2 mb-4 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: '10px 20px', borderRadius: 'var(--radius-xl)',
              border: `1px solid ${activeTab === tab.key ? 'var(--primary)' : 'var(--divider)'}`,
              background: activeTab === tab.key ? 'rgba(232, 130, 74, 0.12)' : 'var(--bg-card)',
              color: activeTab === tab.key ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: activeTab === tab.key ? '700' : '500',
              fontSize: 'var(--font-s)', fontFamily: 'Cairo, sans-serif', cursor: 'pointer',
              transition: 'var(--transition)',
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab: Overview ────────────────── */}
      {activeTab === 'overview' && (
        <div className="row g-4">
          <div className="col-lg-8">

            {/* Progress bars */}
            <div className="card p-4 mb-4">
              <h3 className="fw-black mb-4" style={{ fontSize: 'var(--font-l)' }}>
                {lang === 'ar' ? '📈 تقدمك الكلي' : '📈 Overall Progress'}
              </h3>
              {[
                { label: lang === 'ar' ? 'الدروس'   : 'Lessons',    value: completedLessons,    total: 9,   color: 'var(--blue)'   },
                { label: lang === 'ar' ? 'التحديات' : 'Challenges', value: completedChallenges, total: 6,   color: 'var(--orange)' },
                { label: lang === 'ar' ? 'النقاط'   : 'Points',     value: points,              total: 500, color: 'var(--green)'  },
              ].map((bar) => (
                <div key={bar.label} className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span style={{ fontSize: 'var(--font-s)', fontWeight: '600' }}>{bar.label}</span>
                    <span style={{ fontSize: 'var(--font-s)', color: bar.color, fontWeight: '700' }}>
                      {Math.min(Math.round((bar.value / bar.total) * 100), 100)}%
                    </span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${Math.min((bar.value / bar.total) * 100, 100)}%`,
                      background: bar.color, borderRadius: 'var(--radius-xl)', transition: 'width 0.5s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="card p-4">
              <h3 className="fw-black mb-4" style={{ fontSize: 'var(--font-l)' }}>
                {lang === 'ar' ? '⚡ إجراءات سريعة' : '⚡ Quick Actions'}
              </h3>
              <div className="row g-3">
                {[
                  { icon: '📚', label: lang === 'ar' ? 'متابعة التعلم' : 'Continue Learning', path: '/lessons',    color: 'var(--blue)'   },
                  { icon: '🏆', label: lang === 'ar' ? 'حل تحدي'       : 'Solve Challenge',   path: '/challenges', color: 'var(--orange)' },
                  { icon: '🤖', label: lang === 'ar' ? 'اسأل AI'       : 'Ask AI',            path: '/ai',         color: 'var(--purple)' },
                  { icon: '👥', label: lang === 'ar' ? 'المجتمع'       : 'Community',         path: '/community',  color: 'var(--green)'  },
                ].map((action) => (
                  <div className="col-6" key={action.label}>
                    <div
                      className="card p-3 text-center"
                      onClick={() => navigate(action.path)}
                      style={{ cursor: 'pointer', border: `1px solid ${action.color}25`, background: `${action.color}08` }}
                    >
                      <div style={{ fontSize: '28px', marginBottom: '8px' }}>{action.icon}</div>
                      <div style={{ fontSize: 'var(--font-s)', fontWeight: '700', color: action.color }}>
                        {action.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="col-lg-4">
            <div className="card p-4">
              <h3 className="fw-black mb-3" style={{ fontSize: 'var(--font-l)' }}>
                {lang === 'ar' ? '🏅 الإنجازات' : '🏅 Achievements'}
              </h3>
              <div className="d-flex flex-column gap-2">
                {[
                  { icon: '🎯', label: lang === 'ar' ? 'أول درس'  : 'First Lesson',    unlocked: completedLessons    >= 1 },
                  { icon: '📚', label: lang === 'ar' ? '5 دروس'   : '5 Lessons',       unlocked: completedLessons    >= 5 },
                  { icon: '🏆', label: lang === 'ar' ? 'أول تحدي' : 'First Challenge', unlocked: completedChallenges >= 1 },
                  { icon: '⚡', label: lang === 'ar' ? '3 تحديات' : '3 Challenges',    unlocked: completedChallenges >= 3 },
                  { icon: '⭐', label: lang === 'ar' ? '100 نقطة' : '100 Points',      unlocked: points              >= 100 },
                  { icon: '🚀', label: lang === 'ar' ? '500 نقطة' : '500 Points',      unlocked: points              >= 500 },
                ].map((ach) => (
                  <div key={ach.label} className="d-flex align-items-center gap-3 p-2" style={{
                    borderRadius: 'var(--radius-m)',
                    background: ach.unlocked ? 'rgba(232, 130, 74, 0.08)' : 'transparent',
                    opacity: ach.unlocked ? 1 : 0.4,
                  }}>
                    <span style={{ fontSize: '20px' }}>{ach.unlocked ? ach.icon : '🔒'}</span>
                    <span style={{ fontSize: 'var(--font-s)', fontWeight: ach.unlocked ? '700' : '400' }}>
                      {ach.label}
                    </span>
                    {ach.unlocked && <span style={{ marginRight: 'auto', color: 'var(--green)', fontSize: 'var(--font-xs)' }}>✓</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Tab: Certificates ────────────── */}
      {activeTab === 'certificates' && (
        <div className="row g-4">
          {certificates.map((cert, i) => (
            <div className="col-lg-4 col-md-6" key={i}>
              <div className="card h-100 p-4" style={{
                background: cert.unlocked ? `${cert.color}08` : 'var(--bg-card)',
                border: `2px solid ${cert.unlocked ? cert.color : 'var(--divider)'}`,
                opacity: cert.unlocked ? 1 : 0.6,
              }}>
                <div style={{ fontSize: '48px', marginBottom: '12px', filter: cert.unlocked ? 'none' : 'grayscale(1)' }}>
                  {cert.unlocked ? cert.icon : '🔒'}
                </div>
                <h3 className="fw-black mb-2" style={{ fontSize: 'var(--font-l)', color: cert.unlocked ? cert.color : 'var(--text-hint)' }}>
                  {cert.title}
                </h3>
                <p style={{ color: 'var(--text-hint)', fontSize: 'var(--font-xs)', marginBottom: '12px' }}>
                  🎯 {cert.condition}
                </p>
                {cert.unlocked ? (
                  <button className="btn-primary w-100" style={{ background: `linear-gradient(135deg, ${cert.color}, ${cert.color}BB)`, padding: '10px' }} onClick={() => window.print()}>
                    {lang === 'ar' ? '🖨️ طباعة' : '🖨️ Print'}
                  </button>
                ) : (
                  <button className="btn-secondary w-100" style={{ padding: '10px' }} onClick={() => navigate('/lessons')}>
                    {lang === 'ar' ? 'ابدأ التعلم ←' : 'Start Learning →'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Tab: Settings ────────────────── */}
      {activeTab === 'settings' && (
        <div style={{ maxWidth: '600px' }}>

          {/* Language */}
          <div className="card p-4 mb-3">
            <h3 className="fw-black mb-3" style={{ fontSize: 'var(--font-l)' }}>
              🌐 {lang === 'ar' ? 'اللغة' : 'Language'}
            </h3>
            <div className="d-flex align-items-center justify-content-between">
              <span style={{ fontSize: 'var(--font-m)', fontWeight: '600' }}>
                {lang === 'ar' ? 'لغة الواجهة' : 'Interface Language'}
              </span>
              <button onClick={toggleLang} style={{
                padding: '8px 20px', borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--primary)', background: 'rgba(232, 130, 74, 0.10)',
                color: 'var(--primary)', fontWeight: '700', fontSize: 'var(--font-s)',
                fontFamily: 'Cairo, sans-serif', cursor: 'pointer',
              }}>
                {lang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="card p-4 mb-3">
            <h3 className="fw-black mb-3" style={{ fontSize: 'var(--font-l)' }}>
              🔔 {lang === 'ar' ? 'الإشعارات' : 'Notifications'}
            </h3>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <div className="fw-bold" style={{ fontSize: 'var(--font-m)' }}>
                  {lang === 'ar' ? 'إشعارات الدروس' : 'Lesson Notifications'}
                </div>
                <div style={{ color: 'var(--text-hint)', fontSize: 'var(--font-s)' }}>
                  {lang === 'ar' ? 'تذكير يومي للتعلم' : 'Daily learning reminder'}
                </div>
              </div>
              <Toggle value={notify} onChange={setNotify} />
            </div>
          </div>

          {/* Danger zone */}
          <div className="card p-4 mb-4" style={{ border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.04)' }}>
            <h3 className="fw-black mb-3" style={{ fontSize: 'var(--font-l)', color: 'var(--red)' }}>
              ⚠️ {lang === 'ar' ? 'منطقة الخطر' : 'Danger Zone'}
            </h3>
            <div className="d-flex align-items-center justify-content-between">
              <span style={{ fontSize: 'var(--font-m)', fontWeight: '600' }}>
                {lang === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
              </span>
              <button onClick={async () => { await logout(); navigate('/'); }} style={{
                padding: '8px 20px', borderRadius: 'var(--radius-xl)',
                border: '1px solid rgba(239, 68, 68, 0.4)', background: 'rgba(239, 68, 68, 0.08)',
                color: 'var(--red)', fontWeight: '700', fontSize: 'var(--font-s)',
                fontFamily: 'Cairo, sans-serif', cursor: 'pointer',
              }}>
                🚪 {lang === 'ar' ? 'خروج' : 'Sign Out'}
              </button>
            </div>
          </div>

          <button className="btn-primary w-100" onClick={handleSave} style={{ padding: '14px', fontSize: 'var(--font-m)' }}>
            {saved ? (lang === 'ar' ? '✅ تم الحفظ!' : '✅ Saved!') : (lang === 'ar' ? 'حفظ الإعدادات' : 'Save Settings')}
          </button>
        </div>
      )}
      {/* ── Tab: Dashboard ──────────────── */}
        {activeTab === 'dashboard' && (
          <div>

            {/* Greeting */}
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
              <div>
                <p style={{ color: 'var(--text-hint)', fontSize: 'var(--font-s)', marginBottom: '4px' }}>
                  {new Date().getHours() < 12
                    ? (lang === 'ar' ? 'صباح الخير 👋' : 'Good Morning 👋')
                    : (lang === 'ar' ? 'مساء الخير 👋' : 'Good Afternoon 👋')}
                </p>
                <h2 className="fw-black mb-0" style={{ fontSize: 'clamp(20px, 3vw, 28px)' }}>
                  {user.displayName || user.email?.split('@')[0]}
                </h2>
              </div>
              <div style={{
                padding: '10px 20px', borderRadius: 'var(--radius-xl)',
                background: 'rgba(232, 130, 74, 0.10)', border: '1px solid rgba(232, 130, 74, 0.3)',
              }}>
                <span className="gradient-text fw-black" style={{ fontSize: 'var(--font-l)' }}>
                  ⭐ {points} {lang === 'ar' ? 'نقطة' : 'pts'}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="row g-3 mb-4">
              {[
                { icon: '📚', value: completedLessons,    total: 9,   label: lang === 'ar' ? 'دروس مكتملة'   : 'Lessons Done',     color: 'var(--blue)',   bg: 'rgba(74, 144, 217, 0.08)'  },
                { icon: '🏆', value: completedChallenges, total: 6,   label: lang === 'ar' ? 'تحديات محلولة' : 'Challenges Solved', color: 'var(--orange)', bg: 'rgba(232, 130, 74, 0.08)' },
                { icon: '🔥', value: profile?.streak || 0, total: null, label: lang === 'ar' ? 'أيام متتالية' : 'Day Streak',       color: 'var(--red)',    bg: 'rgba(239, 68, 68, 0.08)'   },
                { icon: '⭐', value: points,              total: 500, label: lang === 'ar' ? 'نقطة'          : 'Points',           color: 'var(--green)',  bg: 'rgba(46, 204, 154, 0.08)'  },
              ].map((stat) => (
                <div className="col-6 col-md-3" key={stat.label}>
                  <div className="card p-4 text-center" style={{ background: stat.bg, border: `1px solid ${stat.color}25` }}>
                    <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
                    <div className="fw-black" style={{ fontSize: 'var(--font-xxl)', color: stat.color }}>
                      {stat.value}
                    </div>
                    {stat.total && (
                      <div style={{ color: 'var(--text-hint)', fontSize: 'var(--font-xs)' }}>/ {stat.total}</div>
                    )}
                    <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row g-4">
              <div className="col-lg-8">

                {/* Progress bars */}
                <div className="card p-4 mb-4">
                  <h3 className="fw-black mb-4" style={{ fontSize: 'var(--font-l)' }}>
                    {lang === 'ar' ? '📈 تقدمك الكلي' : '📈 Overall Progress'}
                  </h3>
                  {[
                    { label: lang === 'ar' ? 'الدروس'   : 'Lessons',    value: completedLessons,    total: 9,   color: 'var(--blue)'   },
                    { label: lang === 'ar' ? 'التحديات' : 'Challenges', value: completedChallenges, total: 6,   color: 'var(--orange)' },
                    { label: lang === 'ar' ? 'النقاط'   : 'Points',     value: points,              total: 500, color: 'var(--green)'  },
                  ].map((bar) => (
                    <div key={bar.label} className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span style={{ fontSize: 'var(--font-s)', fontWeight: '600' }}>{bar.label}</span>
                        <span style={{ fontSize: 'var(--font-s)', color: bar.color, fontWeight: '700' }}>
                          {Math.min(Math.round((bar.value / bar.total) * 100), 100)}%
                        </span>
                      </div>
                      <div style={{ height: '8px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', width: `${Math.min((bar.value / bar.total) * 100, 100)}%`,
                          background: bar.color, borderRadius: 'var(--radius-xl)', transition: 'width 0.5s ease',
                        }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick actions */}
                <div className="card p-4">
                  <h3 className="fw-black mb-4" style={{ fontSize: 'var(--font-l)' }}>
                    {lang === 'ar' ? '⚡ إجراءات سريعة' : '⚡ Quick Actions'}
                  </h3>
                  <div className="row g-3">
                    {[
                      { icon: '📚', label: lang === 'ar' ? 'متابعة التعلم' : 'Continue Learning', path: '/lessons',    color: 'var(--blue)'   },
                      { icon: '🏆', label: lang === 'ar' ? 'حل تحدي'       : 'Solve Challenge',   path: '/challenges', color: 'var(--orange)' },
                      { icon: '🤖', label: lang === 'ar' ? 'اسأل AI'       : 'Ask AI',            path: '/ai',         color: 'var(--purple)' },
                      { icon: '👥', label: lang === 'ar' ? 'المجتمع'       : 'Community',         path: '/community',  color: 'var(--green)'  },
                    ].map((action) => (
                      <div className="col-6" key={action.label}>
                        <div
                          className="card p-3 text-center"
                          onClick={() => navigate(action.path)}
                          style={{ cursor: 'pointer', border: `1px solid ${action.color}25`, background: `${action.color}08` }}
                        >
                          <div style={{ fontSize: '28px', marginBottom: '8px' }}>{action.icon}</div>
                          <div style={{ fontSize: 'var(--font-s)', fontWeight: '700', color: action.color }}>
                            {action.label}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Daily tip */}
              <div className="col-lg-4">
                <div className="card p-4" style={{ background: 'rgba(99, 102, 241, 0.06)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                  <h3 className="fw-black mb-2" style={{ fontSize: 'var(--font-l)' }}>
                    {lang === 'ar' ? '💡 نصيحة اليوم' : '💡 Daily Tip'}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-s)', lineHeight: '1.7', margin: 0 }}>
                    {lang === 'ar'
                      ? 'تعلّم شيئاً جديداً كل يوم، حتى لو كان صغيراً. الاتساق أهم من الكمية.'
                      : 'Learn something new every day, even if small. Consistency beats intensity.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default Profile;