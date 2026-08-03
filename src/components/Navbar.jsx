import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

function Navbar() {
  const location = useLocation();
  const { t, lang, toggleLang } = useLang();

  const navItems = [
    { path: '/',           key: 'nav_home',       icon: '🏠' },
    { path: '/lessons',    key: 'nav_lessons',    icon: '📚' },
    { path: '/editor',     key: 'nav_editor',     icon: '💻' },
    { path: '/challenges', key: 'nav_challenges', icon: '🏆' },
    { path: '/ai',         key: 'nav_ai',         icon: '🤖' },
    { path: '/projects',   key: 'nav_projects',   icon: '🚀' },
    { path: '/roadmap',    key: 'nav_roadmap',    icon: '🗺️' },
    { path: '/community',  key: 'nav_community',  icon: '👥' },
  ];

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      height: '64px',
      backgroundColor: 'var(--bg-card)',
      borderBottom: '1px solid var(--divider)',
      boxShadow: 'var(--shadow-card)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Logo */}
      <span style={{
        background: 'var(--gradient-primary)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontWeight: '900',
        fontSize: 'var(--font-l)',
      }}>
        {'</> برمج'}
      </span>

      {/* Links */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-m)',
                fontSize: 'var(--font-s)',
                fontWeight: isActive ? '700' : '500',
                color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'rgba(232, 130, 74, 0.10)' : 'transparent',
                border: isActive ? '1px solid rgba(232, 130, 74, 0.2)' : '1px solid transparent',
                transition: 'var(--transition)',
              }}
            >
              <span>{item.icon}</span>
              <span>{t(item.key)}</span>
            </Link>
          );
        })}
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-s)' }}>

        {/* Language toggle */}
        <button
          onClick={toggleLang}
          style={{
            padding: '6px 14px',
            borderRadius: 'var(--radius-xl)',
            background: 'var(--bg-surface)',
            border: '1px solid var(--divider)',
            color: 'var(--text-secondary)',
            fontSize: 'var(--font-s)',
            fontWeight: '600',
            fontFamily: 'Cairo, sans-serif',
            cursor: 'pointer',
            transition: 'var(--transition)',
          }}
        >
          {lang === 'ar' ? 'EN' : 'AR'}
        </button>

        <button className="btn-primary" style={{ padding: '8px 20px' }}>
          {t('nav_try')}
        </button>

        {/* Avatar */}
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'var(--gradient-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: '700',
          fontSize: 'var(--font-s)',
          cursor: 'pointer',
        }}>
          م
        </div>
      </div>
    </nav>
  );
}

export default Navbar;