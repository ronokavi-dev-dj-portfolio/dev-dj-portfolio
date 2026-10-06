import { v4 as uuidv4 } from 'uuid';

export type VideoItem = {
  id: string;
  titleKey: 'items.mixSample.title' | 'items.eventHighlight.title';
  youtubeId: string | null; // real YouTube video ID once available
};

// PLACEHOLDER — replace youtubeId with Ron's real mix/highlight videos.
export const videos: VideoItem[] = [
  { id: uuidv4(), titleKey: 'items.mixSample.title', youtubeId: null },
  { id: uuidv4(), titleKey: 'items.eventHighlight.title', youtubeId: null },
];
