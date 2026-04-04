/**
 * Dashboard overview page that summarizes workspace health and backend readiness.
 */
import Link from "next/link";

import { DashboardPageIntro } from "@/components/dashboard/dashboard-page-intro";
import { IntegrationState } from "@/components/dashboard/integration-state";
import { MetricCard } from "@/components/dashboard/metric-card";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import {
  getDashboardOverview,
  getTokens,
  getTunnels,
  getUsageSummary,
} from "@/lib/backend/control-plane";
import { formatNumber, formatPercent } from "@/lib/formatters";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Dashboard",
  description: "Overview of tunnel health, token posture, and usage signals in Binboi.",
  path: "/dashboard",
});

function normalizeRate(value: number) {
  return value > 1 ? value / 100 : value;
}

export default async function DashboardOverviewPage() {
  const [overviewResult, tokensResult, tunnelsResult, usageResult] = await Promise.all([
    getDashboardOverview(),
    getTokens(),
    getTunnels(),
    getUsageSummary(),
  ]);

  const activeTunnels = overviewResult.data?.activeTunnels ?? tunnelsResult.data?.length ?? 0;
  const activeTokens = overviewResult.data?.activeTokens ?? tokensResult.data?.length ?? 0;
  const requestsToday =
    overviewResult.data?.requestsToday ?? usageResult.data?.requests ?? 0;
  const errorRate = normalizeRate(
    overviewResult.data?.errorRate ?? usageResult.data?.errorRate ?? 0,
  );

  return (
    <div className="space-y-6">
      <DashboardPageIntro
        eyebrow="Overview"
        title="Workspace health that stays readable"
        description="See active tunnels, token posture, request volume, and whether the control plane is responding without digging through scattered setup pages."
      />

      <IntegrationState
        configured={overviewResult.configured}
        ok={overviewResult.ok}
        title="Control plane connection"
        description="The overview reads from the control plane adapter so this screen becomes real as soon as backend URLs and secrets are configured."
        error={overviewResult.error}
      />

      <div className="grid gap-5 xl:grid-cols-[1.15fr_0.85fr]">
        <Panel className="surface-panel surface-panel-dual space-y-5 border-white/[0.07] p-7">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground/46">
              Current workspace
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Local tunnels, tokens, and usage are now wired into one calmer dashboard.
            </h2>
            <p className="max-w-2xl text-sm leading-8 text-foreground/62">
              Use this screen to spot whether the system is healthy, then jump straight
              into tunnels, token rotation, or install steps without losing context.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/dashboard/tunnels">Open tunnels</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/dashboard/tokens">Manage tokens</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/dashboard/install">Review install</Link>
            </Button>
          </div>
        </Panel>

        <Panel className="space-y-4 border-white/[0.07] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/42">
            Snapshot
          </p>
          <div className="grid gap-3">
            {[
              {
                label: "Tunnel posture",
                value: `${formatNumber(activeTunnels)} active`,
                detail: "Shared preview and webhook routes currently visible to the workspace.",
              },
              {
                label: "Token posture",
                value: `${formatNumber(activeTokens)} active`,
                detail: "Scoped credentials available for operators, CI, and scripted flows.",
              },
              {
                label: "Traffic today",
                value: formatNumber(requestsToday),
                detail: "Requests observed by the current control-plane usage payload.",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[22px] border border-white/[0.08] bg-white/[0.025] px-4 py-4"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/40">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-foreground">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-foreground/56">{item.detail}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Active tunnels"
          value={formatNumber(activeTunnels)}
          detail="Healthy, routable services currently returned by the control plane."
        />
        <MetricCard
          label="Active tokens"
          value={formatNumber(activeTokens)}
          detail="Tokens available to operators, automation, and product workflows."
        />
        <MetricCard
          label="Requests"
          value={formatNumber(requestsToday)}
          detail="Current-period request volume from the usage adapter."
        />
        <MetricCard
          label="Error rate"
          value={formatPercent(errorRate)}
          detail="Current error rate based on overview or usage payloads."
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Panel className="surface-panel surface-panel-blue space-y-4 border-white/[0.07] p-0">
          <div className="border-b border-white/[0.08] px-6 py-5">
            <h2 className="text-xl font-semibold text-foreground">Recent tunnels</h2>
            <p className="mt-2 text-sm leading-7 text-foreground/58">
              The most recent tunnel surfaces returned by the control plane.
            </p>
          </div>
          <div className="overflow-hidden rounded-[24px] border border-white/8">
            <table className="min-w-full divide-y divide-white/8 text-left text-sm">
              <thead className="bg-white/[0.025] text-foreground/48">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Hostname</th>
                  <th className="px-4 py-3 font-medium">Region</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/8 bg-white/[0.015]">
                {tunnelsResult.data?.slice(0, 5).map((tunnel) => (
                  <tr key={tunnel.id}>
                    <td className="px-4 py-4 text-foreground">{tunnel.name}</td>
                    <td className="px-4 py-4 text-foreground/62">{tunnel.hostname}</td>
                    <td className="px-4 py-4 text-foreground/62">{tunnel.region}</td>
                    <td className="px-4 py-4 text-foreground/62">{tunnel.status}</td>
                  </tr>
                )) ?? null}
              </tbody>
            </table>
            {!tunnelsResult.data?.length ? (
              <div className="px-4 py-10 text-center text-sm text-foreground/46">
                No tunnels returned yet.
              </div>
            ) : null}
          </div>
        </Panel>

        <Panel className="surface-panel surface-panel-blue space-y-4 border-white/[0.07] p-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">Top routes</h2>
            <p className="text-sm leading-7 text-foreground/58">
              Route activity from the current usage payload so you can see where traffic is clustering.
            </p>
          </div>
          <div className="space-y-3">
            {usageResult.data?.topRoutes.length ? (
              usageResult.data.topRoutes.slice(0, 5).map((route) => (
                <div
                  key={route.route}
                  className="surface-inset flex items-center justify-between rounded-[24px] border border-white/[0.07] px-4 py-4"
                >
                  <span className="text-sm text-foreground">{route.route}</span>
                  <span className="text-sm text-foreground/58">
                    {formatNumber(route.requests)}
                  </span>
                </div>
              ))
            ) : (
              <div className="surface-inset rounded-[24px] border border-white/[0.07] px-4 py-10 text-center text-sm text-foreground/46">
                Usage data is not available yet.
              </div>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
}
