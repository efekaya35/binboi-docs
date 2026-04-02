# `lib`

Purpose: shared runtime helpers, metadata builders, validation, formatting, and backend adapters.

What belongs here:
- Environment accessors and configuration utilities.
- Server-side integrations for auth, billing, control plane, and future internal services.
- Shared form state, formatters, and metadata helpers.

Notes:
- `lib/backend/client.ts` centralizes service fetch behavior.
- `lib/backend/control-plane.ts` is the UI-facing normalization layer for dashboard data.
- Keep secrets server-only and expose browser-safe values through explicit `NEXT_PUBLIC_` vars only.
