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
      <p className={styles.eyebrow}>{t('eyebrow')}</p>
      <h2>{t('heading')}</h2>

      <div className={styles.grid}>
        <svg className={styles.ribbon} viewBox="0 0 200 200" aria-hidden="true">
          <path d="M100 100 C 60 60, 20 70, 10 40" stroke="#ff5b6e" strokeWidth="18" strokeLinecap="round" fill="none" />
          <path d="M100 100 C 70 50, 40 20, 55 5" stroke="#ff9a3c" strokeWidth="18" strokeLinecap="round" fill="none" />
          <path d="M100 100 C 90 45, 100 15, 130 10" stroke="#ffd23f" strokeWidth="18" strokeLinecap="round" fill="none" />
          <path d="M100 100 C 120 55, 150 40, 165 55" stroke="#2fb6a8" strokeWidth="18" strokeLinecap="round" fill="none" />
          <path d="M100 100 C 130 80, 165 85, 180 105" stroke="#2f7bff" strokeWidth="18" strokeLinecap="round" fill="none" />
          <path d="M100 100 C 120 120, 150 150, 140 175" stroke="#6f5bd6" strokeWidth="18" strokeLinecap="round" fill="none" />
        </svg>

        <div className={styles.avatar} />

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
