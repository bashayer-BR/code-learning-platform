import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

function Settings() {
  const { lang, toggleLang }  = useLang();
  const navigate              = useNavigate();
  const { user, logout }      = useAuth();
  const { profile, refreshProfile } = useUser();

  const [notify,    setNotify]    = useState(true);
  const [darkMode,  setDarkMode]  = useState(false);
  const [saved,     setSaved]     = useState(false);

  if (!user) {
    return (
      <div className="container py-5 text-center">
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>⚙️</div>
        <h2 className="fw-black mb-3">
          {lang === 'ar' ? 'سجّل دخولك أولاً' : 'Sign In First'}
        </h2>
        <button className="btn-primary" onClick={() => navigate('/auth')} style={{ padding: '12px 32px' }}>
          {lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
        </button>
      </div>
    );
  }

  const handleSave = async () => {
    await updateDoc(doc(db, 'users', user.uid), { notify, darkMode });
    await refreshProfile();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sectionStyle = {
    background: 'var(--bg-card)',
    borderRadius: 'var(--radius-l)',
    border: '1px solid var(--divider)',
    padding: '24px',
    marginBottom: '20px',
  };

  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid var(--divider)',
  };

  const toggleStyle = (active) => ({
    width: '44px', height: '24px',
    borderRadius: '12px',
    background: active ? 'var(--primary)' : 'var(--bg-surface)',
    border: `1px solid ${active ? 'var(--primary)' : 'var(--divider)'}`,
    cursor: 'pointer',
    position: 'relative',
    transition: 'var(--transition)',
  });

  const Toggle = ({ value, onChange }) => (
    <div onClick={() => onChange(!value)} style={toggleStyle(value)}>
      <div style={{
        width: '18px', height: '18px',
        borderRadius: '50%',
        background: 'white',
        position: 'absolute',
        top: '2px',
        left: value ? '22px' : '2px',
        transition: 'var(--transition)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
      }} />
    </div>
  );

  return (
    <div className="container py-5" style={{ maxWidth: '700px' }}>

      {/* ── Header ───────────────────────── */}
      <div className="mb-5">
        <h1 className="fw-black mb-2" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
          {lang === 'ar' ? '⚙️ الإعدادات' : '⚙️ Settings'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-m)' }}>
          {lang === 'ar' ? 'تخصيص تجربتك في المنصة' : 'Customize your platform experience'}
        </p>
      </div>

      {/* ── Profile section ──────────────── */}
      <div style={sectionStyle}>
        <h3 className="fw-black mb-4" style={{ fontSize: 'var(--font-l)' }}>
          👤 {lang === 'ar' ? 'الملف الشخصي' : 'Profile'}
        </h3>

        <div className="d-flex align-items-center gap-3 mb-4">
          <div style={{
            width: '60px', height: '60px', borderRadius: '50%',
            background: 'var(--gradient-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', color: 'white', fontWeight: '900',
          }}>
            {user.displayName?.[0] || user.email?.[0] || '؟'}
          </div>
          <div>
            <div className="fw-black" style={{ fontSize: 'var(--font-l)' }}>
              {user.displayName || (lang === 'ar' ? 'مستخدم' : 'User')}
            </div>
            <div style={{ color: 'var(--text-hint)', fontSize: 'var(--font-s)' }}>
              {user.email}
            </div>
          </div>
        </div>

        <div style={{ ...rowStyle, borderBottom: 'none' }}>
          <div>
            <div className="fw-bold" style={{ fontSize: 'var(--font-m)' }}>
              {lang === 'ar' ? 'النقاط المكتسبة' : 'Points Earned'}
            </div>
            <div style={{ color: 'var(--text-hint)', fontSize: 'var(--font-s)' }}>
              {lang === 'ar' ? 'إجمالي نقاطك' : 'Your total points'}
            </div>
          </div>
          <span className="gradient-text fw-black" style={{ fontSize: 'var(--font-xl)' }}>
            ⭐ {profile?.points || 0}
          </span>
        </div>
      </div>

      {/* ── Language section ─────────────── */}
      <div style={sectionStyle}>
        <h3 className="fw-black mb-4" style={{ fontSize: 'var(--font-l)' }}>
          🌐 {lang === 'ar' ? 'اللغة' : 'Language'}
        </h3>
        <div style={rowStyle}>
          <div>
            <div className="fw-bold" style={{ fontSize: 'var(--font-m)' }}>
              {lang === 'ar' ? 'لغة الواجهة' : 'Interface Language'}
            </div>
            <div style={{ color: 'var(--text-hint)', fontSize: 'var(--font-s)' }}>
              {lang === 'ar' ? 'العربية' : 'English'}
            </div>
          </div>
          <button
            onClick={toggleLang}
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--primary)',
              background: 'rgba(232, 130, 74, 0.10)',
              color: 'var(--primary)',
              fontWeight: '700', fontSize: 'var(--font-s)',
              fontFamily: 'Cairo, sans-serif', cursor: 'pointer',
            }}
          >
            {lang === 'ar' ? 'Switch to English' : 'التبديل للعربية'}
          </button>
        </div>
      </div>

      {/* ── Notifications section ─────────── */}
      <div style={sectionStyle}>
        <h3 className="fw-black mb-4" style={{ fontSize: 'var(--font-l)' }}>
          🔔 {lang === 'ar' ? 'الإشعارات' : 'Notifications'}
        </h3>
        <div style={rowStyle}>
          <div>
            <div className="fw-bold" style={{ fontSize: 'var(--font-m)' }}>
              {lang === 'ar' ? 'إشعارات الدروس' : 'Lesson Notifications'}
            </div>
            <div style={{ color: 'var(--text-hint)', fontSize: 'var(--font-s)' }}>
              {lang === 'ar' ? 'تذكير يومي للتعلم' : 'Daily learning reminder'}
            </div>
          </div>
          <Toggle value={notify} onChange={setNotify} />
        </div>
      </div>

      {/* ── Appearance section ────────────── */}
      <div style={sectionStyle}>
        <h3 className="fw-black mb-4" style={{ fontSize: 'var(--font-l)' }}>
          🎨 {lang === 'ar' ? 'المظهر' : 'Appearance'}
        </h3>
        <div style={{ ...rowStyle, borderBottom: 'none' }}>
          <div>
            <div className="fw-bold" style={{ fontSize: 'var(--font-m)' }}>
              {lang === 'ar' ? 'الوضع الليلي' : 'Dark Mode'}
            </div>
            <div style={{ color: 'var(--text-hint)', fontSize: 'var(--font-s)' }}>
              {lang === 'ar' ? 'قريباً...' : 'Coming soon...'}
            </div>
          </div>
          <Toggle value={darkMode} onChange={setDarkMode} />
        </div>
      </div>

      {/* ── Danger zone ──────────────────── */}
      <div style={{ ...sectionStyle, border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.04)' }}>
        <h3 className="fw-black mb-4" style={{ fontSize: 'var(--font-l)', color: 'var(--red)' }}>
          ⚠️ {lang === 'ar' ? 'منطقة الخطر' : 'Danger Zone'}
        </h3>
        <div style={{ ...rowStyle, borderBottom: 'none' }}>
          <div>
            <div className="fw-bold" style={{ fontSize: 'var(--font-m)' }}>
              {lang === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}
            </div>
            <div style={{ color: 'var(--text-hint)', fontSize: 'var(--font-s)' }}>
              {lang === 'ar' ? 'الخروج من حسابك' : 'Sign out of your account'}
            </div>
          </div>
          <button
            onClick={async () => { await logout(); navigate('/'); }}
            style={{
              padding: '8px 20px',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              background: 'rgba(239, 68, 68, 0.08)',
              color: 'var(--red)',
              fontWeight: '700', fontSize: 'var(--font-s)',
              fontFamily: 'Cairo, sans-serif', cursor: 'pointer',
            }}
          >
            {lang === 'ar' ? '🚪 خروج' : '🚪 Sign Out'}
          </button>
        </div>
      </div>

      {/* ── Save button ──────────────────── */}
      <button
        className="btn-primary w-100"
        onClick={handleSave}
        style={{ padding: '14px', fontSize: 'var(--font-m)' }}
      >
        {saved
          ? (lang === 'ar' ? '✅ تم الحفظ!' : '✅ Saved!')
          : (lang === 'ar' ? 'حفظ الإعدادات' : 'Save Settings')}
      </button>

    </div>
  );
}

export default Settings;