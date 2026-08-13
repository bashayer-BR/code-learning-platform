import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

function NotFound() {
  const navigate = useNavigate();
  const { lang } = useLang();

  return (
    <div className="container py-5 text-center" style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div>
        <div style={{ fontSize: '80px', marginBottom: '16px' }}>🔍</div>

        <h1 className="fw-black mb-2" style={{ fontSize: 'clamp(60px, 10vw, 120px)', background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          404
        </h1>

        <h2 className="fw-black mb-3" style={{ fontSize: 'clamp(20px, 3vw, 28px)' }}>
          {lang === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h2>

        <p className="mb-5" style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-m)', maxWidth: '400px', margin: '0 auto 40px' }}>
          {lang === 'ar'
            ? 'يبدو أن الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'
            : 'The page you are looking for does not exist or has been moved.'}
        </p>

        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <button
            className="btn-primary"
            onClick={() => navigate('/')}
            style={{ padding: '14px 32px', fontSize: 'var(--font-m)' }}
          >
            {lang === 'ar' ? '🏠 الرئيسية' : '🏠 Home'}
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate(-1)}
            style={{ padding: '14px 32px', fontSize: 'var(--font-m)' }}
          >
            {lang === 'ar' ? '← رجوع' : '← Go Back'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;