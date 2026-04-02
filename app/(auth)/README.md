# `(auth)` routes

Purpose: authentication and account-recovery routes that share a premium, product-aligned layout.

What belongs here:
- Login, register, forgot-password, reset-password, verify-email, check-email, and invite flows.
- Auth-specific server actions that validate form input and call the upstream auth service.
- Route-group-only layout concerns that should not affect public or dashboard pages.

Notes:
- This is a route group, so `(auth)` is not part of the URL path.
- Auth mutations currently live in `app/(auth)/actions.ts`.
- Keep auth UI clean and explicit even when backend services are not yet configured.
