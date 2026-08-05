import { useState } from 'react';
import { useLang } from '../context/LanguageContext';

const lessonsData = {
  ar: [
    // Web
    { id: 1, category: 'web',    level: 'beginner',     icon: '🌐', title: 'أساسيات HTML',        desc: 'تعلم بنية صفحات الويب من الصفر',         weeks: 2,  lessons: 12 },
    { id: 2, category: 'web',    level: 'beginner',     icon: '🎨', title: 'تصميم CSS',            desc: 'تصميم صفحات جذابة باستخدام CSS',          weeks: 3,  lessons: 15 },
    { id: 3, category: 'web',    level: 'intermediate', icon: '⚡', title: 'JavaScript',           desc: 'البرمجة التفاعلية للويب',                  weeks: 4,  lessons: 20 },
    { id: 4, category: 'web',    level: 'advanced',     icon: '⚛️', title: 'React.js المتقدم',     desc: 'بناء تطبيقات ويب احترافية',               weeks: 5,  lessons: 25 },
    // Python
    { id: 5, category: 'python', level: 'beginner',     icon: '🐍', title: 'Python للمبتدئين',    desc: 'أساسيات البرمجة بلغة Python',             weeks: 3,  lessons: 18 },
    { id: 6, category: 'python', level: 'intermediate', icon: '📊', title: 'Data Science',        desc: 'تحليل البيانات مع Pandas و NumPy',         weeks: 4,  lessons: 22 },
    { id: 7, category: 'python', level: 'advanced',     icon: '🤖', title: 'الذكاء الاصطناعي',    desc: 'بناء نماذج ML مع TensorFlow',             weeks: 6,  lessons: 30 },
    // Mobile
    { id: 8, category: 'mobile', level: 'intermediate', icon: '📱', title: 'Flutter',             desc: 'تطبيقات موبايل احترافية بلغة Dart',        weeks: 5,  lessons: 24 },
    { id: 9, category: 'mobile', level: 'advanced',     icon: '🍎', title: 'Swift iOS',           desc: 'تطوير تطبيقات iPhone',                    weeks: 6,  lessons: 28 },
  ],
  en: [
    { id: 1, category: 'web',    level: 'beginner',     icon: '🌐', title: 'HTML Basics',          desc: 'Learn web page structure from scratch',    weeks: 2,  lessons: 12 },
    { id: 2, category: 'web',    level: 'beginner',     icon: '🎨', title: 'CSS Design',           desc: 'Design beautiful pages with CSS',          weeks: 3,  lessons: 15 },
    { id: 3, category: 'web',    level: 'intermediate', icon: '⚡', title: 'JavaScript',           desc: 'Interactive web programming',              weeks: 4,  lessons: 20 },
    { id: 4, category: 'web',    level: 'advanced',     icon: '⚛️', title: 'Advanced React.js',    desc: 'Build professional web apps',             weeks: 5,  lessons: 25 },
    { id: 5, category: 'python', level: 'beginner',     icon: '🐍', title: 'Python for Beginners', desc: 'Programming basics with Python',          weeks: 3,  lessons: 18 },
    { id: 6, category: 'python', level: 'intermediate', icon: '📊', title: 'Data Science',         desc: 'Data analysis with Pandas & NumPy',       weeks: 4,  lessons: 22 },
    { id: 7, category: 'python', level: 'advanced',     icon: '🤖', title: 'Artificial Intelligence', desc: 'Build ML models with TensorFlow',      weeks: 6,  lessons: 30 },
    { id: 8, category: 'mobile', level: 'intermediate', icon: '📱', title: 'Flutter',              desc: 'Professional mobile apps with Dart',      weeks: 5,  lessons: 24 },
    { id: 9, category: 'mobile', level: 'advanced',     icon: '🍎', title: 'Swift iOS',            desc: 'Develop iPhone applications',             weeks: 6,  lessons: 28 },
  ],
};

const levelColors = {
  beginner:     { color: 'var(--green)',  bg: 'rgba(46, 204, 154, 0.10)',  label_ar: 'مبتدئ',    label_en: 'Beginner'     },
  intermediate: { color: 'var(--orange)', bg: 'rgba(232, 130, 74, 0.10)', label_ar: 'متوسط',    label_en: 'Intermediate' },
  advanced:     { color: 'var(--blue)',   bg: 'rgba(74, 144, 217, 0.10)', label_ar: 'متقدم',    label_en: 'Advanced'     },
};

const categoryColors = {
  web:    { color: 'var(--orange)', bg: 'rgba(232, 130, 74, 0.08)'  },
  python: { color: 'var(--green)',  bg: 'rgba(46, 204, 154, 0.08)'  },
  mobile: { color: 'var(--blue)',   bg: 'rgba(74, 144, 217, 0.08)'  },
};

function Lessons() {
  const { lang } = useLang();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeLevel,    setActiveLevel]    = useState('all');

  const lessons = lessonsData[lang];

  const categories = [
    { key: 'all',    label_ar: 'الكل',    label_en: 'All',    icon: '📚' },
    { key: 'web',    label_ar: 'الويب',   label_en: 'Web',    icon: '🌐' },
    { key: 'python', label_ar: 'Python',  label_en: 'Python', icon: '🐍' },
    { key: 'mobile', label_ar: 'موبايل',  label_en: 'Mobile', icon: '📱' },
  ];

  const levels = [
    { key: 'all',          label_ar: 'كل المستويات', label_en: 'All Levels'   },
    { key: 'beginner',     label_ar: 'مبتدئ',         label_en: 'Beginner'     },
    { key: 'intermediate', label_ar: 'متوسط',         label_en: 'Intermediate' },
    { key: 'advanced',     label_ar: 'متقدم',         label_en: 'Advanced'     },
  ];

  const filtered = lessons.filter((l) => {
    const catMatch   = activeCategory === 'all' || l.category === activeCategory;
    const levelMatch = activeLevel    === 'all' || l.level    === activeLevel;
    return catMatch && levelMatch;
  });

  return (
    <div className="container py-5">

      {/* ── Header ───────────────────────── */}
      <div className="mb-5">
        <h1 className="fw-black mb-2" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
          {lang === 'ar' ? '📚 مكتبة الدروس' : '📚 Lessons Library'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-m)' }}>
          {lang === 'ar'
            ? 'اختر المسار والمستوى المناسب لك'
            : 'Choose the right path and level for you'}
        </p>
      </div>

      {/* ── Category filter ──────────────── */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-xl)',
              border: `1px solid ${activeCategory === cat.key ? 'var(--primary)' : 'var(--divider)'}`,
              background: activeCategory === cat.key ? 'rgba(232, 130, 74, 0.12)' : 'var(--bg-card)',
              color: activeCategory === cat.key ? 'var(--primary)' : 'var(--text-secondary)',
              fontWeight: activeCategory === cat.key ? '700' : '500',
              fontSize: 'var(--font-s)',
              fontFamily: 'Cairo, sans-serif',
              cursor: 'pointer',
              transition: 'var(--transition)',
            }}
          >
            {cat.icon} {lang === 'ar' ? cat.label_ar : cat.label_en}
          </button>
        ))}
      </div>

      {/* ── Level filter ─────────────────── */}
      <div className="d-flex flex-wrap gap-2 mb-5">
        {levels.map((lvl) => {
          const lc = levelColors[lvl.key];
          const isActive = activeLevel === lvl.key;
          return (
            <button
              key={lvl.key}
              onClick={() => setActiveLevel(lvl.key)}
              style={{
                padding: '6px 16px',
                borderRadius: 'var(--radius-xl)',
                border: `1px solid ${isActive && lc ? lc.color : 'var(--divider)'}`,
                background: isActive && lc ? lc.bg : 'var(--bg-card)',
                color: isActive && lc ? lc.color : 'var(--text-hint)',
                fontWeight: isActive ? '700' : '500',
                fontSize: 'var(--font-xs)',
                fontFamily: 'Cairo, sans-serif',
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
            >
              {lang === 'ar' ? lvl.label_ar : lvl.label_en}
            </button>
          );
        })}
      </div>

      {/* ── Results count ────────────────── */}
      <p className="mb-4" style={{ color: 'var(--text-hint)', fontSize: 'var(--font-s)' }}>
        {lang === 'ar' ? `${filtered.length} درس` : `${filtered.length} lessons`}
      </p>

      {/* ── Lessons grid ─────────────────── */}
      <div className="row g-4">
        {filtered.map((lesson) => {
          const lc = levelColors[lesson.level];
          const cc = categoryColors[lesson.category];
          return (
            <div className="col-lg-4 col-md-6" key={lesson.id}>
              <div
                className="card h-100 p-4"
                style={{ background: cc.bg, border: `1px solid ${cc.color}25`, cursor: 'pointer' }}
              >
                {/* Icon + Level */}
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <span style={{ fontSize: '36px' }}>{lesson.icon}</span>
                  <span
                    className="badge"
                    style={{ background: lc.bg, color: lc.color, padding: '6px 12px', fontSize: 'var(--font-xs)' }}
                  >
                    {lang === 'ar' ? lc.label_ar : lc.label_en}
                  </span>
                </div>

                {/* Title + Desc */}
                <h3 className="fw-black mb-2" style={{ fontSize: 'var(--font-l)' }}>
                  {lesson.title}
                </h3>
                <p className="mb-4" style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-s)', lineHeight: '1.6' }}>
                  {lesson.desc}
                </p>

                {/* Meta */}
                <div className="d-flex gap-3 mb-4" style={{ color: 'var(--text-hint)', fontSize: 'var(--font-xs)' }}>
                  <span>⏱ {lesson.weeks} {lang === 'ar' ? 'أسابيع' : 'weeks'}</span>
                  <span>📖 {lesson.lessons} {lang === 'ar' ? 'درس' : 'lessons'}</span>
                </div>

                {/* Button */}
                <button
                  className="btn-primary mt-auto w-100"
                  style={{ background: `linear-gradient(135deg, ${cc.color}, ${cc.color}BB)`, padding: '10px' }}
                >
                  {lang === 'ar' ? 'ابدأ الدرس ←' : 'Start Lesson →'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default Lessons;