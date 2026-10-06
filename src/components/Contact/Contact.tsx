import { FormEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSiteLanguage } from '../../i18n/useSiteLanguage';
import styles from './Contact.module.scss';

const RON_EMAIL = 'ronokavi@gmail.com';

// Once Ron creates a free Formspree account (https://formspree.io), paste the
// form endpoint here, e.g. 'https://formspree.io/f/xxxxxxxx'. Submissions will
// then post silently in the background instead of opening the visitor's mail app.
const FORMSPREE_ENDPOINT = '';

type FormState = {
  name: string;
  reply: string; // visitor's own email or phone, so Ron can respond
  date: string;
  type: string;
  message: string;
};

const DATE_VALUE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

function dateValueToDate(value: string): Date | null {
  const match = DATE_VALUE_RE.exec(value);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function dateToValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const EMPTY_FORM: FormState = { name: '', reply: '', date: '', type: '', message: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[\d\s+\-()]{7,}$/;

export function Contact() {
  const { t } = useTranslation('contact');
  const { language } = useSiteLanguage();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const dateFieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setErrors({});
    setStatus('');
  }, [language]);

  useEffect(() => {
    const closeDatePicker = (event: PointerEvent) => {
      if (!dateFieldRef.current?.contains(event.target as Node)) setIsDatePickerOpen(false);
    };
    document.addEventListener('pointerdown', closeDatePicker);
    return () => document.removeEventListener('pointerdown', closeDatePicker);
  }, []);

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    const required = t('validation.required');

    if (!form.name.trim()) next.name = required;
    if (!form.reply.trim()) next.reply = required;
    else if (!EMAIL_RE.test(form.reply) && !PHONE_RE.test(form.reply)) {
      next.reply = t('validation.invalidReply');
    }
    if (!form.date.trim()) next.date = required;
    if (!form.type.trim()) next.type = required;

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) { setStatus(''); return; }

    setSubmitting(true);
    try {
      if (FORMSPREE_ENDPOINT) {
        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error('Formspree submission failed');
        setStatus(t('status.sent'));
        setForm(EMPTY_FORM);
      } else {
        // No Formspree endpoint configured yet — fall back to opening the
        // visitor's email client, addressed to Ron, pre-filled.
        const subject = encodeURIComponent(t('email.subject', { name: form.name }));
        const body = encodeURIComponent(t('email.body', form));
        setStatus(t('status.ready'));
        window.location.href = `mailto:${RON_EMAIL}?subject=${subject}&body=${body}`;
      }
    } catch {
      setStatus(t('status.error'));
    } finally {
      setSubmitting(false);
    }
  }

  const fieldProps = (key: keyof FormState) => ({
    value: form[key],
    onChange: update(key),
    className: errors[key] ? styles.invalid : undefined,
  });

  const locale = language === 'en' ? 'en-GB' : 'he-IL';
  const selectedDate = dateValueToDate(form.date);
  const monthLabel = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(visibleMonth);
  const weekDays = Array.from({ length: 7 }, (_, index) =>
    new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(new Date(2024, 0, 7 + index)),
  );
  const firstDay = visibleMonth.getDay();
  const daysInMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 0).getDate();
  const calendarDays = Array.from({ length: firstDay + daysInMonth }, (_, index) =>
    index < firstDay ? null : new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), index - firstDay + 1),
  );

  const openDatePicker = () => {
    setVisibleMonth(selectedDate
      ? new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1));
    setIsDatePickerOpen(true);
  };

  const moveMonth = (offset: number) => {
    setVisibleMonth((month) => new Date(month.getFullYear(), month.getMonth() + offset, 1));
  };

  const selectDate = (date: Date) => {
    setForm((current) => ({ ...current, date: dateToValue(date) }));
    setErrors((current) => ({ ...current, date: undefined }));
    setIsDatePickerOpen(false);
  };

  return (
    <section id="contact" className={styles.section}>
      <p className={styles.eyebrow}>{t('eyebrow')}</p>
      <h2>{t('heading')}</h2>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <input type="text" placeholder={t('fields.name')} {...fieldProps('name')} />
          <span className={styles.error}>{errors.name}</span>
        </div>
        <div className={styles.field}>
          <input type="text" placeholder={t('fields.reply')} {...fieldProps('reply')} />
          <span className={styles.error}>{errors.reply}</span>
        </div>
        <div ref={dateFieldRef} className={`${styles.field} ${styles.dateField}`} onClick={(event) => {
          if (event.target === event.currentTarget) openDatePicker();
        }}>
          <input
            type="date"
            readOnly
            value={form.date}
            lang={language === 'en' ? 'en-GB' : 'he'}
            dir={language === 'he' ? 'rtl' : 'ltr'}
            aria-label={t('fields.date')}
            tabIndex={-1}
            className={`${styles.dateInput} ${errors.date ? styles.invalid : ''}`}
          />
          <button
            type="button"
            className={styles.datePickerButton}
            aria-label={t('fields.chooseDate')}
            aria-expanded={isDatePickerOpen}
            aria-controls="event-date-picker"
            onClick={openDatePicker}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 2v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7Zm12 17H5V9h14v10ZM5 7V6h14v1H5Z" />
            </svg>
          </button>
          {isDatePickerOpen && (
            <div id="event-date-picker" className={styles.datePicker} role="dialog" aria-label={t('fields.chooseDate')}>
              <div className={styles.datePickerHeader}>
                <button type="button" className={styles.monthButton} aria-label={t('calendar.previousMonth')} onClick={() => moveMonth(-1)}>
                  <span aria-hidden="true">‹</span>
                </button>
                <strong>{monthLabel}</strong>
                <button type="button" className={styles.monthButton} aria-label={t('calendar.nextMonth')} onClick={() => moveMonth(1)}>
                  <span aria-hidden="true">›</span>
                </button>
              </div>
              <div className={styles.weekDays} aria-hidden="true">
                {weekDays.map((day) => <span key={day}>{day}</span>)}
              </div>
              <div className={styles.calendarGrid}>
                {calendarDays.map((date, index) => date ? (
                  <button
                    key={date.toISOString()}
                    type="button"
                    className={styles.dayButton}
                    aria-label={new Intl.DateTimeFormat(locale, { dateStyle: 'full' }).format(date)}
                    aria-pressed={selectedDate?.getTime() === date.getTime()}
                    onClick={() => selectDate(date)}
                  >
                    {date.getDate()}
                  </button>
                ) : <span key={`empty-${index}`} aria-hidden="true" />)}
              </div>
            </div>
          )}
          <span className={styles.error}>{errors.date}</span>
        </div>
        <div className={styles.field}>
          <input type="text" placeholder={t('fields.type')} {...fieldProps('type')} />
          <span className={styles.error}>{errors.type}</span>
        </div>
        <div className={styles.field}>
          <textarea rows={4} placeholder={t('fields.message')} {...fieldProps('message')} />
          <span className={styles.error}>{errors.message}</span>
        </div>
        <button type="submit" className={styles.submitBtn} disabled={submitting}>
          {t('actions.send')}
        </button>
        <p className={styles.status}>{status}</p>
      </form>
    </section>
  );
}
