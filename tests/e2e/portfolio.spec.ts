import { expect, test } from '@playwright/test';

test.describe('portfolio experience', () => {
  test('renders the main sections and navigation', async ({ page }) => {
    await page.goto('./');

    await expect(page).toHaveTitle('Ron Okavi — DJ');
    await expect(page.getByRole('heading', { name: 'Ron Okavi' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Gallery' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Videos' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Get in touch' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Book Ron' }).first()).toHaveAttribute('href', '#contact');
  });

  test('switches language and document direction', async ({ page }) => {
    await page.goto('./');
    const initialUrl = page.url();

    await page.getByRole('button', { name: 'Send' }).click();
    await expect(page.getByText('This field is required')).toHaveCount(4);

    await page.getByRole('button', { name: 'עברית' }).click();

    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect(page.locator('html')).toHaveAttribute('lang', 'he');
    await expect(page.getByRole('link', { name: 'הזמינו את רון' }).first()).toBeVisible();
    await expect(page.getByLabel('תאריך האירוע')).toHaveAttribute('lang', 'he');
    await expect(page.getByLabel('תאריך האירוע')).toHaveAttribute('dir', 'rtl');
    await expect(page.getByText('This field is required')).toHaveCount(0);
    await expect(page.getByText('שדה חובה')).toHaveCount(0);
    await expect(page).toHaveURL(initialUrl);

    await page.getByRole('button', { name: 'English' }).click();

    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page).toHaveURL(initialUrl);
  });

  test('validates the contact form before submission', async ({ page }) => {
    await page.goto('./');

    await page.getByRole('button', { name: 'Send' }).click();

    await expect(page.getByText('This field is required')).toHaveCount(4);
    await expect(page.getByLabel('Event date')).toHaveAttribute('type', 'date');
    await expect(page.getByLabel('Event date')).toHaveAttribute('lang', 'en-GB');
    await expect(page.getByLabel('Event date')).toHaveAttribute('dir', 'ltr');
    await expect(page).toHaveURL(/dev-dj-portfolio\/$/);
  });

  test('opens and closes gallery lightbox with the keyboard', async ({ page }) => {
    await page.goto('./');

    await page.getByRole('button', { name: 'Photo from a Ron Okavi event' }).first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.keyboard.press('Escape');

    await expect(page.getByRole('dialog')).toBeHidden();
  });

  test('does not overflow on a mobile viewport', async ({ page }) => {
    await page.goto('./');

    const dimensions = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }));

    expect(dimensions.documentWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
  });
});
