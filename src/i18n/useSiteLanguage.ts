import { useTranslation } from 'react-i18next';
import type { SiteLanguage } from './index';

export function useSiteLanguage() {
  const { i18n } = useTranslation();
  const language: SiteLanguage = i18n.resolvedLanguage === 'he' ? 'he' : 'en';

  const toggleLanguage = () => {
    void i18n.changeLanguage(language === 'he' ? 'en' : 'he');
  };

  return { language, toggleLanguage };
}
