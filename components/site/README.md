# `components/site`

Purpose: reusable UI for the public product site and docs experience.

What belongs here:
- Header, footer, section scaffolding, docs navigation, and subtle site-only animations.
- Components shared by landing, pricing, changelog, support, and docs routes.

Notes:
- Keep motion subtle and intentional. `reveal.tsx` is the default pattern for public-site animation.
- Reuse these primitives before creating page-specific one-off sections.
