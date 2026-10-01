import aboutEn from './locales/en/about.json';
import commonEn from './locales/en/common.json';
import contactEn from './locales/en/contact.json';
import galleryEn from './locales/en/gallery.json';
import heroEn from './locales/en/hero.json';
import lightboxEn from './locales/en/lightbox.json';
import metadataEn from './locales/en/metadata.json';
import navigationEn from './locales/en/navigation.json';
import statementEn from './locales/en/statement.json';
import testimonialsEn from './locales/en/testimonials.json';
import videosEn from './locales/en/videos.json';
import aboutHe from './locales/he/about.json';
import commonHe from './locales/he/common.json';
import contactHe from './locales/he/contact.json';
import galleryHe from './locales/he/gallery.json';
import heroHe from './locales/he/hero.json';
import lightboxHe from './locales/he/lightbox.json';
import metadataHe from './locales/he/metadata.json';
import navigationHe from './locales/he/navigation.json';
import statementHe from './locales/he/statement.json';
import testimonialsHe from './locales/he/testimonials.json';
import videosHe from './locales/he/videos.json';

export const defaultNamespace = 'common';

export const resources = {
  en: {
    about: aboutEn,
    common: commonEn,
    contact: contactEn,
    gallery: galleryEn,
    hero: heroEn,
    lightbox: lightboxEn,
    metadata: metadataEn,
    navigation: navigationEn,
    statement: statementEn,
    testimonials: testimonialsEn,
    videos: videosEn,
  },
  he: {
    about: aboutHe,
    common: commonHe,
    contact: contactHe,
    gallery: galleryHe,
    hero: heroHe,
    lightbox: lightboxHe,
    metadata: metadataHe,
    navigation: navigationHe,
    statement: statementHe,
    testimonials: testimonialsHe,
    videos: videosHe,
  },
} as const;
