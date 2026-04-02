# `(site)` routes

Purpose: product-facing public pages such as the landing page, docs, pricing, changelog, support, and light legal/editorial routes.

What belongs here:
- Public routes that do not require authentication.
- Shared public layouts and route-level metadata.
- Docs pages that explain the product and backend integration assumptions.

Notes:
- Keep the visual language consistent with the fixed site header and shared footer.
- Public content is primarily driven from `constants/site-content.ts` and `constants/navigations.ts`.
- Prefer adding new product marketing sections here before introducing new dashboard-only explanations.
