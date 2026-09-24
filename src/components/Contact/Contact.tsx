import { FormEvent, useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
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
  const { language, translate } = useLanguage();
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setErrors({});
    setStatus('');
  }, [language]);

  const update = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    const required = translate({ en: 'This field is required', he: 'שדה חובה' });

    if (!form.name.trim()) next.name = required;
    if (!form.reply.trim()) next.reply = required;
    else if (!EMAIL_RE.test(form.reply) && !PHONE_RE.test(form.reply)) {
      next.reply = translate({ en: 'Enter a valid email or phone number', he: 'הזינו אימייל או טלפון תקין' });
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
        setStatus(translate({ en: 'Thanks! Your message has been sent.', he: 'תודה! ההודעה נשלחה.' }));
        setForm(EMPTY_FORM);
      } else {
        // No Formspree endpoint configured yet — fall back to opening the
        // visitor's email client, addressed to Ron, pre-filled.
        const subject = encodeURIComponent(`New booking inquiry from ${form.name}`);
        const body = encodeURIComponent(
          `Name: ${form.name}\nContact: ${form.reply}\nEvent date: ${form.date}\nEvent type: ${form.type}\n\n${form.message}`
        );
        setStatus(translate({ en: 'Thanks! Your message is ready to send.', he: 'תודה! ההודעה מוכנה לשליחה.' }));
        window.location.href = `mailto:${RON_EMAIL}?subject=${subject}&body=${body}`;
      }
    } catch {
      setStatus(translate({
        en: "Something went wrong — please email me directly at ronokavi@gmail.com",
        he: 'משהו השתבש — אנא שלחו לי מייל ישירות ל-ronokavi@gmail.com',
      }));
    } finally {
      setSubmitting(false);
    }
  }

  const fieldProps = (key: keyof FormState) => ({
    value: form[key],
    onChange: update(key),
    className: errors[key] ? styles.invalid : undefined,
  });

  return (
    <section id="contact" className={styles.section}>
      <p className={styles.eyebrow}>{translate({ en: 'Have an event coming up?', he: 'יש לך אירוע בקרוב?' })}</p>
      <h2>{translate({ en: 'Get in touch', he: 'בואו נדבר' })}</h2>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <input type="text" placeholder={translate({ en: 'Name', he: 'שם' })} {...fieldProps('name')} />
          <span className={styles.error}>{errors.name}</span>
        </div>
        <div className={styles.field}>
          <input type="text" placeholder={translate({ en: 'Your email or phone', he: 'האימייל או הטלפון שלך' })} {...fieldProps('reply')} />
          <span className={styles.error}>{errors.reply}</span>
        </div>
        <div className={styles.field}>
          <input
            type="date"
            lang={language === 'en' ? 'en-GB' : 'he'}
            dir={language === 'he' ? 'rtl' : 'ltr'}
            aria-label={translate({ en: 'Event date', he: 'תאריך האירוע' })}
            {...fieldProps('date')}
          />
          <span className={styles.error}>{errors.date}</span>
        </div>
        <div className={styles.field}>
          <input type="text" placeholder={translate({ en: 'Event type', he: 'סוג האירוע' })} {...fieldProps('type')} />
          <span className={styles.error}>{errors.type}</span>
        </div>
        <div className={styles.field}>
          <textarea rows={4} placeholder={translate({ en: 'Tell me about your event', he: 'ספרו לי על האירוע שלכם' })} {...fieldProps('message')} />
          <span className={styles.error}>{errors.message}</span>
        </div>
        <button type="submit" className={styles.submitBtn} disabled={submitting}>
          {translate({ en: 'Send', he: 'שליחה' })}
        </button>
        <p className={styles.status}>{status}</p>
      </form>
    </section>
  );
}
