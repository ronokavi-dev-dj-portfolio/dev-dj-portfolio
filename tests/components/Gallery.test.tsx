import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Gallery } from '../../src/components/Gallery/Gallery';
import { LanguageProvider } from '../../src/context/LanguageContext';

function renderGallery() {
  return render(
    <LanguageProvider>
      <Gallery />
    </LanguageProvider>,
  );
}

describe('Gallery and Lightbox', () => {
  it('opens a gallery item and closes it with Escape', async () => {
    const user = userEvent.setup();
    renderGallery();

    await user.click(screen.getAllByRole('button', { name: 'Photo from a Ron Okavi event' })[0]);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus();

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
