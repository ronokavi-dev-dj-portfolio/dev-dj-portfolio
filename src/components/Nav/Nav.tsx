import { useTranslation } from 'react-i18next';
import { useSiteLanguage } from '../../i18n/useSiteLanguage';
import styles from './Nav.module.scss';

const NAV_LINKS = [
  { href: '#about', labelKey: 'links.about' },
  { href: '#gallery', labelKey: 'links.gallery' },
  { href: '#videos', labelKey: 'links.videos' },
  { href: '#testimonials', labelKey: 'links.testimonials' },
  { href: '#contact', labelKey: 'links.contact' },
] as const;

export function Nav() {
  const { t } = useTranslation('navigation');
  const { t: commonT } = useTranslation('common');
  const { language, toggleLanguage } = useSiteLanguage();

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.logo}>{commonT('brandUppercase')}</div>
        <ul className={styles.links}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{t(link.labelKey)}</a>
            </li>
          ))}
        </ul>
        <div className={styles.right}>
          <button type="button" className={styles.langToggle} onClick={toggleLanguage}>
            {language === 'he' ? (
              <svg className={styles.flag} viewBox="0 0 60 30" aria-hidden="true" focusable="false">
                <rect width="60" height="30" fill="#012169" />
                <path d="M0 0 60 30M60 0 0 30" stroke="#fff" strokeWidth="6" />
                <path d="M0 0 60 30M60 0 0 30" stroke="#c8102e" strokeWidth="2" />
                <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
                <path d="M30 0v30M0 15h60" stroke="#c8102e" strokeWidth="6" />
              </svg>
            ) : (
              <svg className={styles.flag} viewBox="0 0 60 30" aria-hidden="true" focusable="false">
                <rect width="60" height="30" fill="#fff" />
                <path d="m30 7 6.5 11h-13L30 7Zm0 16 6.5-11h-13L30 23Z" fill="#fff" stroke="#0038b8" strokeWidth="1.5" />
                <path d="M0 4h60v3H0zm0 19h60v3H0z" fill="#0038b8" />
              </svg>
            )}
            {language === 'he' ? commonT('languages.english') : commonT('languages.hebrew')}
          </button>
          <a className={styles.cta} href="#contact">
            {t('book')}
          </a>
        </div>
      </div>
    </nav>
  );
}
