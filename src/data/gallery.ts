import { v4 as uuidv4 } from 'uuid';

export type GalleryItem = {
  id: string;
  // Real image path once photos are added, e.g. "/images/gig-2026-06-wedding-01.webp"
  src: string | null;
  altEn: string;
  altHe: string;
  glow: string; // accent color used for the placeholder look until a real photo exists
};

const glowCycle = [
  'rgba(255,91,110,0.55)', 'rgba(139,111,240,0.55)', 'rgba(74,139,255,0.5)',
  'rgba(47,182,168,0.5)', 'rgba(255,154,60,0.5)', 'rgba(255,91,110,0.4)',
  'rgba(139,111,240,0.4)', 'rgba(74,139,255,0.4)', 'rgba(47,182,168,0.4)',
];

// PLACEHOLDER — no real photos yet. Once Ron has gig photos, add them here
// with a real `src` (see the update-site-content skill for the exact steps).
export const gallery: GalleryItem[] = glowCycle.map((glow) => ({
  id: uuidv4(),
  src: null,
  altEn: 'Photo from a Ron Okavi event',
  altHe: 'תמונה מאירוע של רון עוקבי',
  glow,
}));
