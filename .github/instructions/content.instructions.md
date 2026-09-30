---
description: "Use when writing or editing portfolio copy, biography, project descriptions, DJ experience, music language, calls to action, or personal branding."
name: "Portfolio Content"
applyTo: ["src/**/*.tsx", "src/**/*.ts", "src/**/*.md", "src/i18n/locales/**/*.json", "public/**"]
---
# Content Instructions

- Use first-person writing with a confident, human, grounded voice.
- Make the developer and DJ sides feel connected through craft, curiosity, rhythm, and live energy.
- State the verified facts clearly: 17 years in software development and 2.5 years DJing for fun and passion.
- Ask for confirmation before adding names, dates, links, venues, clients, genres, or achievements not supplied by the owner.
- Keep headings concise and calls to action specific.
- Write descriptive alternative text for meaningful images and empty alt text for decoration.
- Keep all wording at matching keys in the English and Hebrew feature namespace files under `src/i18n/locales/`; never add inline component copy or update only one locale.
- Keep editable gallery, video, genre, and testimonial structure in typed files under `src/data/`, using translation keys for their wording.
- Include metadata, alternative text, aria-labels, validation messages, and generated share/email text in locale resources when applicable.
- Mark missing photos, videos, and testimonials as placeholders rather than presenting invented material as real.
