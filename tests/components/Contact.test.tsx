import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Contact } from '../../src/components/Contact/Contact';
import { LanguageProvider } from '../../src/context/LanguageContext';
import { Nav } from '../../src/components/Nav/Nav';

function renderContact() {
  return render(
    <LanguageProvider>
      <Nav />
      <Contact />
    </LanguageProvider>,
  );
}

describe('Contact', () => {
  it('reports required fields when submitted empty', async () => {
    const user = userEvent.setup();
    renderContact();

    await user.click(screen.getByRole('button', { name: 'Send' }));

    expect(screen.getAllByText('This field is required')).toHaveLength(4);
  });

  it('rejects an invalid email or phone contact', async () => {
    const user = userEvent.setup();
    renderContact();

    await user.type(screen.getByPlaceholderText('Name'), 'Ron');
    await user.type(screen.getByPlaceholderText('Your email or phone'), 'not-a-contact');
    fireEvent.change(screen.getByLabelText('Event date'), { target: { value: '2026-10-01' } });
    await user.type(screen.getByPlaceholderText('Event type'), 'Birthday');
    await user.type(screen.getByPlaceholderText('Tell me about your event'), 'A dance party');
    await user.click(screen.getByRole('button', { name: 'Send' }));

    expect(screen.getByText('Enter a valid email or phone number')).toBeInTheDocument();
  });

  it('renders event date as a calendar input and allows an empty message', () => {
    renderContact();

    expect(screen.getByLabelText('Event date')).toHaveAttribute('type', 'date');
    expect(screen.getByLabelText('Event date')).toHaveAttribute('lang', 'en-GB');
    expect(screen.getByLabelText('Event date')).toHaveAttribute('dir', 'ltr');
    expect(screen.getByPlaceholderText('Tell me about your event')).not.toBeRequired();
  });

  it('moves the date field to Hebrew RTL when the language changes', async () => {
    const user = userEvent.setup();
    renderContact();

    await user.click(screen.getByRole('button', { name: 'עברית' }));

    expect(screen.getByLabelText('תאריך האירוע')).toHaveAttribute('lang', 'he');
    expect(screen.getByLabelText('תאריך האירוע')).toHaveAttribute('dir', 'rtl');
  });

  it('clears validation messages when the language changes', async () => {
    const user = userEvent.setup();
    renderContact();

    await user.click(screen.getByRole('button', { name: 'Send' }));
    expect(screen.getAllByText('This field is required')).toHaveLength(4);

    await user.click(screen.getByRole('button', { name: 'עברית' }));

    expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
    expect(screen.queryByText('שדה חובה')).not.toBeInTheDocument();
  });
});
