import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

const challengesData = {
  ar: [
    { id: 1, icon: '⚡', title: 'عكس النص',           desc: 'اكتب دالة تعكس النص المدخل',                     level: 'easy',   category: 'javascript', time: 15, solved: 1240 },
    { id: 2, icon: '🔢', title: 'الأعداد الأولية',     desc: 'أوجد كل الأعداد الأولية أقل من 100',              level: 'easy',   category: 'python',     time: 20, solved: 980  },
    { id: 3, icon: '🌀', title: 'فيبوناتشي',           desc: 'أنشئ متتالية فيبوناتشي حتى رقم معين',             level: 'medium', category: 'javascript', time: 25, solved: 756  },
    { id: 4, icon: '🔍', title: 'البحث الثنائي',       desc: 'طبّق خوارزمية البحث الثنائي',                     level: 'medium', category: 'python',     time: 30, solved: 534  },
    { id: 5, icon: '🌳', title: 'شجرة البحث الثنائية', desc: 'أنشئ شجرة بحث ثنائية وطبّق عمليات الإدراج والحذف', level: 'hard',   category: 'javascript', time: 60, solved: 234  },
    { id: 6, icon: '🎯', title: 'مسألة الحقيبة',       desc: 'حل مسألة الحقيبة باستخدام البرمجة الديناميكية',   level: 'hard',   category: 'python',     time: 90, solved: 123  },
  ],
  en: [
    { id: 1, icon: '⚡', title: 'Reverse String',      desc: 'Write a function to reverse a string',              level: 'easy',   category: 'javascript', time: 15, solved: 1240 },
    { id: 2, icon: '🔢', title: 'Prime Numbers',       desc: 'Find all prime numbers less than 100',              level: 'easy',   category: 'python',     time: 20, solved: 980  },
    { id: 3, icon: '🌀', title: 'Fibonacci',           desc: 'Generate Fibonacci sequence up to a given number',  level: 'medium', category: 'javascript', time: 25, solved: 756  },
    { id: 4, icon: '🔍', title: 'Binary Search',       desc: 'Implement binary search algorithm',                 level: 'medium', category: 'python',     time: 30, solved: 534  },
    { id: 5, icon: '🌳', title: 'Binary Search Tree',  desc: 'Create a BST and implement insert/delete',          level: 'hard',   category: 'javascript', time: 60, solved: 234  },
    { id: 6, icon: '🎯', title: 'Knapsack Problem',    desc: 'Solve knapsack problem using dynamic programming',   level: 'hard',   category: 'python',     time: 90, solved: 123  },
  ],
};

const levelConfig = {
  easy:   { color: 'var(--green)',  bg: 'rgba(46, 204, 154, 0.10)',  label_ar: 'سهل',    label_en: 'Easy'   },
  medium: { color: 'var(--orange)', bg: 'rgba(232, 130, 74, 0.10)', label_ar: 'متوسط',  label_en: 'Medium' },
  hard:   { color: 'var(--blue)',   bg: 'rgba(74, 144, 217, 0.10)', label_ar: 'صعب',    label_en: 'Hard'   },
};

function Challenges() {
  const { lang }   = useLang();
  const navigate   = useNavigate();
  const [activeLevel,    setActiveLevel]    = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');

  const challenges = challengesData[lang];

  const levels = [
    { key: 'all',    label_ar: 'الكل',    label_en: 'All'    },
    { key: 'easy',   label_ar: 'سهل',     label_en: 'Easy'   },
    { key: 'medium', label_ar: 'متوسط',   label_en: 'Medium' },
    { key: 'hard',   label_ar: 'صعب',     label_en: 'Hard'   },
  ];

  const categories = [
    { key: 'all',        label_ar: 'الكل',       label_en: 'All',        icon: '📚' },
    { key: 'javascript', label_ar: 'JavaScript',  label_en: 'JavaScript', icon: '⚡' },
    { key: 'python',     label_ar: 'Python',      label_en: 'Python',     icon: '🐍' },
  ];

  const filtered = challenges.filter((c) => {
    const levelMatch    = activeLevel    === 'all' || c.level    === activeLevel;
    const categoryMatch = activeCategory === 'all' || c.category === activeCategory;
    return levelMatch && categoryMatch;
  });

  return (
    <div className="container py-5">

      {/* ── Header ───────────────────────── */}
      <div className="mb-5">
        <h1 className="fw-black mb-2" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
          {lang === 'ar' ? '🏆 التحديات البرمجية' : '🏆 Coding Challenges'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-m)' }}>
          {lang === 'ar' ? 'تحدَّ نفسك وحسّن مهاراتك يومياً' : 'Challenge yourself and improve your skills daily'}
        </p>
      </div>

      {/* ── Stats row ────────────────────── */}
      <div className="row g-3 mb-5">
        {[
          { icon: '✅', value: '3',    label: lang === 'ar' ? 'تحديات حُلّت'   : 'Solved'    },
          { icon: '🔥', value: '5',    label: lang === 'ar' ? 'أيام متتالية'   : 'Day Streak' },
          { icon: '⭐', value: '320',  label: lang === 'ar' ? 'نقطة مكتسبة'   : 'Points'    },
          { icon: '🏅', value: '#42',  label: lang === 'ar' ? 'ترتيبك العالمي' : 'Global Rank' },
        ].map((stat) => (
          <div className="col-6 col-md-3" key={stat.label}>
            <div className="card p-3 text-center">
              <div style={{ fontSize: '28px', marginBottom: '4px' }}>{stat.icon}</div>
              <div className="gradient-text fw-black" style={{ fontSize: 'var(--font-xl)' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-hint)' }}>
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filters ──────────────────────── */}
      <div className="d-flex flex-wrap gap-2 mb-3">
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

      <div className="d-flex flex-wrap gap-2 mb-5">
        {levels.map((lvl) => {
          const lc = levelConfig[lvl.key];
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

      {/* ── Challenges grid ──────────────── */}
      <div className="row g-4">
        {filtered.map((challenge) => {
          const lc = levelConfig[challenge.level];
          return (
            <div className="col-lg-4 col-md-6" key={challenge.id}>
              <div
                className="card h-100 p-4"
                style={{ cursor: 'pointer', border: `1px solid ${lc.color}25` }}
                onClick={() => navigate(`/editor`)}
              >
                {/* Icon + Level */}
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <span style={{ fontSize: '36px' }}>{challenge.icon}</span>
                  <span
                    className="badge"
                    style={{ background: lc.bg, color: lc.color, padding: '6px 12px', fontSize: 'var(--font-xs)' }}
                  >
                    {lang === 'ar' ? lc.label_ar : lc.label_en}
                  </span>
                </div>

                {/* Title + Desc */}
                <h3 className="fw-black mb-2" style={{ fontSize: 'var(--font-l)' }}>
                  {challenge.title}
                </h3>
                <p className="mb-4" style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-s)', lineHeight: '1.6' }}>
                  {challenge.desc}
                </p>

                {/* Meta */}
                <div className="d-flex justify-content-between mb-4" style={{ color: 'var(--text-hint)', fontSize: 'var(--font-xs)' }}>
                  <span>⏱ {challenge.time} {lang === 'ar' ? 'دقيقة' : 'min'}</span>
                  <span>👥 {challenge.solved} {lang === 'ar' ? 'حلّها' : 'solved'}</span>
                  <span>⚡ {challenge.category}</span>
                </div>

                {/* Button */}
                <button
                  className="btn-primary mt-auto w-100"
                  style={{ background: `linear-gradient(135deg, ${lc.color}, ${lc.color}BB)`, padding: '10px' }}
                >
                  {lang === 'ar' ? 'حل التحدي ←' : 'Solve Challenge →'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default Challenges;