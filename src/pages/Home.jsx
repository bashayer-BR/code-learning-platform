function Home() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)',
      padding: '60px 80px',
    }}>

      {/* ── Hero Section ─────────────────── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '60px',
        marginBottom: '80px',
      }}>

        {/* Left — Text */}
        <div style={{ flex: 1 }}>
          <span className="badge badge-primary" style={{ marginBottom: '16px' }}>
            🚀 منصة تعلم البرمجة #1
          </span>

          <h1 style={{
            fontSize: '42px',
            fontWeight: '900',
            lineHeight: '1.3',
            marginBottom: '16px',
            color: 'var(--text-primary)',
          }}>
            ابدأ رحلة الاحتراف
            <br />
            <span className="gradient-text">البرمجي من الصفر</span>
          </h1>

          <p style={{
            fontSize: 'var(--font-m)',
            color: 'var(--text-secondary)',
            lineHeight: '1.8',
            marginBottom: '32px',
            maxWidth: '420px',
          }}>
            بناء مستقبلك التقني خطوة بخطوة، مع مسارات تعلم مخصصة ومشاريع عملية حقيقية.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="btn-primary" style={{ fontSize: 'var(--font-m)', padding: '14px 32px' }}>
              جرّب المسار الاحترافي مجاناً ←
            </button>
            <button className="btn-secondary" style={{ fontSize: 'var(--font-m)', padding: '14px 32px' }}>
              استكشف التخصصات
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: '32px',
            marginTop: '40px',
          }}>
            {[
              { number: '+١٢K', label: 'مبرمج متعلم' },
              { number: '٨٥+',  label: 'مسار تعليمي' },
              { number: '٩٨٪',  label: 'نسبة الرضا' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{
                  fontSize: 'var(--font-xl)',
                  fontWeight: '900',
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: 'var(--font-xs)',
                  color: 'var(--text-hint)',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Cards */}
        <div style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
        }}>
          {[
            { icon: '💻', title: 'مسارات تفاعلية', desc: 'تعلم بالتطبيق الفعلي' },
            { icon: '🤖', title: 'محرر ذكي',        desc: 'كود + AI مساعد' },
            { icon: '🏆', title: 'تحديات يومية',    desc: 'حسّن مهاراتك يومياً' },
            { icon: '📜', title: 'شهادات معتمدة',   desc: 'أثبت كفاءتك للعالم' },
          ].map((card) => (
            <div
              key={card.title}
              className="card"
              style={{ padding: '20px', cursor: 'pointer' }}
            >
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>
                {card.icon}
              </div>
              <div style={{
                fontWeight: '700',
                fontSize: 'var(--font-m)',
                marginBottom: '4px',
                color: 'var(--text-primary)',
              }}>
                {card.title}
              </div>
              <div style={{
                fontSize: 'var(--font-xs)',
                color: 'var(--text-hint)',
              }}>
                {card.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Learning Paths ───────────────── */}
      <div>
        <h2 style={{
          fontSize: 'var(--font-xl)',
          fontWeight: '900',
          marginBottom: '8px',
        }}>
          اختر تخصصك المهني
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          marginBottom: '28px',
          fontSize: 'var(--font-m)',
        }}>
          مسارات مصممة بعناية لتوصلك لسوق العمل
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}>
          {[
            {
              icon: '🌐',
              title: 'Full Stack',
              level: 'Advanced',
              weeks: '19',
              color: 'var(--orange)',
              bg: 'rgba(232, 130, 74, 0.08)',
            },
            {
              icon: '📊',
              title: 'Data Science',
              level: 'Advanced',
              weeks: '15',
              color: 'var(--green)',
              bg: 'rgba(46, 204, 154, 0.08)',
            },
            {
              icon: '📱',
              title: 'Mobile App',
              level: 'Advanced',
              weeks: '20',
              color: 'var(--blue)',
              bg: 'rgba(74, 144, 217, 0.08)',
            },
          ].map((path) => (
            <div
              key={path.title}
              className="card"
              style={{
                padding: '24px',
                cursor: 'pointer',
                background: path.bg,
                border: `1px solid ${path.color}30`,
              }}
            >
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>
                {path.icon}
              </div>
              <h3 style={{
                fontSize: 'var(--font-l)',
                fontWeight: '800',
                marginBottom: '6px',
              }}>
                {path.title}
              </h3>
              <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '16px',
              }}>
                <span className="badge" style={{
                  background: `${path.color}15`,
                  color: path.color,
                }}>
                  {path.level}
                </span>
                <span className="badge badge-primary">
                  {path.weeks} أسابيع
                </span>
              </div>
              <button
                className="btn-primary"
                style={{
                  width: '100%',
                  background: `linear-gradient(135deg, ${path.color}, ${path.color}BB)`,
                  padding: '10px',
                }}
              >
                استكشف التخصص ←
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;