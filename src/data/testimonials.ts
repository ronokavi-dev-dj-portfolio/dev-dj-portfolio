import type { Bilingual } from '../context/LanguageContext';

export type Testimonial = {
  id: string;
  quote: Bilingual;
  who: Bilingual;
};

// PLACEHOLDER CONTENT — replace with real client testimonials.
// See the update-site-content skill (.claude/skills/) for how to add new ones.
export const testimonials: Testimonial[] = [
  {
    id: 't-placeholder-1',
    quote: {
      en: '"Ron read the room perfectly all night — everyone was on the floor."',
      he: '"רון קרא את הקהל מושלם כל הערב — כולם היו על הרחבה."',
    },
    who: { en: 'Dana K. — Wedding, June 2026', he: 'דנה כ. — חתונה, יוני 2026' },
  },
  {
    id: 't-placeholder-2',
    quote: {
      en: '"Professional, on time, and the sound quality was flawless."',
      he: '"מקצועי, בזמן, ואיכות הסאונד הייתה מושלמת."',
    },
    who: { en: 'Company XYZ — Corporate Event', he: 'חברת XYZ — אירוע חברה' },
  },
  {
    id: 't-placeholder-3',
    quote: {
      en: "\"Best party we've thrown. Booking him again.\"",
      he: '"המסיבה הכי טובה שעשינו. מזמינים אותו שוב."',
    },
    who: { en: 'Tom S. — Birthday', he: 'תום ס. — יום הולדת' },
  },
];
