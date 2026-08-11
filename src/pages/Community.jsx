import { useState } from 'react';
import { useLang } from '../context/LanguageContext';

const postsData = {
  ar: [
    { id: 1, avatar: '👨‍💻', name: 'أحمد محمد',   time: 'منذ 5 دقائق',  category: 'سؤال',    title: 'كيف أفهم الـ Promises في JavaScript؟',          desc: 'حاولت أفهم الـ Promises لكن مو واضحة لي، في شرح مبسط؟',                          likes: 12, replies: 5,  color: 'var(--orange)' },
    { id: 2, avatar: '👩‍💻', name: 'سارة علي',     time: 'منذ 20 دقيقة', category: 'مشاركة',  title: 'أنهيت مشروع متجر إلكتروني كامل! 🎉',             desc: 'بعد 3 أسابيع من العمل أنهيت مشروعي الأول، شاركوني رأيكم!',                      likes: 48, replies: 15, color: 'var(--green)'  },
    { id: 3, avatar: '🧑‍💻', name: 'خالد عمر',    time: 'منذ ساعة',     category: 'نصيحة',   title: 'نصيحة للمبتدئين: ابدأ بالمشاريع الصغيرة',         desc: 'من تجربتي، أفضل طريقة للتعلم هي بناء مشاريع صغيرة من البداية.',                 likes: 34, replies: 8,  color: 'var(--blue)'   },
    { id: 4, avatar: '👨‍🎓', name: 'محمد سعد',    time: 'منذ 3 ساعات',  category: 'سؤال',    title: 'ما الفرق بين SQL و NoSQL؟',                        desc: 'أحتاج أختار قاعدة بيانات لمشروعي ومو عارف أي الأنسب.',                          likes: 9,  replies: 12, color: 'var(--orange)' },
    { id: 5, avatar: '👩‍🎓', name: 'نورا محمد',   time: 'منذ 5 ساعات',  category: 'مشاركة',  title: 'حصلت على وظيفتي الأولى كمطورة! 🚀',                desc: 'بعد 6 أشهر من التعلم في هذه المنصة حصلت على أول وظيفة لي.',                    likes: 92, replies: 24, color: 'var(--green)'  },
    { id: 6, avatar: '🧑‍🏫', name: 'عمر خالد',   time: 'منذ يوم',      category: 'نصيحة',   title: 'أفضل مصادر تعلم React في 2024',                   desc: 'جمعت لكم أفضل المصادر المجانية لتعلم React من الصفر.',                          likes: 67, replies: 19, color: 'var(--blue)'   },
  ],
  en: [
    { id: 1, avatar: '👨‍💻', name: 'Ahmed M.',     time: '5 min ago',    category: 'Question', title: 'How do I understand Promises in JavaScript?',       desc: 'I tried to understand Promises but it\'s not clear, any simple explanation?',    likes: 12, replies: 5,  color: 'var(--orange)' },
    { id: 2, avatar: '👩‍💻', name: 'Sara A.',      time: '20 min ago',   category: 'Share',    title: 'Finished a full e-commerce project! 🎉',            desc: 'After 3 weeks of work I finished my first project, share your thoughts!',        likes: 48, replies: 15, color: 'var(--green)'  },
    { id: 3, avatar: '🧑‍💻', name: 'Khalid O.',   time: '1 hour ago',   category: 'Tip',      title: 'Advice for beginners: Start with small projects',   desc: 'From my experience, the best way to learn is to build small projects early on.', likes: 34, replies: 8,  color: 'var(--blue)'   },
    { id: 4, avatar: '👨‍🎓', name: 'Mohammed S.',  time: '3 hours ago',  category: 'Question', title: 'What is the difference between SQL and NoSQL?',     desc: 'I need to choose a database for my project and I don\'t know which is better.',  likes: 9,  replies: 12, color: 'var(--orange)' },
    { id: 5, avatar: '👩‍🎓', name: 'Noura M.',    time: '5 hours ago',  category: 'Share',    title: 'Got my first job as a developer! 🚀',               desc: 'After 6 months of learning on this platform I got my first job.',                likes: 92, replies: 24, color: 'var(--green)'  },
    { id: 6, avatar: '🧑‍🏫', name: 'Omar K.',     time: '1 day ago',    category: 'Tip',      title: 'Best resources to learn React in 2024',             desc: 'I compiled the best free resources to learn React from scratch.',                likes: 67, replies: 19, color: 'var(--blue)'   },
  ],
};

const categoryConfig = {
  'سؤال':    { color: 'var(--orange)', bg: 'rgba(232, 130, 74, 0.10)'  },
  'مشاركة':  { color: 'var(--green)',  bg: 'rgba(46, 204, 154, 0.10)'  },
  'نصيحة':   { color: 'var(--blue)',   bg: 'rgba(74, 144, 217, 0.10)'  },
  'Question': { color: 'var(--orange)', bg: 'rgba(232, 130, 74, 0.10)' },
  'Share':    { color: 'var(--green)',  bg: 'rgba(46, 204, 154, 0.10)' },
  'Tip':      { color: 'var(--blue)',   bg: 'rgba(74, 144, 217, 0.10)' },
};

function Community() {
  const { lang }    = useLang();
  const [activeTab, setActiveTab]     = useState('all');
  const [newPost,   setNewPost]       = useState('');
  const [showForm,  setShowForm]      = useState(false);

  const posts = postsData[lang];

  const tabs = lang === 'ar'
    ? [
        { key: 'all',      label: 'الكل'    },
        { key: 'سؤال',     label: 'أسئلة'   },
        { key: 'مشاركة',   label: 'مشاركات' },
        { key: 'نصيحة',    label: 'نصائح'   },
      ]
    : [
        { key: 'all',      label: 'All'       },
        { key: 'Question', label: 'Questions' },
        { key: 'Share',    label: 'Shares'    },
        { key: 'Tip',      label: 'Tips'      },
      ];

  const filtered = posts.filter((p) => activeTab === 'all' || p.category === activeTab);

  return (
    <div className="container py-5">

      {/* ── Header ───────────────────────── */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-5 gap-3">
        <div>
          <h1 className="fw-black mb-2" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
            {lang === 'ar' ? '👥 مجتمع المبرمجين' : '👥 Developer Community'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-m)' }}>
            {lang === 'ar' ? 'اسأل، شارك، وتعلم مع مجتمعنا' : 'Ask, share, and learn with our community'}
          </p>
        </div>
        <button
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
          style={{ padding: '12px 24px', fontSize: 'var(--font-m)' }}
        >
          {lang === 'ar' ? '✏️ اكتب منشور' : '✏️ Write Post'}
        </button>
      </div>

      {/* ── New post form ─────────────────── */}
      {showForm && (
        <div className="card p-4 mb-4" style={{ border: '1px solid rgba(232, 130, 74, 0.3)', background: 'rgba(232, 130, 74, 0.04)' }}>
          <h3 className="fw-black mb-3" style={{ fontSize: 'var(--font-l)' }}>
            {lang === 'ar' ? '✏️ منشور جديد' : '✏️ New Post'}
          </h3>
          <input
            placeholder={lang === 'ar' ? 'عنوان المنشور...' : 'Post title...'}
            style={{
              width: '100%', padding: '12px 16px',
              borderRadius: 'var(--radius-m)',
              border: '1px solid var(--divider)',
              background: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              fontSize: 'var(--font-s)',
              fontFamily: 'Cairo, sans-serif',
              marginBottom: '12px', outline: 'none',
            }}
          />
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder={lang === 'ar' ? 'اكتب منشورك هنا...' : 'Write your post here...'}
            rows={4}
            style={{
              width: '100%', padding: '12px 16px',
              borderRadius: 'var(--radius-m)',
              border: '1px solid var(--divider)',
              background: 'var(--bg-surface)',
              color: 'var(--text-primary)',
              fontSize: 'var(--font-s)',
              fontFamily: 'Cairo, sans-serif',
              resize: 'vertical', outline: 'none',
              marginBottom: '12px',
            }}
          />
          <div className="d-flex gap-2">
            <button className="btn-primary" style={{ padding: '10px 24px' }}>
              {lang === 'ar' ? 'نشر' : 'Publish'}
            </button>
            <button
              className="btn-secondary"
              onClick={() => setShowForm(false)}
              style={{ padding: '10px 24px' }}
            >
              {lang === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
          </div>
        </div>
      )}

      <div className="row g-4">

        {/* ── Posts ────────────────────────── */}
        <div className="col-lg-8">

          {/* Tabs */}
          <div className="d-flex flex-wrap gap-2 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '8px 20px',
                  borderRadius: 'var(--radius-xl)',
                  border: `1px solid ${activeTab === tab.key ? 'var(--primary)' : 'var(--divider)'}`,
                  background: activeTab === tab.key ? 'rgba(232, 130, 74, 0.12)' : 'var(--bg-card)',
                  color: activeTab === tab.key ? 'var(--primary)' : 'var(--text-secondary)',
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

          {/* Posts list */}
          <div className="d-flex flex-column gap-3">
            {filtered.map((post) => {
              const cc = categoryConfig[post.category];
              return (
                <div key={post.id} className="card p-4" style={{ cursor: 'pointer' }}>
                  <div className="d-flex align-items-start gap-3">
                    {/* Avatar */}
                    <div style={{
                      width: '44px', height: '44px',
                      borderRadius: '50%',
                      background: `${post.color}20`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '22px', flexShrink: 0,
                    }}>
                      {post.avatar}
                    </div>

                    <div style={{ flex: 1 }}>
                      {/* Meta */}
                      <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
                        <span className="fw-bold" style={{ fontSize: 'var(--font-s)' }}>{post.name}</span>
                        <span style={{ color: 'var(--text-hint)', fontSize: 'var(--font-xs)' }}>{post.time}</span>
                        <span
                          className="badge"
                          style={{ background: cc.bg, color: cc.color, padding: '3px 10px', fontSize: 'var(--font-xs)' }}
                        >
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="fw-bold mb-1" style={{ fontSize: 'var(--font-m)' }}>
                        {post.title}
                      </h3>

                      {/* Desc */}
                      <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-s)', lineHeight: '1.6', marginBottom: '12px' }}>
                        {post.desc}
                      </p>

                      {/* Actions */}
                      <div className="d-flex gap-3">
                        <button style={{
                          background: 'none', border: 'none',
                          color: 'var(--text-hint)', fontSize: 'var(--font-xs)',
                          cursor: 'pointer', fontFamily: 'Cairo, sans-serif',
                          display: 'flex', alignItems: 'center', gap: '4px',
                        }}>
                          ❤️ {post.likes}
                        </button>
                        <button style={{
                          background: 'none', border: 'none',
                          color: 'var(--text-hint)', fontSize: 'var(--font-xs)',
                          cursor: 'pointer', fontFamily: 'Cairo, sans-serif',
                          display: 'flex', alignItems: 'center', gap: '4px',
                        }}>
                          💬 {post.replies}
                        </button>
                        <button style={{
                          background: 'none', border: 'none',
                          color: 'var(--text-hint)', fontSize: 'var(--font-xs)',
                          cursor: 'pointer', fontFamily: 'Cairo, sans-serif',
                        }}>
                          🔗 {lang === 'ar' ? 'مشاركة' : 'Share'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Sidebar ──────────────────────── */}
        <div className="col-lg-4 d-flex flex-column gap-3">

          {/* Stats */}
          <div className="card p-4">
            <h3 className="fw-black mb-3" style={{ fontSize: 'var(--font-l)' }}>
              {lang === 'ar' ? '📊 إحصائيات المجتمع' : '📊 Community Stats'}
            </h3>
            <div className="d-flex flex-column gap-2">
              {[
                { icon: '👥', value: '+12K', label: lang === 'ar' ? 'عضو نشط'     : 'Active Members' },
                { icon: '💬', value: '+50K', label: lang === 'ar' ? 'منشور'        : 'Posts'          },
                { icon: '✅', value: '+30K', label: lang === 'ar' ? 'سؤال تم حله' : 'Solved'         },
                { icon: '🌍', value: '25+',  label: lang === 'ar' ? 'دولة'         : 'Countries'      },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="d-flex align-items-center justify-content-between py-2"
                  style={{ borderBottom: '1px solid var(--divider)' }}
                >
                  <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-s)' }}>
                    {stat.icon} {stat.label}
                  </span>
                  <span className="gradient-text fw-black" style={{ fontSize: 'var(--font-m)' }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top members */}
          <div className="card p-4">
            <h3 className="fw-black mb-3" style={{ fontSize: 'var(--font-l)' }}>
              {lang === 'ar' ? '🏆 أكثر المساهمين' : '🏆 Top Contributors'}
            </h3>
            <div className="d-flex flex-column gap-3">
              {[
                { avatar: '👩‍💻', name: lang === 'ar' ? 'نورا محمد'  : 'Noura M.',   points: 1240, rank: 1 },
                { avatar: '👨‍💻', name: lang === 'ar' ? 'أحمد محمد'  : 'Ahmed M.',   points: 980,  rank: 2 },
                { avatar: '🧑‍💻', name: lang === 'ar' ? 'خالد عمر'   : 'Khalid O.',  points: 756,  rank: 3 },
              ].map((member) => (
                <div key={member.rank} className="d-flex align-items-center gap-3">
                  <span className="fw-black" style={{ color: 'var(--text-hint)', width: '20px' }}>
                    #{member.rank}
                  </span>
                  <div style={{
                    width: '36px', height: '36px',
                    borderRadius: '50%',
                    background: 'var(--bg-surface)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px',
                  }}>
                    {member.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="fw-bold" style={{ fontSize: 'var(--font-s)' }}>{member.name}</div>
                    <div style={{ color: 'var(--text-hint)', fontSize: 'var(--font-xs)' }}>
                      {member.points} {lang === 'ar' ? 'نقطة' : 'pts'}
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

export default Community;