import styles from './WhatsappFab.module.scss';

export function WhatsappFab() {
  return (
    <a className={styles.fab} href="https://wa.me/972502937739" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
      <svg viewBox="0 0 32 32">
        <path d="M16.001 3C9.38 3 4 8.373 4 15c0 2.42.71 4.673 1.936 6.568L4 29l7.646-1.9A11.93 11.93 0 0 0 16 27c6.622 0 12-5.373 12-12S22.623 3 16.001 3zm0 21.6c-1.98 0-3.827-.58-5.38-1.578l-.386-.242-4.54 1.128 1.147-4.42-.252-.402A9.55 9.55 0 0 1 5.4 15c0-5.85 4.75-10.6 10.6-10.6S26.6 9.15 26.6 15 21.85 24.6 16 24.6z" />
      </svg>
    </a>
  );
}
