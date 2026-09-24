import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from 'react';

export type Language = 'en' | 'he';
export type Bilingual = { en: string; he: string };

type LanguageContextValue = {
  language: Language;
  toggleLanguage: () => void;
  translate: (pair: Bilingual) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function getInitialLanguage(): Language {
  try {
    const stored = localStorage.getItem('lang');
    if (stored === 'en' || stored === 'he') return stored;
  } catch {
    // localStorage unavailable — fall through to browser locale
  }
  if (typeof navigator !== 'undefined' && navigator.language?.startsWith('he')) return 'he';
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    try {
      localStorage.setItem('lang', language);
    } catch {
      // ignore — persistence is a nice-to-have, not a requirement
    }
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((previousLanguage) => (previousLanguage === 'he' ? 'en' : 'he'));
  }, []);
  const translate = useCallback((pair: Bilingual) => (language === 'he' ? pair.he : pair.en), [language]);
  const contextValue = useMemo(
    () => ({ language, toggleLanguage, translate }),
    [language, toggleLanguage, translate],
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
