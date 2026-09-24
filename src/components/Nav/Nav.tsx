import { useLanguage } from '../../context/LanguageContext';
import styles from './Nav.module.scss';

const NAV_LINKS = [
  { href: '#about', en: 'About', he: 'אודות' },
  { href: '#gallery', en: 'Gallery', he: 'גלריה' },
  { href: '#videos', en: 'Videos', he: 'וידאו' },
  { href: '#testimonials', en: 'Reviews', he: 'המלצות' },
  { href: '#contact', en: 'Contact', he: 'צור קשר' },
];

export function Nav() {
  const { language, toggleLanguage, translate } = useLanguage();

  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <div className={styles.logo}>RON OKAVI</div>
        <ul className={styles.links}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{translate({ en: link.en, he: link.he })}</a>
            </li>
          ))}
        </ul>
        <div className={styles.right}>
          <button type="button" className={styles.langToggle} onClick={toggleLanguage}>
            {language === 'he' ? 'English' : 'עברית'}
          </button>
          <a className={styles.cta} href="#contact">
            {translate({ en: 'Book Ron', he: 'הזמינו את רון' })}
          </a>
        </div>
      </div>
    </nav>
  );
}
