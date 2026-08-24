import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';

function Dashboard() {
  const { lang }     = useLang();
  const navigate     = useNavigate();
  const { user }     = useAuth();
  const { profile }  = useUser();

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>📊</div>
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
  const hour                = new Date().getHours();
  const greeting            = lang === 'ar'
    ? hour < 12 ? 'صباح الخير' : hour < 17 ? 'مساء الخير' : 'مساء النور'
    : hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="container py-5">

      {/* ── Header ───────────────────────── */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-5 gap-3">
        <div>
          <p style={{ color: 'var(--text-hint)', fontSize: 'var(--font-s)', marginBottom: '4px' }}>
            {greeting} 👋
          </p>
          <h1 className="fw-black mb-0" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
            {user.displayName || user.email?.split('@')[0]}
          </h1>
        </div>
        <div style={{
          padding: '10px 20px',
          borderRadius: 'var(--radius-xl)',
          background: 'rgba(232, 130, 74, 0.10)',
          border: '1px solid rgba(232, 130, 74, 0.3)',
        }}>
          <span className="gradient-text fw-black" style={{ fontSize: 'var(--font-l)' }}>
            ⭐ {points} {lang === 'ar' ? 'نقطة' : 'pts'}
          </span>
        </div>
      </div>

      {/* ── Stats ────────────────────────── */}
      <div className="row g-3 mb-5">
        {[
          { icon: '📚', value: completedLessons,    total: 9,  label: lang === 'ar' ? 'دروس مكتملة'   : 'Lessons Done',     color: 'var(--blue)',   bg: 'rgba(74, 144, 217, 0.08)'   },
          { icon: '🏆', value: completedChallenges, total: 6,  label: lang === 'ar' ? 'تحديات محلولة' : 'Challenges Solved', color: 'var(--orange)', bg: 'rgba(232, 130, 74, 0.08)'  },
          { icon: '🔥', value: profile?.streak || 0, total: null, label: lang === 'ar' ? 'أيام متتالية' : 'Day Streak',      color: 'var(--red)',    bg: 'rgba(239, 68, 68, 0.08)'    },
          { icon: '⭐', value: points,               total: 500, label: lang === 'ar' ? 'نقطة'         : 'Points',           color: 'var(--green)',  bg: 'rgba(46, 204, 154, 0.08)'   },
        ].map((stat) => (
          <div className="col-6 col-md-3" key={stat.label}>
            <div className="card p-4" style={{ background: stat.bg, border: `1px solid ${stat.color}25` }}>
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{stat.icon}</div>
              <div className="fw-black" style={{ fontSize: 'var(--font-xxl)', color: stat.color }}>
                {stat.value}
              </div>
              {stat.total && (
                <div style={{ color: 'var(--text-hint)', fontSize: 'var(--font-xs)' }}>
                  / {stat.total}
                </div>
              )}
              <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">

        {/* ── Left ─────────────────────────── */}
        <div className="col-lg-8 d-flex flex-column gap-4">

          {/* Progress bars */}
          <div className="card p-4">
            <h3 className="fw-black mb-4" style={{ fontSize: 'var(--font-l)' }}>
              {lang === 'ar' ? '📈 تقدمك الكلي' : '📈 Overall Progress'}
            </h3>
            {[
              { label: lang === 'ar' ? 'الدروس'    : 'Lessons',    value: completedLessons,    total: 9,   color: 'var(--blue)'   },
              { label: lang === 'ar' ? 'التحديات'  : 'Challenges', value: completedChallenges, total: 6,   color: 'var(--orange)' },
              { label: lang === 'ar' ? 'النقاط'    : 'Points',     value: points,              total: 500, color: 'var(--green)'  },
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
                    height: '100%',
                    width: `${Math.min((bar.value / bar.total) * 100, 100)}%`,
                    background: bar.color,
                    borderRadius: 'var(--radius-xl)',
                    transition: 'width 0.5s ease',
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
                { icon: '📚', label: lang === 'ar' ? 'متابعة التعلم'  : 'Continue Learning', path: '/lessons',    color: 'var(--blue)'   },
                { icon: '🏆', label: lang === 'ar' ? 'حل تحدي'        : 'Solve Challenge',   path: '/challenges', color: 'var(--orange)' },
                { icon: '🤖', label: lang === 'ar' ? 'اسأل AI'        : 'Ask AI',            path: '/ai',         color: 'var(--purple)' },
                { icon: '👥', label: lang === 'ar' ? 'المجتمع'        : 'Community',         path: '/community',  color: 'var(--green)'  },
              ].map((action) => (
                <div className="col-6" key={action.label}>
                  <div
                    className="card p-3 text-center"
                    onClick={() => navigate(action.path)}
                    style={{
                      cursor: 'pointer',
                      border: `1px solid ${action.color}25`,
                      background: `${action.color}08`,
                      transition: 'var(--transition)',
                    }}
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

        {/* ── Right ────────────────────────── */}
        <div className="col-lg-4 d-flex flex-column gap-4">

          {/* Achievements */}
          <div className="card p-4">
            <h3 className="fw-black mb-3" style={{ fontSize: 'var(--font-l)' }}>
              {lang === 'ar' ? '🏅 الإنجازات' : '🏅 Achievements'}
            </h3>
            <div className="d-flex flex-column gap-2">
              {[
                { icon: '🎯', label: lang === 'ar' ? 'أول درس'  : 'First Lesson',    unlocked: completedLessons    >= 1 },
                { icon: '🏆', label: lang === 'ar' ? 'أول تحدي' : 'First Challenge', unlocked: completedChallenges >= 1 },
                { icon: '⭐', label: lang === 'ar' ? '100 نقطة' : '100 Points',      unlocked: points              >= 100 },
                { icon: '🚀', label: lang === 'ar' ? '500 نقطة' : '500 Points',      unlocked: points              >= 500 },
              ].map((ach) => (
                <div
                  key={ach.label}
                  className="d-flex align-items-center gap-3 p-2"
                  style={{
                    borderRadius: 'var(--radius-m)',
                    background: ach.unlocked ? 'rgba(232, 130, 74, 0.08)' : 'transparent',
                    opacity: ach.unlocked ? 1 : 0.4,
                  }}
                >
                  <span style={{ fontSize: '24px' }}>{ach.unlocked ? ach.icon : '🔒'}</span>
                  <span style={{ fontSize: 'var(--font-s)', fontWeight: ach.unlocked ? '700' : '400' }}>
                    {ach.label}
                  </span>
                  {ach.unlocked && (
                    <span style={{ marginRight: 'auto', color: 'var(--green)', fontSize: 'var(--font-xs)' }}>✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Daily tip */}
          <div className="card p-4" style={{ background: 'rgba(99, 102, 241, 0.06)', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
            <h3 className="fw-black mb-2" style={{ fontSize: 'var(--font-l)' }}>
              {lang === 'ar' ? '💡 نصيحة اليوم' : '💡 Daily Tip'}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-s)', lineHeight: '1.7', margin: 0 }}>
              {lang === 'ar'
                ? 'تعلّم شيئاً جديداً كل يوم، حتى لو كان صغيراً. الاتساق أهم من الكمية.'
                : 'Learn something new every day, even if small. Consistency is more important than quantity.'}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;