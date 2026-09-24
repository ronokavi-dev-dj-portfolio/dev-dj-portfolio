import { useLanguage } from '../../context/LanguageContext';
import styles from './Hero.module.scss';

export function Hero() {
  const { translate } = useLanguage();

  return (
    <section className={styles.hero}>
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />
      <div className={`${styles.blob} ${styles.blob3}`} />
      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          {translate({ en: 'Software Developer × DJ', he: 'מפתח תוכנה × תקליטן' })}
        </p>
        <h1 className={styles.title}>Ron Okavi</h1>
        <p className={styles.sub}>
          {translate({
            en: "Bringing an engineer's precision and a genuine passion for music to every event — all genres, every crowd, always on point.",
            he: 'מביא דיוק של מהנדס ותשוקה אמיתית למוזיקה לכל אירוע — כל הסגנונות, כל קהל, תמיד בול פגיעה.',
          })}
        </p>
        <a className={styles.btn} href="#contact">
          {translate({ en: 'Book Ron', he: 'הזמינו את רון' })}
        </a>
      </div>
    </section>
  );
}
