/**
 * Supporting content for dashboard informational pages that do not rely on live APIs.
 */
export const INSTALL_STEPS = [
  {
    title: "Install the CLI",
    description:
      "Start with the CLI so engineers can create and inspect tunnels from their own environments.",
  },
  {
    title: "Create a scoped token",
    description:
      "Issue a dedicated token for the workflow you are onboarding instead of reusing personal credentials.",
  },
  {
    title: "Open the first tunnel",
    description:
      "Attach a local service to a named tunnel, confirm health, then verify request volume in the usage dashboard.",
  },
];

export const INTEGRATION_CARDS = [
  {
    name: "GitHub Actions",
    summary: "Use scoped CI tokens for preview deployments and post-deploy health checks.",
  },
  {
    name: "Webhook pipeline",
    summary: "Forward tunnel lifecycle or billing events into your own workflow engine.",
  },
  {
    name: "SIEM / log drain",
    summary: "Mirror high-signal request and auth events into your observability stack.",
  },
];

export const LOG_VIEW_PRESETS = [
  "Recent tunnel changes",
  "Token lifecycle activity",
  "Billing and checkout events",
  "Auth recovery requests",
];

export const SETTINGS_SECTIONS = [
  {
    title: "Workspace profile",
    description: "Branding, default region, and support contact preferences.",
  },
  {
    title: "Notifications",
    description: "Where incident, billing, and usage threshold messages should go.",
  },
  {
    title: "Security defaults",
    description: "Token expiry defaults, invite policy, and backend integration secrets.",
  },
];
