import { useLanguage } from '../../context/LanguageContext';
import { genres } from '../../data/genres';
import styles from './About.module.scss';

const STATS = [
  { num: '17', en: 'Years coding', he: 'שנות פיתוח' },
  { num: '2.5', en: 'Years DJing', he: 'שנות תקליטנות' },
  { num: String(genres.length), en: 'Genres played', he: "ז'אנרים" },
  { num: '100%', en: 'Passion', he: 'תשוקה' },
];

export function About() {
  const { translate } = useLanguage();

  return (
    <section id="about" className={styles.section}>
      <p className={styles.eyebrow}>{translate({ en: 'My story', he: 'הסיפור שלי' })}</p>
      <h2>{translate({ en: 'About', he: 'אודות' })}</h2>

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
          {translate({
            en: "Hi, I'm Ron. 17 years as a software developer, 2.5 years behind the decks — and it's been a wild, rewarding ride. What started as a passion project turned into something people actually book me for. At the end of the day, I do this for the joy, the love, and the pure passion of watching a crowd come alive, wherever the party is — a hall, a backyard, a rooftop, or a pool party. I work closely with everyone who books me to tailor the night exactly to their event, at prices that stay fair and accessible. I bring the same care I put into code into every set: reading the room, staying organized, and making sure the tech never gets in the way of the night.",
            he: 'היי, אני רון. 17 שנה כמפתח תוכנה, 2.5 שנים מאחורי הפטיפונים — וזו הייתה חוויה מטורפת ומספקת. מה שהתחיל כתחביב הפך למשהו שאנשים באמת מזמינים אותי בשבילו. בסופו של דבר אני עושה את זה מתוך שמחה, אהבה ותשוקה אמיתית — לראות קהל שלם קם לחיים, לא משנה איפה המסיבה — אולם, חצר, גג, או מסיבת בריכה. אני עובד צמוד עם כל מי שמזמין אותי כדי להתאים את הערב בדיוק לאירוע שלו, במחירים הוגנים ונוחים. אני מביא לכל סט את אותה תשומת הלב שאני מביא לקוד: קריאת הקהל, ארגון, ודאגה שהטכנולוגיה לעולם לא תפריע לערב.',
          })}
        </p>
      </div>

      <div className={styles.genres}>
        {genres.map((genre) => (
          <span key={genre.en} className={styles.genrePill}>{translate(genre)}</span>
        ))}
      </div>

      <div className={styles.stats}>
        {STATS.map((stat) => (
          <div key={stat.en}>
            <div className={styles.statNum}>{stat.num}</div>
            <div className={styles.statLabel}>{translate({ en: stat.en, he: stat.he })}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
