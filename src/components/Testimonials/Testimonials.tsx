import { useTranslation } from 'react-i18next';
import { testimonials } from '../../data/testimonials';
import styles from './Testimonials.module.scss';

export function Testimonials() {
  const { t } = useTranslation('testimonials');

  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{t('eyebrow')}</p>
        <h2>{t('heading')}</h2>
        <div className={styles.grid}>
          {testimonials.map((item) => (
            <div key={item.id} className={styles.card}>
              <p className={styles.quote}>{t(item.quoteKey)}</p>
              <p className={styles.who}>{t(item.whoKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
