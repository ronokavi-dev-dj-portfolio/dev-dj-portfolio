import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { LanguageProvider } from '../../src/context/LanguageContext';
import { Nav } from '../../src/components/Nav/Nav';

function renderNav() {
  return render(
    <LanguageProvider>
      <Nav />
    </LanguageProvider>,
  );
}

describe('Nav', () => {
  it('renders the English navigation and booking link', () => {
    renderNav();

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About', hidden: true })).toHaveAttribute('href', '#about');
    expect(screen.getByRole('link', { name: 'Book Ron' })).toHaveAttribute('href', '#contact');
    expect(screen.getByRole('button', { name: 'עברית' })).toBeInTheDocument();
  });

  it('switches to Hebrew RTL and persists the selected language', async () => {
    const user = userEvent.setup();
    renderNav();

    await user.click(screen.getByRole('button', { name: 'עברית' }));

    expect(screen.getByRole('link', { name: 'אודות', hidden: true })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'הזמינו את רון' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'English' })).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('dir', 'rtl');
    expect(document.documentElement).toHaveAttribute('lang', 'he');
    expect(localStorage.getItem('lang')).toBe('he');
  });
});
