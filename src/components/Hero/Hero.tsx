import { useTranslation } from 'react-i18next';
import styles from './Hero.module.scss';

export function Hero() {
  const { t } = useTranslation('hero');
  const { t: commonT } = useTranslation('common');

  return (
    <section className={styles.hero}>
      <div className={`${styles.blob} ${styles.blob1}`} />
      <div className={`${styles.blob} ${styles.blob2}`} />
      <div className={`${styles.blob} ${styles.blob3}`} />
      <div className={styles.inner}>
        <p className={styles.eyebrow}>
          {t('eyebrow')}
        </p>
        <h1 className={styles.title}>{commonT('brand')}</h1>
        <p className={styles.sub}>
          {t('subtitle')}
        </p>
        <a className={styles.btn} href="#contact">
          {t('book')}
        </a>
      </div>
    </section>
  );
}
