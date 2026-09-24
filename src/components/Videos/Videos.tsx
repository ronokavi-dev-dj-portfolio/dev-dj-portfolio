import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { videos } from '../../data/videos';
import { Lightbox } from '../Lightbox/Lightbox';
import styles from './Videos.module.scss';

export function Videos() {
  const { translate } = useLanguage();
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const openItem = videos.find((videoItem) => videoItem.id === openItemId) ?? null;

  return (
    <section id="videos" className={styles.section}>
      <p className={styles.eyebrow}>{translate({ en: 'See it live', he: 'לראות את זה חי' })}</p>
      <h2>{translate({ en: 'Videos', he: 'וידאו' })}</h2>

      <div className={styles.grid}>
        {videos.map((videoItem) => (
          <button key={videoItem.id} type="button" className={styles.item} onClick={() => setOpenItemId(videoItem.id)}>
            <div className={styles.itemBg} />
            <div className={styles.itemVignette} />
            <span className={styles.hoverIcon}>
              <span>
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </span>
            </span>
            <span className={styles.label}>{translate({ en: videoItem.titleEn, he: videoItem.titleHe })}</span>
          </button>
        ))}
      </div>

      {openItem && (
        <Lightbox
          isVideo
          eyebrow={translate({ en: 'Live session', he: 'סשן חי' })}
          title={translate({ en: openItem.titleEn, he: openItem.titleHe })}
          onClose={() => setOpenItemId(null)}
        >
          {openItem.youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${openItem.youtubeId}?autoplay=1`}
              title={openItem.titleEn}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--muted)', background: '#101013', fontSize: '0.9rem', padding: '1rem', textAlign: 'center',
            }}>
              {translate({ en: 'Video coming soon', he: 'הוידאו בקרוב' })}
            </div>
          )}
        </Lightbox>
      )}
    </section>
  );
}
