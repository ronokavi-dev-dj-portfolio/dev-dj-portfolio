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
  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setErrors({});
    setStatus('');
  }, [language]);

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

  const openDatePicker = () => {
    dateInputRef.current?.showPicker?.();
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
        <div className={`${styles.field} ${styles.dateField}`}>
          <input
            ref={dateInputRef}
            type="date"
            lang={language === 'en' ? 'en-GB' : 'he'}
            dir={language === 'he' ? 'rtl' : 'ltr'}
            aria-label={t('fields.date')}
            onClick={openDatePicker}
            onKeyDown={(event) => {
              if (!['Tab', 'Enter', ' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
                event.preventDefault();
              }
            }}
            onPaste={(event) => event.preventDefault()}
            {...fieldProps('date')}
            className={`${styles.dateInput} ${errors.date ? styles.invalid : ''}`}
          />
          <button
            type="button"
            className={styles.datePickerButton}
            aria-label={t('fields.chooseDate')}
            onClick={openDatePicker}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 2v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7Zm12 17H5V9h14v10ZM5 7V6h14v1H5Z" />
            </svg>
          </button>
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
