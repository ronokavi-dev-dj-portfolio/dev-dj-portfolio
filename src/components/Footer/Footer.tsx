import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© 2026 Ron Okavi · רון עוקבי</p>
      <div className={styles.socials}>
        {/* TODO: replace with Ron's real Instagram handle */}
        <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://wa.me/972502937739" target="_blank" rel="noopener noreferrer">WhatsApp</a>
      </div>
    </footer>
  );
}
