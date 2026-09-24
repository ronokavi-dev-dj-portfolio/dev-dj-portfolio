import { useLanguage } from '../../context/LanguageContext';
import styles from './Statement.module.scss';

export function Statement() {
  const { language } = useLanguage();

  return (
    <section className={styles.statement}>
      <p className={styles.text}>
        {language === 'he' ? (
          <>נוצר כדי להניע <span className={styles.accentWord}>קהל</span>.</>
        ) : (
          <>Made to move a <span className={styles.accentWord}>crowd</span>.</>
        )}
      </p>
    </section>
  );
}
