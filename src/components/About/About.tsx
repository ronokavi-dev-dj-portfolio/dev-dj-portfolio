import { useTranslation } from 'react-i18next';
import { genres } from '../../data/genres';
import styles from './About.module.scss';

export function About() {
  const { t } = useTranslation('about');
  const stats = [
    { id: 'years-coding', value: t('stats.yearsCoding.value'), label: t('stats.yearsCoding.label') },
    { id: 'years-djing', value: t('stats.yearsDjing.value'), label: t('stats.yearsDjing.label') },
    { id: 'genres-played', value: String(genres.length), label: t('stats.genresPlayed') },
    { id: 'passion', value: t('stats.passion.value'), label: t('stats.passion.label') },
  ];

  return (
    <section id="about" className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>{t('eyebrow')}</p>
          <h2>{t('heading')}</h2>
        </div>

        <div className={styles.portrait} aria-hidden="true">
          <div className={styles.halo} />
          <div className={styles.avatar}>
            <svg className={styles.silhouette} viewBox="0 0 240 240" focusable="false">
              <circle cx="120" cy="82" r="42" fill="currentColor" opacity="0.62" />
              <path d="M34 240c6-53 37-88 86-88s80 35 86 88H34Z" fill="currentColor" opacity="0.48" />
            </svg>
          </div>
        </div>

        <p className={styles.bio}>
          {t('bio')}
        </p>
      </div>

      <div className={styles.genres}>
        {genres.map((genre) => (
          <span key={genre.id} className={styles.genrePill}>{t(genre.labelKey)}</span>
        ))}
      </div>

      <div className={styles.stats}>
        {stats.map((stat) => (
          <div key={stat.id}>
            <div className={styles.statNum}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
