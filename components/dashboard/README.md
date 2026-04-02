# `components/dashboard`

Purpose: reusable components for workspace-facing pages and operational UI.

What belongs here:
- Sidebar navigation, metric cards, integration callouts, charts, and mutation-oriented panels.
- Components that assume dashboard context and should not be used on public marketing routes.

Notes:
- Dashboard components should stay data-shape aware but not own fetch logic directly.
- Prefer passing normalized data from `lib/backend/*` rather than raw service payloads.
