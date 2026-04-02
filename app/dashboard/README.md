# Dashboard routes

Purpose: authenticated workspace surfaces for overview, tunnels, tokens, usage, billing, settings, and operational setup.

What belongs here:
- Server-rendered dashboard pages.
- Dashboard-only layouts and server actions.
- Legacy redirects that preserve older route shapes while the IA improves.

Notes:
- Live data is loaded through `lib/backend/control-plane.ts`.
- Mutations such as token creation and billing checkout start in `app/dashboard/actions.ts`.
- Avoid inventing fake operational data. If an integration is not configured, prefer explicit empty or warning states.
