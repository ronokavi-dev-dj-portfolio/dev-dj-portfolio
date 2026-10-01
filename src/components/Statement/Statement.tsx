import { Trans, useTranslation } from 'react-i18next';
import styles from './Statement.module.scss';

export function Statement() {
  const { t } = useTranslation('statement');

  return (
    <section className={styles.statement}>
      <p className={styles.text}>
        <Trans
          t={t}
          i18nKey="message"
          components={{ accent: <span className={styles.accentWord} /> }}
        />
      </p>
    </section>
  );
}
