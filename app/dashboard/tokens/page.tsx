/**
 * Token management page wired to create and revoke actions against the control plane.
 */
import { DashboardPageIntro } from "@/components/dashboard/dashboard-page-intro";
import { IntegrationState } from "@/components/dashboard/integration-state";
import { TokenManager } from "@/components/dashboard/token-manager";
import { getTokens } from "@/lib/backend/control-plane";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Tokens",
  description: "Create, review, and revoke Binboi API tokens.",
  path: "/dashboard/tokens",
});

export default async function TokensPage() {
  const tokensResult = await getTokens();

  return (
    <div className="space-y-6">
      <DashboardPageIntro
        eyebrow="Tokens"
        title="Create and rotate access deliberately"
        description="Token management is already wired to the control plane adapter, with a create flow that expects one-time secret reveal and row-level revoke actions."
      />

      <IntegrationState
        configured={tokensResult.configured}
        ok={tokensResult.ok}
        title="Token service status"
        description="Connect the control plane to make this surface fully operational. Until then, the form stays explicit about configuration needs."
        error={tokensResult.error}
      />

      <TokenManager
        configured={tokensResult.configured}
        tokens={tokensResult.data ?? []}
      />
    </div>
  );
}
