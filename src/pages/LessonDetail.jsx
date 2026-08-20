import { useParams, useNavigate } from 'react-router-dom';
import { useState , useEffect  } from 'react';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { completeLesson } from '../services/userService';

const lessonsDetails = {
  1: {
    ar: {
      title: 'أساسيات HTML',
      icon: '🌐',
      desc: 'تعلم بنية صفحات الويب من الصفر وأساسيات لغة HTML',
      level: 'مبتدئ',
      weeks: 2,
      lessons: 12,
      instructor: 'أحمد محمد',
      rating: 4.8,
      students: 1240,
      color: 'var(--orange)',
      bg: 'rgba(232, 130, 74, 0.08)',
      what_learn: [
        'فهم بنية صفحات HTML',
        'استخدام العناصر والوسوم الأساسية',
        'إنشاء نماذج وجداول',
        'الروابط والصور والوسائط',
        'HTML5 والعناصر الدلالية',
      ],
      curriculum: [
        { week: 1, title: 'مقدمة في HTML',         lessons: ['ما هو HTML؟', 'بنية الصفحة', 'العناصر الأساسية', 'العناوين والفقرات'] },
        { week: 2, title: 'العناصر المتقدمة',      lessons: ['الروابط', 'الصور', 'الجداول', 'النماذج', 'HTML5 الدلالي', 'مشروع نهائي'] },
      ],
      requirements: ['لا يشترط خبرة مسبقة', 'حاسوب وإنترنت', 'محرر نصوص'],
    },
    en: {
      title: 'HTML Basics',
      icon: '🌐',
      desc: 'Learn web page structure from scratch and HTML fundamentals',
      level: 'Beginner',
      weeks: 2,
      lessons: 12,
      instructor: 'Ahmed Mohammed',
      rating: 4.8,
      students: 1240,
      color: 'var(--orange)',
      bg: 'rgba(232, 130, 74, 0.08)',
      what_learn: [
        'Understand HTML page structure',
        'Use basic elements and tags',
        'Create forms and tables',
        'Links, images and media',
        'HTML5 and semantic elements',
      ],
      curriculum: [
        { week: 1, title: 'HTML Introduction',   lessons: ['What is HTML?', 'Page structure', 'Basic elements', 'Headings & paragraphs'] },
        { week: 2, title: 'Advanced Elements',   lessons: ['Links', 'Images', 'Tables', 'Forms', 'HTML5 Semantic', 'Final project'] },
      ],
      requirements: ['No prior experience needed', 'Computer and internet', 'Text editor'],
    },
  },
  2: {
    ar: {
      title: 'تصميم CSS',
      icon: '🎨',
      desc: 'تصميم صفحات ويب جذابة باستخدام CSS',
      level: 'مبتدئ',
      weeks: 3,
      lessons: 15,
      instructor: 'سارة أحمد',
      rating: 4.9,
      students: 980,
      color: 'var(--orange)',
      bg: 'rgba(232, 130, 74, 0.08)',
      what_learn: [
        'أساسيات CSS والمحددات',
        'نموذج الصندوق (Box Model)',
        'Flexbox و Grid',
        'الألوان والتدرجات',
        'التصميم المتجاوب (Responsive)',
      ],
      curriculum: [
        { week: 1, title: 'أساسيات CSS',    lessons: ['ما هو CSS؟', 'المحددات', 'الألوان', 'الخطوط'] },
        { week: 2, title: 'التخطيط',        lessons: ['Box Model', 'Flexbox', 'Grid', 'التموضع'] },
        { week: 3, title: 'متقدم',          lessons: ['Responsive Design', 'Animations', 'Variables', 'مشروع نهائي'] },
      ],
      requirements: ['معرفة أساسية بـ HTML', 'حاسوب وإنترنت'],
    },
    en: {
      title: 'CSS Design',
      icon: '🎨',
      desc: 'Design beautiful web pages using CSS',
      level: 'Beginner',
      weeks: 3,
      lessons: 15,
      instructor: 'Sara Ahmed',
      rating: 4.9,
      students: 980,
      color: 'var(--orange)',
      bg: 'rgba(232, 130, 74, 0.08)',
      what_learn: [
        'CSS basics and selectors',
        'Box Model',
        'Flexbox and Grid',
        'Colors and gradients',
        'Responsive Design',
      ],
      curriculum: [
        { week: 1, title: 'CSS Basics',     lessons: ['What is CSS?', 'Selectors', 'Colors', 'Fonts'] },
        { week: 2, title: 'Layout',         lessons: ['Box Model', 'Flexbox', 'Grid', 'Positioning'] },
        { week: 3, title: 'Advanced',       lessons: ['Responsive Design', 'Animations', 'Variables', 'Final project'] },
      ],
      requirements: ['Basic HTML knowledge', 'Computer and internet'],
    },
  },
};

// Default for lessons without details
const defaultDetail = (id, lang) => ({
  title:       lang === 'ar' ? `درس ${id}`      : `Lesson ${id}`,
  icon:        '📚',
  desc:        lang === 'ar' ? 'تفاصيل الدرس'  : 'Lesson details',
  level:       lang === 'ar' ? 'متوسط'          : 'Intermediate',
  weeks:       4,
  lessons:     20,
  instructor:  lang === 'ar' ? 'المدرب'         : 'Instructor',
  rating:      4.7,
  students:    500,
  color:       'var(--blue)',
  bg:          'rgba(74, 144, 217, 0.08)',
  what_learn:  [lang === 'ar' ? 'المفاهيم الأساسية' : 'Core concepts'],
  curriculum:  [{ week: 1, title: lang === 'ar' ? 'الأسبوع الأول' : 'Week 1', lessons: [lang === 'ar' ? 'مقدمة' : 'Introduction'] }],
  requirements:[lang === 'ar' ? 'لا يشترط خبرة' : 'No experience needed'],
});

function LessonDetail() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const { lang }     = useLang();
  // 
  const { user }              = useAuth();
  const { profile, refreshProfile } = useUser();
  const [done, setDone]       = useState(false);

  // تحقق لو الدرس مكتمل بالفعل
  useEffect(() => {
    if (profile?.completedLessons?.includes(Number(id))) {
      setDone(true);
    }
  }, [profile, id]);

  const handleComplete = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }
    await completeLesson(user.uid, Number(id));
    await refreshProfile();
    setDone(true);
  };
  const [activeTab, setActiveTab] = useState('overview');

  const detail = lessonsDetails[id]?.[lang] || defaultDetail(id, lang);

  const tabs = [
    { key: 'overview',      label: lang === 'ar' ? 'نظرة عامة'    : 'Overview'     },
    { key: 'curriculum',    label: lang === 'ar' ? 'المنهج'        : 'Curriculum'   },
    { key: 'requirements',  label: lang === 'ar' ? 'المتطلبات'     : 'Requirements' },
  ];

  return (
    <div className="container py-5">

      {/* ── Back button ──────────────────── */}
      <button
        onClick={() => navigate('/lessons')}
        className="btn-secondary mb-4 d-inline-flex align-items-center gap-2"
        style={{ padding: '8px 20px' }}
      >
        {lang === 'ar' ? '→ رجوع للدروس' : '← Back to Lessons'}
      </button>

      <div className="row g-4">

        {/* ── Left: Main content ───────────── */}
        <div className="col-lg-8">

          {/* Hero */}
          <div
            className="card p-4 mb-4"
            style={{ background: detail.bg, border: `1px solid ${detail.color}30` }}
          >
            <div className="d-flex align-items-center gap-3 mb-3">
              <span style={{ fontSize: '48px' }}>{detail.icon}</span>
              <div>
                <span className="badge badge-primary mb-1">
                  {detail.level}
                </span>
                <h1 className="fw-black mb-0" style={{ fontSize: 'clamp(22px, 3vw, 32px)' }}>
                  {detail.title}
                </h1>
              </div>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-m)', lineHeight: '1.8' }}>
              {detail.desc}
            </p>

            {/* Stats row */}
            <div className="d-flex flex-wrap gap-4 mt-3">
              {[
                { icon: '⭐', value: detail.rating,   label: lang === 'ar' ? 'تقييم'    : 'Rating'   },
                { icon: '👥', value: detail.students,  label: lang === 'ar' ? 'طالب'     : 'Students' },
                { icon: '⏱',  value: detail.weeks,    label: lang === 'ar' ? 'أسابيع'   : 'Weeks'    },
                { icon: '📖', value: detail.lessons,   label: lang === 'ar' ? 'درس'      : 'Lessons'  },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div style={{ fontSize: '20px' }}>{s.icon}</div>
                  <div className="fw-black" style={{ fontSize: 'var(--font-l)', color: detail.color }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 'var(--font-xs)', color: 'var(--text-hint)' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="d-flex gap-2 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 'var(--radius-xl)',
                  border: `1px solid ${activeTab === tab.key ? detail.color : 'var(--divider)'}`,
                  background: activeTab === tab.key ? `${detail.color}15` : 'var(--bg-card)',
                  color: activeTab === tab.key ? detail.color : 'var(--text-secondary)',
                  fontWeight: activeTab === tab.key ? '700' : '500',
                  fontSize: 'var(--font-s)',
                  fontFamily: 'Cairo, sans-serif',
                  cursor: 'pointer',
                  transition: 'var(--transition)',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeTab === 'overview' && (
            <div className="card p-4">
              <h3 className="fw-black mb-3" style={{ fontSize: 'var(--font-l)' }}>
                {lang === 'ar' ? '✅ ماذا ستتعلم' : '✅ What You Will Learn'}
              </h3>
              <div className="row g-2">
                {detail.what_learn.map((item, i) => (
                  <div className="col-md-6" key={i}>
                    <div className="d-flex align-items-start gap-2">
                      <span style={{ color: detail.color, fontWeight: '700' }}>✓</span>
                      <span style={{ fontSize: 'var(--font-s)', color: 'var(--text-secondary)' }}>
                        {item}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'curriculum' && (
            <div className="card p-4">
              <h3 className="fw-black mb-3" style={{ fontSize: 'var(--font-l)' }}>
                {lang === 'ar' ? '📅 المنهج الدراسي' : '📅 Curriculum'}
              </h3>
              <div className="d-flex flex-column gap-3">
                {detail.curriculum.map((week, i) => (
                  <div
                    key={i}
                    style={{
                      border: '1px solid var(--divider)',
                      borderRadius: 'var(--radius-m)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      className="d-flex align-items-center gap-3 p-3"
                      style={{ background: 'var(--bg-surface)' }}
                    >
                      <span
                        style={{
                          width: '32px', height: '32px',
                          borderRadius: '50%',
                          background: `${detail.color}20`,
                          color: detail.color,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontWeight: '900', fontSize: 'var(--font-s)',
                          flexShrink: 0,
                        }}
                      >
                        {week.week}
                      </span>
                      <span className="fw-bold" style={{ fontSize: 'var(--font-m)' }}>
                        {lang === 'ar' ? `الأسبوع ${week.week}:` : `Week ${week.week}:`} {week.title}
                      </span>
                      <span
                        className="badge ms-auto"
                        style={{ background: `${detail.color}15`, color: detail.color, padding: '4px 10px' }}
                      >
                        {week.lessons.length} {lang === 'ar' ? 'دروس' : 'lessons'}
                      </span>
                    </div>
                    <div className="p-3">
                      {week.lessons.map((lesson, j) => (
                        <div
                          key={j}
                          className="d-flex align-items-center gap-2 py-1"
                          style={{ borderBottom: j < week.lessons.length - 1 ? '1px solid var(--divider)' : 'none' }}
                        >
                          <span style={{ color: 'var(--text-hint)', fontSize: '12px' }}>▶</span>
                          <span style={{ fontSize: 'var(--font-s)', color: 'var(--text-secondary)' }}>
                            {lesson}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'requirements' && (
            <div className="card p-4">
              <h3 className="fw-black mb-3" style={{ fontSize: 'var(--font-l)' }}>
                {lang === 'ar' ? '📋 المتطلبات' : '📋 Requirements'}
              </h3>
              <div className="d-flex flex-column gap-2">
                {detail.requirements.map((req, i) => (
                  <div key={i} className="d-flex align-items-start gap-2">
                    <span style={{ color: detail.color }}>•</span>
                    <span style={{ fontSize: 'var(--font-s)', color: 'var(--text-secondary)' }}>
                      {req}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Right: Enroll card ───────────── */}
        <div className="col-lg-4">
          <div className="card p-4" style={{ position: 'sticky', top: '80px' }}>
            <div className="gradient-text fw-black mb-1" style={{ fontSize: 'var(--font-xxl)' }}>
              {lang === 'ar' ? 'مجاني' : 'Free'}
            </div>
            <p style={{ color: 'var(--text-hint)', fontSize: 'var(--font-s)', marginBottom: '20px' }}>
              {lang === 'ar' ? 'وصول كامل لجميع الدروس' : 'Full access to all lessons'}
            </p>

            <button
              className="btn-primary w-100"
              onClick={handleComplete}
              disabled={done}
              style={{
                padding: '14px',
                fontSize: 'var(--font-m)',
                background: done ? 'var(--green)' : undefined,
              }}
            >
              {done
                ? (lang === 'ar' ? '✅ تم الإتمام' : '✅ Completed')
                : (lang === 'ar' ? '🚀 ابدأ التعلم مجاناً' : '🚀 Start Learning Free')}
            </button>

            <button
              className="btn-secondary w-100 mb-4"
              style={{ padding: '12px', fontSize: 'var(--font-m)' }}
            >
              {lang === 'ar' ? '👁 معاينة الدرس' : '👁 Preview Lesson'}
            </button>

            <div className="d-flex flex-column gap-2">
              {[
                { icon: '👨‍🏫', label: lang === 'ar' ? 'المدرب'   : 'Instructor', value: detail.instructor },
                { icon: '⏱',   label: lang === 'ar' ? 'المدة'     : 'Duration',   value: `${detail.weeks} ${lang === 'ar' ? 'أسابيع' : 'weeks'}` },
                { icon: '📖',  label: lang === 'ar' ? 'الدروس'    : 'Lessons',    value: detail.lessons },
                { icon: '🌐',  label: lang === 'ar' ? 'اللغة'     : 'Language',   value: lang === 'ar' ? 'العربية' : 'English' },
                { icon: '📜',  label: lang === 'ar' ? 'الشهادة'   : 'Certificate', value: lang === 'ar' ? 'نعم' : 'Yes' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="d-flex justify-content-between align-items-center py-2"
                  style={{ borderBottom: '1px solid var(--divider)', fontSize: 'var(--font-s)' }}
                >
                  <span style={{ color: 'var(--text-hint)' }}>
                    {item.icon} {item.label}
                  </span>
                  <span className="fw-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonDetail;