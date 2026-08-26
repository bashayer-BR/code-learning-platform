import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';

function Certificates() {
  const { lang }    = useLang();
  const navigate    = useNavigate();
  const { user }    = useAuth();
  const { profile } = useUser();

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>📜</div>
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
    {
      id: 1,
      icon: '🌐',
      title:     lang === 'ar' ? 'أساسيات الويب'        : 'Web Fundamentals',
      desc:      lang === 'ar' ? 'إتمام دروس HTML و CSS' : 'Complete HTML & CSS lessons',
      unlocked:  completedLessons >= 2,
      condition: lang === 'ar' ? 'أكمل درسين على الأقل'  : 'Complete at least 2 lessons',
      color:     'var(--orange)',
      bg:        'rgba(232, 130, 74, 0.08)',
      date:      completedLessons >= 2 ? new Date().toLocaleDateString() : null,
    },
    {
      id: 2,
      icon: '🏆',
      title:     lang === 'ar' ? 'محترف التحديات'           : 'Challenges Pro',
      desc:      lang === 'ar' ? 'حل 3 تحديات برمجية'       : 'Solve 3 coding challenges',
      unlocked:  completedChallenges >= 3,
      condition: lang === 'ar' ? 'حل 3 تحديات على الأقل'   : 'Solve at least 3 challenges',
      color:     'var(--blue)',
      bg:        'rgba(74, 144, 217, 0.08)',
      date:      completedChallenges >= 3 ? new Date().toLocaleDateString() : null,
    },
    {
      id: 3,
      icon: '⭐',
      title:     lang === 'ar' ? 'جامع النقاط'        : 'Points Collector',
      desc:      lang === 'ar' ? 'جمع 100 نقطة'       : 'Earn 100 points',
      unlocked:  points >= 100,
      condition: lang === 'ar' ? 'اجمع 100 نقطة'      : 'Earn 100 points',
      color:     'var(--green)',
      bg:        'rgba(46, 204, 154, 0.08)',
      date:      points >= 100 ? new Date().toLocaleDateString() : null,
    },
    {
      id: 4,
      icon: '🚀',
      title:     lang === 'ar' ? 'المبرمج المتميز'     : 'Elite Developer',
      desc:      lang === 'ar' ? 'جمع 500 نقطة'        : 'Earn 500 points',
      unlocked:  points >= 500,
      condition: lang === 'ar' ? 'اجمع 500 نقطة'       : 'Earn 500 points',
      color:     'var(--purple)',
      bg:        'rgba(155, 111, 212, 0.08)',
      date:      points >= 500 ? new Date().toLocaleDateString() : null,
    },
    {
      id: 5,
      icon: '📚',
      title:     lang === 'ar' ? 'متعلم نشيط'          : 'Active Learner',
      desc:      lang === 'ar' ? 'إتمام 5 دروس'        : 'Complete 5 lessons',
      unlocked:  completedLessons >= 5,
      condition: lang === 'ar' ? 'أكمل 5 دروس'         : 'Complete 5 lessons',
      color:     'var(--orange)',
      bg:        'rgba(232, 130, 74, 0.08)',
      date:      completedLessons >= 5 ? new Date().toLocaleDateString() : null,
    },
    {
      id: 6,
      icon: '👑',
      title:     lang === 'ar' ? 'خبير البرمجة'         : 'Programming Expert',
      desc:      lang === 'ar' ? 'إتمام كل الدروس والتحديات' : 'Complete all lessons and challenges',
      unlocked:  completedLessons >= 9 && completedChallenges >= 6,
      condition: lang === 'ar' ? 'أكمل كل الدروس والتحديات'  : 'Complete all lessons & challenges',
      color:     'var(--yellow)',
      bg:        'rgba(245, 200, 66, 0.08)',
      date:      completedLessons >= 9 && completedChallenges >= 6 ? new Date().toLocaleDateString() : null,
    },
  ];

  const unlockedCount = certificates.filter((c) => c.unlocked).length;

  return (
    <div className="container py-5">

      {/* ── Header ───────────────────────── */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-5 gap-3">
        <div>
          <h1 className="fw-black mb-2" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
            {lang === 'ar' ? '📜 شهاداتي' : '📜 My Certificates'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-m)' }}>
            {lang === 'ar' ? 'أثبت كفاءتك واحصل على شهاداتك' : 'Prove your skills and earn certificates'}
          </p>
        </div>
        <div style={{
          padding: '10px 20px',
          borderRadius: 'var(--radius-xl)',
          background: 'rgba(232, 130, 74, 0.10)',
          border: '1px solid rgba(232, 130, 74, 0.3)',
        }}>
          <span className="gradient-text fw-black" style={{ fontSize: 'var(--font-l)' }}>
            {unlockedCount} / {certificates.length} {lang === 'ar' ? 'شهادة' : 'Certificates'}
          </span>
        </div>
      </div>

      {/* ── Progress ─────────────────────── */}
      <div className="card p-4 mb-5">
        <div className="d-flex justify-content-between mb-2">
          <span className="fw-bold" style={{ fontSize: 'var(--font-m)' }}>
            {lang === 'ar' ? 'تقدمك نحو الشهادات' : 'Progress Toward Certificates'}
          </span>
          <span className="gradient-text fw-black" style={{ fontSize: 'var(--font-m)' }}>
            {Math.round((unlockedCount / certificates.length) * 100)}%
          </span>
        </div>
        <div style={{ height: '10px', background: 'var(--bg-surface)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${(unlockedCount / certificates.length) * 100}%`,
            background: 'var(--gradient-primary)',
            borderRadius: 'var(--radius-xl)',
            transition: 'width 0.5s ease',
          }} />
        </div>
      </div>

      {/* ── Certificates grid ─────────────── */}
      <div className="row g-4">
        {certificates.map((cert) => (
          <div className="col-lg-4 col-md-6" key={cert.id}>
            <div
              className="card h-100 p-4"
              style={{
                background: cert.unlocked ? cert.bg : 'var(--bg-card)',
                border: `2px solid ${cert.unlocked ? cert.color : 'var(--divider)'}`,
                opacity: cert.unlocked ? 1 : 0.6,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Unlocked ribbon */}
              {cert.unlocked && (
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: lang === 'ar' ? '16px' : 'auto',
                  right: lang === 'ar' ? 'auto' : '16px',
                  background: cert.color,
                  color: 'white',
                  fontSize: 'var(--font-xs)',
                  fontWeight: '700',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-xl)',
                }}>
                  {lang === 'ar' ? '✅ مكتسبة' : '✅ Earned'}
                </div>
              )}

              {/* Icon */}
              <div style={{
                fontSize: '52px',
                marginBottom: '16px',
                filter: cert.unlocked ? 'none' : 'grayscale(1)',
              }}>
                {cert.unlocked ? cert.icon : '🔒'}
              </div>

              {/* Title + Desc */}
              <h3 className="fw-black mb-2" style={{ fontSize: 'var(--font-l)', color: cert.unlocked ? cert.color : 'var(--text-hint)' }}>
                {cert.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-s)', lineHeight: '1.6', marginBottom: '16px' }}>
                {cert.desc}
              </p>

              {/* Condition */}
              <div style={{
                padding: '8px 12px',
                borderRadius: 'var(--radius-m)',
                background: cert.unlocked ? `${cert.color}15` : 'var(--bg-surface)',
                fontSize: 'var(--font-xs)',
                color: cert.unlocked ? cert.color : 'var(--text-hint)',
                marginBottom: '16px',
              }}>
                🎯 {cert.condition}
              </div>

              {/* Date or button */}
              {cert.unlocked ? (
                <div>
                  <p style={{ color: 'var(--text-hint)', fontSize: 'var(--font-xs)', marginBottom: '12px' }}>
                    📅 {lang === 'ar' ? 'تاريخ الاكتساب:' : 'Earned on:'} {cert.date}
                  </p>
                  <button
                    className="btn-primary w-100"
                    style={{ background: `linear-gradient(135deg, ${cert.color}, ${cert.color}BB)`, padding: '10px' }}
                    onClick={() => window.print()}
                  >
                    {lang === 'ar' ? '🖨️ طباعة الشهادة' : '🖨️ Print Certificate'}
                  </button>
                </div>
              ) : (
                <button
                  className="btn-secondary w-100"
                  style={{ padding: '10px' }}
                  onClick={() => navigate('/lessons')}
                >
                  {lang === 'ar' ? 'ابدأ التعلم ←' : 'Start Learning →'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Certificates;