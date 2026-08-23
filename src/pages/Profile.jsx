import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';

function Profile() {
  const { lang }       = useLang();
  const navigate       = useNavigate();
  const { user, logout } = useAuth();
  const { profile }    = useUser();

  // لو ما مسجّل دخول
  if (!user) {
    return (
      <div className="container py-5 text-center">
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>👤</div>
        <h2 className="fw-black mb-3">
          {lang === 'ar' ? 'سجّل دخولك أولاً' : 'Sign In First'}
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          {lang === 'ar' ? 'لعرض ملفك الشخصي وتقدمك' : 'To view your profile and progress'}
        </p>
        <button className="btn-primary" onClick={() => navigate('/auth')} style={{ padding: '12px 32px' }}>
          {lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
        </button>
      </div>
    );
  }

  const completedLessons    = profile?.completedLessons?.length    || 0;
  const completedChallenges = profile?.completedChallenges?.length || 0;
  const points              = profile?.points || 0;

  return (
    <div className="container py-5">

      {/* ── Header ───────────────────────── */}
      <div className="mb-5">
        <h1 className="fw-black mb-2" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
          {lang === 'ar' ? '👤 ملفي الشخصي' : '👤 My Profile'}
        </h1>
      </div>

      <div className="row g-4">

        {/* ── Left: Profile card ───────────── */}
        <div className="col-lg-4">
          <div className="card p-4 text-center">

            {/* Avatar */}
            <div style={{
              width: '80px', height: '80px',
              borderRadius: '50%',
              background: 'var(--gradient-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '36px', color: 'white', fontWeight: '900',
              margin: '0 auto 16px',
            }}>
              {user.displayName?.[0] || user.email?.[0] || '؟'}
            </div>

            <h2 className="fw-black mb-1" style={{ fontSize: 'var(--font-xl)' }}>
              {user.displayName || lang === 'ar' ? 'مستخدم' : 'User'}
            </h2>
            <p style={{ color: 'var(--text-hint)', fontSize: 'var(--font-s)', marginBottom: '20px' }}>
              {user.email}
            </p>

            {/* Points badge */}
            <div style={{
              background: 'rgba(232, 130, 74, 0.10)',
              border: '1px solid rgba(232, 130, 74, 0.3)',
              borderRadius: 'var(--radius-xl)',
              padding: '10px 20px',
              marginBottom: '20px',
            }}>
              <div className="gradient-text fw-black" style={{ fontSize: 'var(--font-xxl)' }}>
                ⭐ {points}
              </div>
              <div style={{ color: 'var(--text-hint)', fontSize: 'var(--font-xs)' }}>
                {lang === 'ar' ? 'نقطة مكتسبة' : 'Points Earned'}
              </div>
            </div>

            <button
              onClick={async () => { await logout(); navigate('/'); }}
              style={{
                width: '100%', padding: '10px',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                background: 'rgba(239, 68, 68, 0.08)',
                color: 'var(--red)',
                fontWeight: '700', fontSize: 'var(--font-s)',
                fontFamily: 'Cairo, sans-serif',
                cursor: 'pointer',
              }}
            >
              {lang === 'ar' ? '🚪 تسجيل الخروج' : '🚪 Sign Out'}
            </button>
          </div>
        </div>

        {/* ── Right: Stats + Progress ──────── */}
        <div className="col-lg-8 d-flex flex-column gap-4">

          {/* Stats */}
          <div className="row g-3">
            {[
              { icon: '📚', value: completedLessons,    label: lang === 'ar' ? 'درس مكتمل'   : 'Lessons Done',     color: 'var(--blue)'   },
              { icon: '🏆', value: completedChallenges, label: lang === 'ar' ? 'تحدي محلول'  : 'Challenges Solved', color: 'var(--orange)' },
              { icon: '🔥', value: profile?.streak || 0, label: lang === 'ar' ? 'يوم متتالي' : 'Day Streak',        color: 'var(--red)'    },
              { icon: '⭐', value: points,              label: lang === 'ar' ? 'نقطة'         : 'Points',            color: 'var(--green)'  },
            ].map((stat) => (
              <div className="col-6 col-md-3" key={stat.label}>
                <div className="card p-3 text-center">
                  <div style={{ fontSize: '24px', marginBottom: '4px' }}>{stat.icon}</div>
                  <div className="fw-black" style={{ fontSize: 'var(--font-xl)', color: stat.color }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-hint)' }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="card p-4">
            <h3 className="fw-black mb-4" style={{ fontSize: 'var(--font-l)' }}>
              {lang === 'ar' ? '📊 تقدمك' : '📊 Your Progress'}
            </h3>

            {/* Lessons progress */}
            <div className="mb-4">
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-bold" style={{ fontSize: 'var(--font-s)' }}>
                  📚 {lang === 'ar' ? 'الدروس' : 'Lessons'}
                </span>
                <span style={{ color: 'var(--primary)', fontWeight: '700', fontSize: 'var(--font-s)' }}>
                  {completedLessons} / 9
                </span>
              </div>
              <div style={{ height: '8px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(completedLessons / 9) * 100}%`,
                  background: 'var(--gradient-primary)',
                  borderRadius: 'var(--radius-xl)',
                  transition: 'width 0.5s ease',
                }} />
              </div>
            </div>

            {/* Challenges progress */}
            <div className="mb-4">
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-bold" style={{ fontSize: 'var(--font-s)' }}>
                  🏆 {lang === 'ar' ? 'التحديات' : 'Challenges'}
                </span>
                <span style={{ color: 'var(--orange)', fontWeight: '700', fontSize: 'var(--font-s)' }}>
                  {completedChallenges} / 6
                </span>
              </div>
              <div style={{ height: '8px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${(completedChallenges / 6) * 100}%`,
                  background: 'linear-gradient(135deg, var(--orange), #CC5500)',
                  borderRadius: 'var(--radius-xl)',
                  transition: 'width 0.5s ease',
                }} />
              </div>
            </div>

            {/* Points progress */}
            <div>
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-bold" style={{ fontSize: 'var(--font-s)' }}>
                  ⭐ {lang === 'ar' ? 'النقاط' : 'Points'}
                </span>
                <span style={{ color: 'var(--green)', fontWeight: '700', fontSize: 'var(--font-s)' }}>
                  {points} / 500
                </span>
              </div>
              <div style={{ height: '8px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${Math.min((points / 500) * 100, 100)}%`,
                  background: 'linear-gradient(135deg, var(--green), #0D7A37)',
                  borderRadius: 'var(--radius-xl)',
                  transition: 'width 0.5s ease',
                }} />
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="card p-4">
            <h3 className="fw-black mb-4" style={{ fontSize: 'var(--font-l)' }}>
              {lang === 'ar' ? '🏅 الإنجازات' : '🏅 Achievements'}
            </h3>
            <div className="row g-3">
              {[
                { icon: '🎯', label: lang === 'ar' ? 'أول درس'      : 'First Lesson',     unlocked: completedLessons    >= 1 },
                { icon: '📚', label: lang === 'ar' ? '5 دروس'       : '5 Lessons',        unlocked: completedLessons    >= 5 },
                { icon: '🏆', label: lang === 'ar' ? 'أول تحدي'     : 'First Challenge',  unlocked: completedChallenges >= 1 },
                { icon: '⚡', label: lang === 'ar' ? '3 تحديات'     : '3 Challenges',     unlocked: completedChallenges >= 3 },
                { icon: '⭐', label: lang === 'ar' ? '100 نقطة'     : '100 Points',       unlocked: points              >= 100 },
                { icon: '🚀', label: lang === 'ar' ? '500 نقطة'     : '500 Points',       unlocked: points              >= 500 },
              ].map((ach) => (
                <div className="col-6 col-md-4" key={ach.label}>
                  <div
                    className="card p-3 text-center"
                    style={{
                      opacity: ach.unlocked ? 1 : 0.4,
                      border: ach.unlocked ? '1px solid rgba(232, 130, 74, 0.3)' : '1px solid var(--divider)',
                      background: ach.unlocked ? 'rgba(232, 130, 74, 0.06)' : 'var(--bg-card)',
                    }}
                  >
                    <div style={{ fontSize: '28px', marginBottom: '4px' }}>
                      {ach.unlocked ? ach.icon : '🔒'}
                    </div>
                    <div style={{ fontSize: 'var(--font-xs)', fontWeight: '600', color: ach.unlocked ? 'var(--text-primary)' : 'var(--text-hint)' }}>
                      {ach.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;