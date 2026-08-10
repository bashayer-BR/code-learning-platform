import { useState } from 'react';
import { useLang } from '../context/LanguageContext';

const roadmapsData = {
  ar: [
    {
      id: 'web',
      icon: '🌐',
      title: 'مطور ويب كامل',
      desc: 'من الصفر إلى Full Stack Developer',
      color: 'var(--orange)',
      bg: 'rgba(232, 130, 74, 0.08)',
      duration: '6 أشهر',
      steps: [
        {
          phase: 1,
          title: 'الأساسيات',
          color: 'var(--green)',
          items: [
            { title: 'HTML', done: true,  desc: 'بنية صفحات الويب' },
            { title: 'CSS',  done: true,  desc: 'تصميم وتنسيق الصفحات' },
            { title: 'Git',  done: false, desc: 'إدارة الكود المصدري' },
          ],
        },
        {
          phase: 2,
          title: 'JavaScript',
          color: 'var(--orange)',
          items: [
            { title: 'أساسيات JS',     done: false, desc: 'المتغيرات والدوال' },
            { title: 'DOM',            done: false, desc: 'التفاعل مع الصفحة' },
            { title: 'Async/Await',    done: false, desc: 'البرمجة غير المتزامنة' },
          ],
        },
        {
          phase: 3,
          title: 'Frontend Framework',
          color: 'var(--blue)',
          items: [
            { title: 'React',          done: false, desc: 'مكتبة الواجهات' },
            { title: 'React Router',   done: false, desc: 'التنقل بين الصفحات' },
            { title: 'State Management', done: false, desc: 'إدارة حالة التطبيق' },
          ],
        },
        {
          phase: 4,
          title: 'Backend',
          color: 'var(--purple)',
          items: [
            { title: 'Node.js',        done: false, desc: 'خادم JavaScript' },
            { title: 'Express',        done: false, desc: 'إطار عمل الباك إند' },
            { title: 'Database',       done: false, desc: 'قواعد البيانات' },
          ],
        },
      ],
    },
    {
      id: 'ai',
      icon: '🤖',
      title: 'مهندس ذكاء اصطناعي',
      desc: 'من Python إلى AI Engineer',
      color: 'var(--purple)',
      bg: 'rgba(155, 111, 212, 0.08)',
      duration: '8 أشهر',
      steps: [
        {
          phase: 1,
          title: 'Python',
          color: 'var(--green)',
          items: [
            { title: 'أساسيات Python', done: true,  desc: 'لغة البرمجة الأساسية' },
            { title: 'NumPy & Pandas', done: true,  desc: 'معالجة البيانات' },
            { title: 'Matplotlib',     done: false, desc: 'رسم البيانات' },
          ],
        },
        {
          phase: 2,
          title: 'Machine Learning',
          color: 'var(--orange)',
          items: [
            { title: 'Scikit-learn',   done: false, desc: 'خوارزميات ML' },
            { title: 'XGBoost',        done: false, desc: 'نماذج متقدمة' },
            { title: 'Model Evaluation', done: false, desc: 'تقييم النماذج' },
          ],
        },
        {
          phase: 3,
          title: 'Deep Learning',
          color: 'var(--blue)',
          items: [
            { title: 'TensorFlow',     done: false, desc: 'إطار التعلم العميق' },
            { title: 'CNN',            done: false, desc: 'شبكات التعلم العميق' },
            { title: 'NLP',            done: false, desc: 'معالجة اللغة الطبيعية' },
          ],
        },
        {
          phase: 4,
          title: 'النشر',
          color: 'var(--purple)',
          items: [
            { title: 'FastAPI',        done: false, desc: 'نشر النماذج' },
            { title: 'Docker',         done: false, desc: 'حاويات التطبيقات' },
            { title: 'Cloud',          done: false, desc: 'النشر السحابي' },
          ],
        },
      ],
    },
  ],
  en: [
    {
      id: 'web',
      icon: '🌐',
      title: 'Full Stack Developer',
      desc: 'From Zero to Full Stack Developer',
      color: 'var(--orange)',
      bg: 'rgba(232, 130, 74, 0.08)',
      duration: '6 months',
      steps: [
        {
          phase: 1,
          title: 'Fundamentals',
          color: 'var(--green)',
          items: [
            { title: 'HTML', done: true,  desc: 'Web page structure' },
            { title: 'CSS',  done: true,  desc: 'Design and styling' },
            { title: 'Git',  done: false, desc: 'Source code management' },
          ],
        },
        {
          phase: 2,
          title: 'JavaScript',
          color: 'var(--orange)',
          items: [
            { title: 'JS Basics',      done: false, desc: 'Variables and functions' },
            { title: 'DOM',            done: false, desc: 'Page interaction' },
            { title: 'Async/Await',    done: false, desc: 'Asynchronous programming' },
          ],
        },
        {
          phase: 3,
          title: 'Frontend Framework',
          color: 'var(--blue)',
          items: [
            { title: 'React',          done: false, desc: 'UI library' },
            { title: 'React Router',   done: false, desc: 'Page navigation' },
            { title: 'State Management', done: false, desc: 'App state management' },
          ],
        },
        {
          phase: 4,
          title: 'Backend',
          color: 'var(--purple)',
          items: [
            { title: 'Node.js',        done: false, desc: 'JavaScript server' },
            { title: 'Express',        done: false, desc: 'Backend framework' },
            { title: 'Database',       done: false, desc: 'Data storage' },
          ],
        },
      ],
    },
    {
      id: 'ai',
      icon: '🤖',
      title: 'AI Engineer',
      desc: 'From Python to AI Engineer',
      color: 'var(--purple)',
      bg: 'rgba(155, 111, 212, 0.08)',
      duration: '8 months',
      steps: [
        {
          phase: 1,
          title: 'Python',
          color: 'var(--green)',
          items: [
            { title: 'Python Basics',  done: true,  desc: 'Core programming language' },
            { title: 'NumPy & Pandas', done: true,  desc: 'Data processing' },
            { title: 'Matplotlib',     done: false, desc: 'Data visualization' },
          ],
        },
        {
          phase: 2,
          title: 'Machine Learning',
          color: 'var(--orange)',
          items: [
            { title: 'Scikit-learn',   done: false, desc: 'ML algorithms' },
            { title: 'XGBoost',        done: false, desc: 'Advanced models' },
            { title: 'Model Evaluation', done: false, desc: 'Evaluating models' },
          ],
        },
        {
          phase: 3,
          title: 'Deep Learning',
          color: 'var(--blue)',
          items: [
            { title: 'TensorFlow',     done: false, desc: 'Deep learning framework' },
            { title: 'CNN',            done: false, desc: 'Neural networks' },
            { title: 'NLP',            done: false, desc: 'Natural Language Processing' },
          ],
        },
        {
          phase: 4,
          title: 'Deployment',
          color: 'var(--purple)',
          items: [
            { title: 'FastAPI',        done: false, desc: 'Model deployment' },
            { title: 'Docker',         done: false, desc: 'Containerization' },
            { title: 'Cloud',          done: false, desc: 'Cloud deployment' },
          ],
        },
      ],
    },
  ],
};

function Roadmap() {
  const { lang } = useLang();
  const [activeRoadmap, setActiveRoadmap] = useState('web');

  const roadmaps  = roadmapsData[lang];
  const current   = roadmaps.find((r) => r.id === activeRoadmap);

  const totalItems = current.steps.reduce((acc, s) => acc + s.items.length, 0);
  const doneItems  = current.steps.reduce((acc, s) => acc + s.items.filter((i) => i.done).length, 0);
  const progress   = Math.round((doneItems / totalItems) * 100);

  return (
    <div className="container py-5">

      {/* ── Header ───────────────────────── */}
      <div className="mb-5">
        <h1 className="fw-black mb-2" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
          {lang === 'ar' ? '🗺️ خريطة التعلم' : '🗺️ Learning Roadmap'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-m)' }}>
          {lang === 'ar' ? 'مسارك نحو الاحتراف خطوة بخطوة' : 'Your path to mastery step by step'}
        </p>
      </div>

      {/* ── Roadmap selector ─────────────── */}
      <div className="row g-3 mb-5">
        {roadmaps.map((r) => (
          <div className="col-md-6" key={r.id}>
            <div
              className="card p-4"
              onClick={() => setActiveRoadmap(r.id)}
              style={{
                cursor: 'pointer',
                background: activeRoadmap === r.id ? r.bg : 'var(--bg-card)',
                border: `2px solid ${activeRoadmap === r.id ? r.color : 'var(--divider)'}`,
                transition: 'var(--transition)',
              }}
            >
              <div className="d-flex align-items-center gap-3">
                <span style={{ fontSize: '36px' }}>{r.icon}</span>
                <div>
                  <h3 className="fw-black mb-0" style={{ fontSize: 'var(--font-l)' }}>{r.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-s)', marginBottom: 0 }}>{r.desc}</p>
                </div>
                <span
                  className="badge ms-auto"
                  style={{ background: `${r.color}15`, color: r.color, padding: '6px 12px' }}
                >
                  ⏱ {r.duration}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Progress ─────────────────────── */}
      <div className="card p-4 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-bold" style={{ fontSize: 'var(--font-m)' }}>
            {lang === 'ar' ? 'تقدمك في المسار' : 'Your Progress'}
          </span>
          <span className="gradient-text fw-black" style={{ fontSize: 'var(--font-l)' }}>
            {progress}%
          </span>
        </div>
        <div style={{
          height: '10px',
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'var(--gradient-primary)',
            borderRadius: 'var(--radius-xl)',
            transition: 'width 0.5s ease',
          }} />
        </div>
        <p style={{ color: 'var(--text-hint)', fontSize: 'var(--font-xs)', marginTop: '8px' }}>
          {doneItems} / {totalItems} {lang === 'ar' ? 'مهمة مكتملة' : 'tasks completed'}
        </p>
      </div>

      {/* ── Steps ────────────────────────── */}
      <div className="d-flex flex-column gap-4">
        {current.steps.map((step, si) => (
          <div key={si}>
            {/* Phase header */}
            <div className="d-flex align-items-center gap-3 mb-3">
              <div style={{
                width: '40px', height: '40px',
                borderRadius: '50%',
                background: `${step.color}20`,
                border: `2px solid ${step.color}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: '900', color: step.color,
                flexShrink: 0,
              }}>
                {step.phase}
              </div>
              <h3 className="fw-black mb-0" style={{ fontSize: 'var(--font-l)', color: step.color }}>
                {lang === 'ar' ? `المرحلة ${step.phase}:` : `Phase ${step.phase}:`} {step.title}
              </h3>

              {/* Connector line */}
              {si < current.steps.length - 1 && (
                <div style={{ flex: 1, height: '2px', background: 'var(--divider)', marginRight: '8px' }} />
              )}
            </div>

            {/* Items */}
            <div className="row g-3 ms-4">
              {step.items.map((item, ii) => (
                <div className="col-md-4" key={ii}>
                  <div
                    className="card p-3"
                    style={{
                      border: `1px solid ${item.done ? step.color : 'var(--divider)'}`,
                      background: item.done ? `${step.color}10` : 'var(--bg-card)',
                      opacity: item.done ? 1 : 0.8,
                    }}
                  >
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span style={{
                        width: '20px', height: '20px',
                        borderRadius: '50%',
                        background: item.done ? step.color : 'var(--bg-surface)',
                        border: `2px solid ${step.color}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '11px', color: 'white',
                        flexShrink: 0,
                      }}>
                        {item.done ? '✓' : ''}
                      </span>
                      <span className="fw-bold" style={{ fontSize: 'var(--font-s)' }}>
                        {item.title}
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-hint)', fontSize: 'var(--font-xs)', margin: 0, paddingRight: '28px' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Roadmap;