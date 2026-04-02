/**
 * Billing page aligned with Paddle-backed checkout integration points.
 */
import { BillingCheckoutCard } from "@/components/dashboard/billing-checkout-card";
import { DashboardPageIntro } from "@/components/dashboard/dashboard-page-intro";
import { IntegrationState } from "@/components/dashboard/integration-state";
import { MetricCard } from "@/components/dashboard/metric-card";
import { getBillingSummary } from "@/lib/backend/control-plane";
import { formatCurrency, formatDate, formatNumber } from "@/lib/formatters";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Billing",
  description: "Billing summary and checkout initiation aligned with Paddle integration.",
  path: "/dashboard/billing",
});

export default async function BillingPage() {
  const billingResult = await getBillingSummary();
  const billing = billingResult.data;

  return (
    <div className="space-y-6">
      <DashboardPageIntro
        eyebrow="Billing"
        title="Billing surface ready for a Paddle-backed flow"
        description="The dashboard expects a backend-issued summary plus a checkout URL minting endpoint. That keeps Paddle keys and product logic off the client."
      />

      <IntegrationState
        configured={billingResult.configured}
        ok={billingResult.ok}
        title="Billing service status"
        description="Connect billing or control plane services, then add Paddle credentials to complete this flow."
        error={billingResult.error}
      />

      <div className="grid gap-5 md:grid-cols-3">
        <MetricCard
          label="Plan"
          value={billing?.planName ?? "Starter"}
          detail="Current workspace plan returned by the backend."
        />
        <MetricCard
          label="Monthly spend"
          value={formatCurrency(billing?.monthlySpendUsd ?? 0)}
          detail="Current period spend estimate or latest invoice value."
        />
        <MetricCard
          label="Renewal"
          value={billing?.renewalDate ? formatDate(billing.renewalDate) : "Not scheduled"}
          detail="Upcoming renewal or trial end date."
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <BillingCheckoutCard configured={billingResult.configured} />
        <div className="grid gap-5">
          <MetricCard
            label="Included requests"
            value={formatNumber(billing?.includedRequests ?? 0)}
            detail="Requests included before overage logic applies."
          />
          <MetricCard
            label="Usage requests"
            value={formatNumber(billing?.usageRequests ?? 0)}
            detail="Current request volume that billing can reconcile against."
          />
        </div>
      </div>
    </div>
  );
}
