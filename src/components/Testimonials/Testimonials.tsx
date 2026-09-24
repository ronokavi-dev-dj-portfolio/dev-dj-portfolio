import { useLanguage } from '../../context/LanguageContext';
import { testimonials } from '../../data/testimonials';
import styles from './Testimonials.module.scss';

export function Testimonials() {
  const { translate } = useLanguage();

  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{translate({ en: "Don't take my word for it", he: 'לא רק אני אומר' })}</p>
        <h2>{translate({ en: 'What people say', he: 'מה אומרים עליי' })}</h2>
        <div className={styles.grid}>
          {testimonials.map((item) => (
            <div key={item.id} className={styles.card}>
              <p className={styles.quote}>{translate(item.quote)}</p>
              <p className={styles.who}>{translate(item.who)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
