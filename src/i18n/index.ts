import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { defaultNamespace, resources } from './resources';

export type SiteLanguage = keyof typeof resources;

export function getInitialLanguage(): SiteLanguage {
  try {
    const storedLanguage = localStorage.getItem('lang');
    if (storedLanguage === 'en' || storedLanguage === 'he') return storedLanguage;
  } catch {
    // Persistence is optional; fall through to the browser locale.
  }

  if (typeof navigator !== 'undefined' && navigator.language?.startsWith('he')) return 'he';
  return 'en';
}

void i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  supportedLngs: ['en', 'he'],
  defaultNS: defaultNamespace,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
