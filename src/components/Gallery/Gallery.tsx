import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gallery } from '../../data/gallery';
import { Lightbox } from '../Lightbox/Lightbox';
import styles from './Gallery.module.scss';

export function Gallery() {
  const { t } = useTranslation('gallery');
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const openItem = gallery.find((galleryItem) => galleryItem.id === openItemId) ?? null;

  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{t('eyebrow')}</p>
        <h2>{t('heading')}</h2>

        <div className={styles.grid}>
          {gallery.map((galleryItem) => (
            <button
              key={galleryItem.id}
              type="button"
              className={styles.item}
              aria-label={t(galleryItem.altKey)}
              onClick={() => setOpenItemId(galleryItem.id)}
            >
              {galleryItem.src ? (
                <img className={styles.itemPhoto} src={galleryItem.src} alt={t(galleryItem.altKey)} loading="lazy" />
              ) : (
                <>
                  <div className={styles.itemBg} style={{ ['--glow' as string]: galleryItem.glow }} />
                  <div className={styles.itemVignette} />
                </>
              )}
              <span className={styles.hoverIcon}>
                <span>
                  <svg viewBox="0 0 24 24"><path d="M9.5 3a6.5 6.5 0 1 0 4.23 11.44l4.9 4.9a1 1 0 0 0 1.42-1.42l-4.9-4.9A6.5 6.5 0 0 0 9.5 3zm0 2a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z" /></svg>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {openItem && (
        <Lightbox
          eyebrow={t('visualArchive')}
          title={t(openItem.altKey)}
          onClose={() => setOpenItemId(null)}
        >
          {openItem.src ? (
            <img src={openItem.src} alt={t(openItem.altKey)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{
              position: 'absolute', inset: 0,
              background: `radial-gradient(circle at 30% 20%, ${openItem.glow} 0%, transparent 55%), linear-gradient(200deg, #0c0c0f 20%, #17171b 100%)`,
            }} />
          )}
        </Lightbox>
      )}
    </section>
  );
}
