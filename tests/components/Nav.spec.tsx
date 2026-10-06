import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Nav } from '../../src/components/Nav/Nav';
import { LanguageEffects } from '../../src/i18n/LanguageEffects';

function renderNav() {
  return render(
    <>
      <LanguageEffects />
      <Nav />
    </>,
  );
}

describe('Nav', () => {
  it('renders the English navigation and booking link', () => {
    renderNav();

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About', hidden: true })).toHaveAttribute('href', '#about');
    expect(screen.getByRole('link', { name: 'Book Ron' })).toHaveAttribute('href', '#contact');
    expect(screen.getByRole('button', { name: 'עברית' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'עברית' }).querySelector('svg')).toBeInTheDocument();
  });

  it('switches to Hebrew RTL and persists the selected language', async () => {
    const user = userEvent.setup();
    renderNav();

    await user.click(screen.getByRole('button', { name: 'עברית' }));

    expect(screen.getByRole('link', { name: 'אודות', hidden: true })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'הזמינו את רון' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'English' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'English' }).querySelector('svg')).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('dir', 'rtl');
    expect(document.documentElement).toHaveAttribute('lang', 'he');
    expect(document.title).toBe("רון עוקבי — די ג'יי");
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      'content',
      "רון עוקבי — מפתח תוכנה ביום ודי ג'יי מתוך תשוקה. הזמינו את רון לחתונות, מסיבות ואירועי חברה.",
    );
    expect(localStorage.getItem('lang')).toBe('he');
  });
});
