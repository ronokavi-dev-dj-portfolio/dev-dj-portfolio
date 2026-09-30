import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSiteLanguage } from './useSiteLanguage';

export function LanguageEffects() {
  const { t } = useTranslation('metadata');
  const { language } = useSiteLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.title = t('title');
    let descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!descriptionMeta) {
      descriptionMeta = document.createElement('meta');
      descriptionMeta.name = 'description';
      document.head.append(descriptionMeta);
    }
    descriptionMeta.content = t('description');

    try {
      localStorage.setItem('lang', language);
    } catch {
      // Persistence is optional when storage is unavailable.
    }
  }, [language, t]);

  return null;
}
