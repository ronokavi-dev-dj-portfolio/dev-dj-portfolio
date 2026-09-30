import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';

export function Footer() {
  const { t } = useTranslation('common');

  return (
    <footer className={styles.footer}>
      <p>{t('footer.copyright')}</p>
      <div className={styles.socials}>
        {/* TODO: replace with Ron's real Instagram handle */}
        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">{t('social.instagram')}</a>
        <a href="https://wa.me/972502937739" target="_blank" rel="noopener noreferrer">{t('social.whatsapp')}</a>
      </div>
    </footer>
  );
}
