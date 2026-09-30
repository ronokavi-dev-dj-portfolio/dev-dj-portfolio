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
