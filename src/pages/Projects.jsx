import { useState } from 'react';
import { useLang } from '../context/LanguageContext';

const projectsData = {
  ar: [
    {
      id: 1, icon: '🌐', title: 'موقع شخصي',
      desc: 'بناء موقع شخصي احترافي بـ HTML و CSS',
      category: 'web', level: 'beginner',
      techs: ['HTML', 'CSS', 'JavaScript'],
      steps: 5, duration: '1 أسبوع',
      color: 'var(--orange)', bg: 'rgba(232, 130, 74, 0.08)',
    },
    {
      id: 2, icon: '🛒', title: 'متجر إلكتروني',
      desc: 'تطوير متجر إلكتروني كامل بـ React',
      category: 'web', level: 'intermediate',
      techs: ['React', 'CSS', 'API'],
      steps: 8, duration: '3 أسابيع',
      color: 'var(--blue)', bg: 'rgba(74, 144, 217, 0.08)',
    },
    {
      id: 3, icon: '🤖', title: 'بوت تليجرام',
      desc: 'بناء بوت تليجرام بـ Python',
      category: 'python', level: 'intermediate',
      techs: ['Python', 'Telegram API'],
      steps: 6, duration: '2 أسبوع',
      color: 'var(--green)', bg: 'rgba(46, 204, 154, 0.08)',
    },
    {
      id: 4, icon: '📊', title: 'لوحة بيانات',
      desc: 'تحليل وعرض البيانات بـ Python',
      category: 'python', level: 'advanced',
      techs: ['Python', 'Pandas', 'Matplotlib'],
      steps: 7, duration: '2 أسبوع',
      color: 'var(--purple)', bg: 'rgba(155, 111, 212, 0.08)',
    },
    {
      id: 5, icon: '📱', title: 'تطبيق مهام',
      desc: 'تطبيق موبايل لإدارة المهام بـ Flutter',
      category: 'mobile', level: 'intermediate',
      techs: ['Flutter', 'Dart'],
      steps: 6, duration: '2 أسبوع',
      color: 'var(--blue)', bg: 'rgba(74, 144, 217, 0.08)',
    },
    {
      id: 6, icon: '🧠', title: 'نموذج AI',
      desc: 'بناء نموذج تصنيف صور بـ TensorFlow',
      category: 'ai', level: 'advanced',
      techs: ['Python', 'TensorFlow', 'OpenCV'],
      steps: 9, duration: '4 أسابيع',
      color: 'var(--orange)', bg: 'rgba(232, 130, 74, 0.08)',
    },
  ],
  en: [
    {
      id: 1, icon: '🌐', title: 'Personal Website',
      desc: 'Build a professional personal website with HTML & CSS',
      category: 'web', level: 'beginner',
      techs: ['HTML', 'CSS', 'JavaScript'],
      steps: 5, duration: '1 week',
      color: 'var(--orange)', bg: 'rgba(232, 130, 74, 0.08)',
    },
    {
      id: 2, icon: '🛒', title: 'E-Commerce Store',
      desc: 'Develop a full e-commerce store with React',
      category: 'web', level: 'intermediate',
      techs: ['React', 'CSS', 'API'],
      steps: 8, duration: '3 weeks',
      color: 'var(--blue)', bg: 'rgba(74, 144, 217, 0.08)',
    },
    {
      id: 3, icon: '🤖', title: 'Telegram Bot',
      desc: 'Build a Telegram bot with Python',
      category: 'python', level: 'intermediate',
      techs: ['Python', 'Telegram API'],
      steps: 6, duration: '2 weeks',
      color: 'var(--green)', bg: 'rgba(46, 204, 154, 0.08)',
    },
    {
      id: 4, icon: '📊', title: 'Data Dashboard',
      desc: 'Analyze and visualize data with Python',
      category: 'python', level: 'advanced',
      techs: ['Python', 'Pandas', 'Matplotlib'],
      steps: 7, duration: '2 weeks',
      color: 'var(--purple)', bg: 'rgba(155, 111, 212, 0.08)',
    },
    {
      id: 5, icon: '📱', title: 'Task Manager App',
      desc: 'Mobile task management app with Flutter',
      category: 'mobile', level: 'intermediate',
      techs: ['Flutter', 'Dart'],
      steps: 6, duration: '2 weeks',
      color: 'var(--blue)', bg: 'rgba(74, 144, 217, 0.08)',
    },
    {
      id: 6, icon: '🧠', title: 'AI Model',
      desc: 'Build an image classification model with TensorFlow',
      category: 'ai', level: 'advanced',
      techs: ['Python', 'TensorFlow', 'OpenCV'],
      steps: 9, duration: '4 weeks',
      color: 'var(--orange)', bg: 'rgba(232, 130, 74, 0.08)',
    },
  ],
};

const levelConfig = {
  beginner:     { color: 'var(--green)',  bg: 'rgba(46, 204, 154, 0.10)',  label_ar: 'مبتدئ',  label_en: 'Beginner'     },
  intermediate: { color: 'var(--orange)', bg: 'rgba(232, 130, 74, 0.10)', label_ar: 'متوسط',  label_en: 'Intermediate' },
  advanced:     { color: 'var(--blue)',   bg: 'rgba(74, 144, 217, 0.10)', label_ar: 'متقدم',  label_en: 'Advanced'     },
};

function Projects() {
  const { lang } = useLang();
  const [activeCategory, setActiveCategory] = useState('all');

  const projects = projectsData[lang];

  const categories = [
    { key: 'all',    label_ar: 'الكل',    label_en: 'All',    icon: '📚' },
    { key: 'web',    label_ar: 'الويب',   label_en: 'Web',    icon: '🌐' },
    { key: 'python', label_ar: 'Python',  label_en: 'Python', icon: '🐍' },
    { key: 'mobile', label_ar: 'موبايل',  label_en: 'Mobile', icon: '📱' },
    { key: 'ai',     label_ar: 'AI',      label_en: 'AI',     icon: '🤖' },
  ];

  const filtered = projects.filter((p) =>
    activeCategory === 'all' || p.category === activeCategory
  );

  return (
    <div className="container py-5">

      {/* ── Header ───────────────────────── */}
      <div className="mb-5">
        <h1 className="fw-black mb-2" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
          {lang === 'ar' ? '🚀 مشاريع عملية' : '🚀 Practical Projects'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-m)' }}>
          {lang === 'ar'
            ? 'ابنِ مشاريع حقيقية تضيفها لمحفظتك'
            : 'Build real projects to add to your portfolio'}
        </p>
      </div>

      {/* ── Categories ───────────────────── */}
      <div className="d-flex flex-wrap gap-2 mb-5">
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

      {/* ── Projects grid ─────────────────── */}
      <div className="row g-4">
        {filtered.map((project) => {
          const lc = levelConfig[project.level];
          return (
            <div className="col-lg-4 col-md-6" key={project.id}>
              <div
                className="card h-100 p-4"
                style={{ background: project.bg, border: `1px solid ${project.color}25`, cursor: 'pointer' }}
              >
                {/* Icon + Level */}
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <span style={{ fontSize: '40px' }}>{project.icon}</span>
                  <span
                    className="badge"
                    style={{ background: lc.bg, color: lc.color, padding: '6px 12px', fontSize: 'var(--font-xs)' }}
                  >
                    {lang === 'ar' ? lc.label_ar : lc.label_en}
                  </span>
                </div>

                {/* Title + Desc */}
                <h3 className="fw-black mb-2" style={{ fontSize: 'var(--font-l)' }}>
                  {project.title}
                </h3>
                <p className="mb-3" style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-s)', lineHeight: '1.6' }}>
                  {project.desc}
                </p>

                {/* Techs */}
                <div className="d-flex flex-wrap gap-1 mb-3">
                  {project.techs.map((tech) => (
                    <span
                      key={tech}
                      className="badge"
                      style={{ background: `${project.color}15`, color: project.color, padding: '4px 10px', fontSize: 'var(--font-xs)' }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Meta */}
                <div className="d-flex justify-content-between mb-4" style={{ color: 'var(--text-hint)', fontSize: 'var(--font-xs)' }}>
                  <span>📋 {project.steps} {lang === 'ar' ? 'خطوات' : 'steps'}</span>
                  <span>⏱ {project.duration}</span>
                </div>

                {/* Button */}
                <button
                  className="btn-primary mt-auto w-100"
                  style={{ background: `linear-gradient(135deg, ${project.color}, ${project.color}BB)`, padding: '10px' }}
                >
                  {lang === 'ar' ? 'ابدأ المشروع ←' : 'Start Project →'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Projects;