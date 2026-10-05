import { describe, expect, it } from 'vitest';
import i18n from '../../src/i18n';
import { resources } from '../../src/i18n/resources';

function getLeafPaths(value: unknown, prefix = ''): string[] {
  if (typeof value === 'string') return [prefix];
  if (!value || typeof value !== 'object') return [];

  return Object.entries(value).flatMap(([key, child]) =>
    getLeafPaths(child, prefix ? `${prefix}.${key}` : key),
  );
}

describe('translation resources', () => {
  it('keeps English and Hebrew namespace keys in sync', () => {
    expect(Object.keys(resources.he).sort()).toEqual(Object.keys(resources.en).sort());

    for (const namespace of Object.keys(resources.en) as Array<keyof typeof resources.en>) {
      expect(getLeafPaths(resources.he[namespace]).sort()).toEqual(
        getLeafPaths(resources.en[namespace]).sort(),
      );
    }
  });

  it('interpolates generated contact copy in both languages', () => {
    expect(i18n.t('email.subject', { ns: 'contact', lng: 'en', name: 'Dana' })).toBe(
      'New booking inquiry from Dana',
    );
    expect(i18n.t('email.subject', { ns: 'contact', lng: 'he', name: 'דנה' })).toBe(
      'פנייה חדשה להזמנה מאת דנה',
    );
  });
});
