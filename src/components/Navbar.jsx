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
    <nav className="navbar navbar-expand-lg sticky-top" style={{
      backgroundColor: 'var(--bg-card)',
      borderBottom: '1px solid var(--divider)',
      boxShadow: 'var(--shadow-card)',
      padding: '0 32px',
      height: '64px',
    }}>
      {/* Logo */}
      <Link className="navbar-brand fw-black" to="/" style={{
        background: 'var(--gradient-primary)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: 'var(--font-l)',
      }}>
        {'</> برمج'}
      </Link>

      {/* Hamburger */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMenu"
        style={{ border: '1px solid var(--divider)' }}
      >
        <span className="navbar-toggler-icon" />
      </button>

      {/* Links */}
      <div className="collapse navbar-collapse" id="navMenu">
        <ul className="navbar-nav mx-auto gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li className="nav-item" key={item.path}>
                <Link
                  to={item.path}
                  className="nav-link d-flex align-items-center gap-1"
                  style={{
                    fontSize: 'var(--font-s)',
                    fontWeight: isActive ? '700' : '500',
                    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'rgba(232, 130, 74, 0.10)' : 'transparent',
                    border: isActive ? '1px solid rgba(232, 130, 74, 0.2)' : '1px solid transparent',
                    borderRadius: 'var(--radius-m)',
                    padding: '6px 12px',
                    transition: 'var(--transition)',
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{t(item.key)}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side */}
        <div className="d-flex align-items-center gap-2">
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
            {lang === 'ar' ? 'EN' : 'عربي'}
          </button>

          <button className="btn-primary" style={{ padding: '8px 20px' }}>
            {t('nav_try')}
          </button>

          {/* <div style={{
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
          </div> */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;