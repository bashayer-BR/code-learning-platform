import { createContext, useContext, useState, useEffect } from 'react';
import translations from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang,  setLang]  = useState('ar');
  const [theme, setTheme] = useState('light');

  const t      = (key) => translations[lang][key] || key;
  const isRTL  = lang === 'ar';
  const toggleLang  = () => setLang(prev => prev === 'ar' ? 'en' : 'ar');
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, t, isRTL, toggleLang, theme, toggleTheme }}>
      <div dir={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);