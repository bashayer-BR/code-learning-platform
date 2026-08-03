import { createContext, useContext, useState } from 'react';
import translations from '../i18n/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('ar');

  const t = (key) => translations[lang][key] || key;
  const isRTL = lang === 'ar';
  const toggleLang = () => setLang(prev => prev === 'ar' ? 'en' : 'ar');

  return (
    <LanguageContext.Provider value={{ lang, t, isRTL, toggleLang }}>
      <div dir={isRTL ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);