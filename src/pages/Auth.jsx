import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

function Auth() {
  const { lang }    = useLang();
  const navigate    = useNavigate();
  const { loginWithGoogle, loginWithEmail, registerWithEmail } = useAuth();

  const [mode,     setMode]     = useState('login');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [name,     setName]     = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  // ── تسجيل دخول بـ Google ──────────────
  const handleGoogle = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (e) {
      setError(lang === 'ar' ? 'فشل تسجيل الدخول بـ Google' : 'Google sign in failed');
    }
    setLoading(false);
  };

  // ── تسجيل دخول / إنشاء حساب بالإيميل ──
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (mode === 'login') {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password, name);
      }
      navigate('/');
    } catch (e) {
      const errors = {
        'auth/user-not-found':    lang === 'ar' ? 'البريد غير موجود'        : 'Email not found',
        'auth/wrong-password':    lang === 'ar' ? 'كلمة المرور خاطئة'       : 'Wrong password',
        'auth/email-already-in-use': lang === 'ar' ? 'البريد مستخدم بالفعل' : 'Email already in use',
        'auth/weak-password':     lang === 'ar' ? 'كلمة المرور ضعيفة جداً' : 'Password too weak',
        'auth/invalid-email':     lang === 'ar' ? 'البريد غير صحيح'         : 'Invalid email',
      };
      setError(errors[e.code] || (lang === 'ar' ? 'حدث خطأ، حاول مرة أخرى' : 'An error occurred, try again'));
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 'var(--radius-m)',
    border: '1px solid var(--divider)',
    background: 'var(--bg-surface)',
    color: 'var(--text-primary)',
    fontSize: 'var(--font-m)',
    fontFamily: 'Cairo, sans-serif',
    outline: 'none',
    transition: 'var(--transition)',
  };

  const socialBtnStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: 'var(--radius-m)',
    border: '1px solid var(--divider)',
    background: 'var(--bg-card)',
    color: 'var(--text-primary)',
    fontSize: 'var(--font-m)',
    fontFamily: 'Cairo, sans-serif',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontWeight: '600',
    transition: 'var(--transition)',
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
    }}>
      <div style={{ width: '100%', maxWidth: '440px' }}>

        {/* Logo */}
        <div className="text-center mb-4">
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>
            {mode === 'login' ? '👋' : '🚀'}
          </div>
          <h1 className="fw-black mb-1" style={{ fontSize: 'clamp(22px, 4vw, 28px)' }}>
            {mode === 'login'
              ? (lang === 'ar' ? 'أهلاً بعودتك!' : 'Welcome Back!')
              : (lang === 'ar' ? 'ابدأ رحلتك البرمجية' : 'Start Your Coding Journey')}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-s)' }}>
            {mode === 'login'
              ? (lang === 'ar' ? 'سجّل دخولك للمتابعة' : 'Sign in to continue')
              : (lang === 'ar' ? 'أنشئ حسابك مجاناً' : 'Create your free account')}
          </p>
        </div>

        <div className="card p-4">

          {/* Mode tabs */}
          <div className="d-flex mb-4" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-m)', padding: '4px' }}>
            {[
              { key: 'login',    label_ar: 'تسجيل الدخول', label_en: 'Sign In' },
              { key: 'register', label_ar: 'حساب جديد',    label_en: 'Sign Up' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => { setMode(tab.key); setError(''); }}
                style={{
                  flex: 1, padding: '8px',
                  borderRadius: 'var(--radius-s)',
                  border: 'none',
                  background: mode === tab.key ? 'var(--bg-card)' : 'transparent',
                  color: mode === tab.key ? 'var(--primary)' : 'var(--text-hint)',
                  fontWeight: mode === tab.key ? '700' : '500',
                  fontSize: 'var(--font-s)',
                  fontFamily: 'Cairo, sans-serif',
                  cursor: 'pointer',
                  boxShadow: mode === tab.key ? 'var(--shadow-card)' : 'none',
                  transition: 'var(--transition)',
                }}
              >
                {lang === 'ar' ? tab.label_ar : tab.label_en}
              </button>
            ))}
          </div>

          {/* Social login */}
          <div className="d-flex flex-column gap-2 mb-4">
            <button onClick={handleGoogle} disabled={loading} style={socialBtnStyle}>
              <span>🔵</span>
              {lang === 'ar' ? 'متابعة بـ Google' : 'Continue with Google'}
            </button>
          </div>

          {/* Divider */}
          <div className="d-flex align-items-center gap-2 mb-4">
            <div style={{ flex: 1, height: '1px', background: 'var(--divider)' }} />
            <span style={{ color: 'var(--text-hint)', fontSize: 'var(--font-xs)' }}>
              {lang === 'ar' ? 'أو بالبريد الإلكتروني' : 'or with email'}
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--divider)' }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-column gap-3">

              {mode === 'register' && (
                <div>
                  <label style={{ fontSize: 'var(--font-s)', fontWeight: '600', marginBottom: '6px', display: 'block' }}>
                    {lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={lang === 'ar' ? 'أدخل اسمك...' : 'Enter your name...'}
                    required
                    style={inputStyle}
                  />
                </div>
              )}

              <div>
                <label style={{ fontSize: 'var(--font-s)', fontWeight: '600', marginBottom: '6px', display: 'block' }}>
                  {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ fontSize: 'var(--font-s)', fontWeight: '600', marginBottom: '6px', display: 'block' }}>
                  {lang === 'ar' ? 'كلمة المرور' : 'Password'}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={inputStyle}
                />
              </div>

              {mode === 'login' && (
                <div className="text-end">
                  <button
                    type="button"
                    style={{
                      background: 'none', border: 'none',
                      color: 'var(--primary)', fontSize: 'var(--font-xs)',
                      fontFamily: 'Cairo, sans-serif', cursor: 'pointer', fontWeight: '600',
                    }}
                  >
                    {lang === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                  </button>
                </div>
              )}

              {error && (
                <div style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-m)',
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  color: 'var(--red)', fontSize: 'var(--font-s)',
                }}>
                  ❌ {error}
                </div>
              )}

              <button
                type="submit"
                className="btn-primary w-100"
                disabled={loading}
                style={{ padding: '14px', fontSize: 'var(--font-m)', marginTop: '4px' }}
              >
                {loading
                  ? (lang === 'ar' ? 'جاري التحميل...' : 'Loading...')
                  : mode === 'login'
                    ? (lang === 'ar' ? 'تسجيل الدخول' : 'Sign In')
                    : (lang === 'ar' ? 'إنشاء الحساب' : 'Create Account')}
              </button>

            </div>
          </form>

          <div className="text-center mt-3">
            <span style={{ color: 'var(--text-hint)', fontSize: 'var(--font-s)' }}>
              {mode === 'login'
                ? (lang === 'ar' ? 'ليس لديك حساب؟ ' : "Don't have an account? ")
                : (lang === 'ar' ? 'لديك حساب بالفعل؟ ' : 'Already have an account? ')}
            </span>
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              style={{
                background: 'none', border: 'none',
                color: 'var(--primary)', fontSize: 'var(--font-s)',
                fontFamily: 'Cairo, sans-serif', cursor: 'pointer', fontWeight: '700',
              }}
            >
              {mode === 'login'
                ? (lang === 'ar' ? 'أنشئ حساباً' : 'Sign Up')
                : (lang === 'ar' ? 'سجّل دخولك' : 'Sign In')}
            </button>
          </div>
        </div>

        <p className="text-center mt-3" style={{ color: 'var(--text-hint)', fontSize: 'var(--font-xs)' }}>
          {lang === 'ar'
            ? 'بالتسجيل توافق على شروط الاستخدام وسياسة الخصوصية'
            : 'By signing up you agree to our Terms of Service and Privacy Policy'}
        </p>

      </div>
    </div>
  );
}

export default Auth;