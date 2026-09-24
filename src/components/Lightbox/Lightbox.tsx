import { useEffect, useId, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import styles from './Lightbox.module.scss';

type LightboxProps = {
  onClose: () => void;
  isVideo?: boolean;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
};

export function Lightbox({ onClose, isVideo, eyebrow, title, children }: LightboxProps) {
  const { language } = useLanguage();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    closeBtnRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const shareText = language === 'he' ? 'תראו את זה מרון עוקבי!' : 'Check this out from Ron Okavi!';
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Ron Okavi', text: shareText, url: shareUrl });
      } catch {
        // user cancelled the native share sheet — nothing to do
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
      } catch {
        // clipboard unavailable — fail silently, share button still visible
      }
    }
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className={styles.ambient} aria-hidden="true" />
      <div className={`${styles.stage} ${language === 'he' ? styles.rtl : styles.ltr}`} dir={language === 'he' ? 'rtl' : 'ltr'}>
        <header className={styles.header}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <span className={styles.headerRule} aria-hidden="true" />
          <span className={styles.headerHint}>ESC / CLOSE</span>
        </header>

        <div className={styles.mediaFrame}>
          <div className={`${styles.media} ${isVideo ? styles.video : ''}`}>
            <div className={styles.mediaGlow} aria-hidden="true" />
            <button ref={closeBtnRef} type="button" className={styles.closeBtn} aria-label="Close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
            {children}
          </div>
        </div>

        <footer className={styles.footer}>
          <div className={styles.caption}>
            <span className={styles.captionMark} aria-hidden="true">/</span>
            <h2 id={titleId}>{title}</h2>
          </div>
          <div className={styles.actions}>
            <button type="button" className={styles.actionBtn} onClick={handleShare}>
                <svg viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L7.04 9.81C6.5 9.31 5.79 9 5 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.91 2.92 2.91s2.92-1.3 2.92-2.91-1.31-2.92-2.92-2.92z" /></svg>
              {language === 'he' ? 'שתף' : 'Share'}
            </button>
            <a className={`${styles.actionBtn} ${styles.whatsapp}`} href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 32 32"><path d="M16.001 3C9.38 3 4 8.373 4 15c0 2.42.71 4.673 1.936 6.568L4 29l7.646-1.9A11.93 11.93 0 0 0 16 27c6.622 0 12-5.373 12-12S22.623 3 16.001 3zm0 21.6c-1.98 0-3.827-.58-5.38-1.578l-.386-.242-4.54 1.128 1.147-4.42-.252-.402A9.55 9.55 0 0 1 5.4 15c0-5.85 4.75-10.6 10.6-10.6S26.6 9.15 26.6 15 21.85 24.6 16 24.6z" /></svg>
              WhatsApp
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
