import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { videos } from '../../data/videos';
import { Lightbox } from '../Lightbox/Lightbox';
import styles from './Videos.module.scss';

export function Videos() {
  const { t } = useTranslation('videos');
  const [openItemId, setOpenItemId] = useState<string | null>(null);
  const openItem = videos.find((videoItem) => videoItem.id === openItemId) ?? null;

  return (
    <section id="videos" className={styles.section}>
      <p className={styles.eyebrow}>{t('eyebrow')}</p>
      <h2>{t('heading')}</h2>

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
            <span className={styles.label}>{t(videoItem.titleKey)}</span>
          </button>
        ))}
      </div>

      {openItem && (
        <Lightbox
          isVideo
          eyebrow={t('liveSession')}
          title={t(openItem.titleKey)}
          onClose={() => setOpenItemId(null)}
        >
          {openItem.youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${openItem.youtubeId}?autoplay=1`}
              title={t(openItem.titleKey)}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--muted)', background: '#101013', fontSize: '0.9rem', padding: '1rem', textAlign: 'center',
            }}>
              {t('comingSoon')}
            </div>
          )}
        </Lightbox>
      )}
    </section>
  );
}
