import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { gallery } from '../../data/gallery';
import { Lightbox } from '../Lightbox/Lightbox';
import styles from './Gallery.module.scss';

export function Gallery() {
  const { translate } = useLanguage();
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const openItem = gallery.find((galleryItem) => galleryItem.id === openItemId) ?? null;

  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>{translate({ en: 'The moments', he: 'הרגעים' })}</p>
        <h2>{translate({ en: 'Gallery', he: 'גלריה' })}</h2>

        <div className={styles.grid}>
          {gallery.map((galleryItem) => (
            <button
              key={galleryItem.id}
              type="button"
              className={styles.item}
              aria-label={translate({ en: galleryItem.altEn, he: galleryItem.altHe })}
              onClick={() => setOpenItemId(galleryItem.id)}
            >
              {galleryItem.src ? (
                <img className={styles.itemPhoto} src={galleryItem.src} alt={translate({ en: galleryItem.altEn, he: galleryItem.altHe })} loading="lazy" />
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
          eyebrow={translate({ en: 'Visual archive', he: 'ארכיון ויזואלי' })}
          title={translate({ en: openItem.altEn, he: openItem.altHe })}
          onClose={() => setOpenItemId(null)}
        >
          {openItem.src ? (
            <img src={openItem.src} alt={translate({ en: openItem.altEn, he: openItem.altHe })} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
