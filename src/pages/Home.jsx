import { useLang } from '../context/LanguageContext';

function Home() {
  const { t } = useLang();

  return (
    <div className="container py-5">

      {/* ── Hero ─────────────────────────── */}
      <div className="row align-items-center g-5 mb-5">

        {/* Text */}
        <div className="col-lg-6">
          <span className="badge badge-primary mb-3 p-2">
            {t('hero_badge')}
          </span>

          <h1 className="fw-black mb-3" style={{ fontSize: 'clamp(28px, 4vw, 42px)', lineHeight: '1.3' }}>
            {t('hero_title1')}
            <br />
            <span className="gradient-text">{t('hero_title2')}</span>
          </h1>

          <p className="mb-4" style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: 'var(--font-m)' }}>
            {t('hero_desc')}
          </p>

          <div className="d-flex flex-wrap gap-3 mb-5">
            <button className="btn-primary" style={{ fontSize: 'var(--font-m)', padding: '14px 28px' }}>
              {t('hero_btn1')}
            </button>
            <button className="btn-secondary" style={{ fontSize: 'var(--font-m)', padding: '14px 28px' }}>
              {t('hero_btn2')}
            </button>
          </div>

          {/* Stats */}
          <div className="d-flex gap-4 flex-wrap">
            {[
              { numKey: 'stat1_num', labelKey: 'stat1_label' },
              { numKey: 'stat2_num', labelKey: 'stat2_label' },
              { numKey: 'stat3_num', labelKey: 'stat3_label' },
            ].map((stat) => (
              <div key={stat.labelKey}>
                <div className="gradient-text fw-black" style={{ fontSize: 'var(--font-xl)' }}>
                  {t(stat.numKey)}
                </div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-hint)' }}>
                  {t(stat.labelKey)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="col-lg-6">
          <div className="row g-3">
            {[
              { icon: '💻', titleKey: 'card1_title', descKey: 'card1_desc' },
              { icon: '🤖', titleKey: 'card2_title', descKey: 'card2_desc' },
              { icon: '🏆', titleKey: 'card3_title', descKey: 'card3_desc' },
              { icon: '📜', titleKey: 'card4_title', descKey: 'card4_desc' },
            ].map((card) => (
              <div className="col-6" key={card.titleKey}>
                <div className="card h-100 p-3" style={{ cursor: 'pointer' }}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>{card.icon}</div>
                  <div className="fw-bold mb-1" style={{ fontSize: 'var(--font-m)' }}>
                    {t(card.titleKey)}
                  </div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-hint)' }}>
                    {t(card.descKey)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Learning Paths ───────────────── */}
      <div>
        <h2 className="fw-black mb-2" style={{ fontSize: 'var(--font-xl)' }}>
          {t('paths_title')}
        </h2>
        <p className="mb-4" style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-m)' }}>
          {t('paths_desc')}
        </p>

        <div className="row g-4">
          {[
            { icon: '🌐', title: 'Full Stack',   level: 'Advanced', weeksKey: '19', color: 'var(--orange)', bg: 'rgba(232, 130, 74, 0.08)'  },
            { icon: '📊', title: 'Data Science', level: 'Advanced', weeksKey: '15', color: 'var(--green)',  bg: 'rgba(46, 204, 154, 0.08)'  },
            { icon: '📱', title: 'Mobile App',   level: 'Advanced', weeksKey: '20', color: 'var(--blue)',   bg: 'rgba(74, 144, 217, 0.08)'  },
          ].map((path) => (
            <div className="col-lg-4 col-md-6" key={path.title}>
              <div
                className="card h-100 p-4"
                style={{ background: path.bg, border: `1px solid ${path.color}30`, cursor: 'pointer' }}
              >
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>{path.icon}</div>
                <h3 className="fw-black mb-2" style={{ fontSize: 'var(--font-l)' }}>
                  {path.title}
                </h3>
                <div className="d-flex gap-2 mb-4">
                  <span className="badge" style={{ background: `${path.color}15`, color: path.color, padding: '6px 10px' }}>
                    {path.level}
                  </span>
                  <span className="badge badge-primary" style={{ padding: '6px 10px' }}>
                    {path.weeksKey} {t('weeks')}
                  </span>
                </div>
                <button
                  className="btn-primary mt-auto w-100"
                  style={{ background: `linear-gradient(135deg, ${path.color}, ${path.color}BB)`, padding: '10px' }}
                >
                  {t('paths_btn')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;