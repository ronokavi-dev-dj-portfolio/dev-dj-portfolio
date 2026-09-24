import { v4 as uuidv4 } from 'uuid';

export type VideoItem = {
  id: string;
  titleEn: string;
  titleHe: string;
  youtubeId: string | null; // real YouTube video ID once available
};

// PLACEHOLDER — replace youtubeId with Ron's real mix/highlight videos.
export const videos: VideoItem[] = [
  { id: uuidv4(), titleEn: 'Mix sample', titleHe: 'דוגמת מיקס', youtubeId: null },
  { id: uuidv4(), titleEn: 'Event highlight reel', titleHe: 'רגעי שיא מאירוע', youtubeId: null },
];
