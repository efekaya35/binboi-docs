/**
 * Tunnel inventory page wired to the control plane adapter.
 */
import { DashboardPageIntro } from "@/components/dashboard/dashboard-page-intro";
import { IntegrationState } from "@/components/dashboard/integration-state";
import { Panel } from "@/components/ui/panel";
import { getTunnels } from "@/lib/backend/control-plane";
import { formatDateTime, formatNumber } from "@/lib/formatters";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Tunnels",
  description: "Review active tunnels, regions, health, and request activity.",
  path: "/dashboard/tunnels",
});

export default async function TunnelsPage() {
  const tunnelsResult = await getTunnels();

  return (
    <div className="space-y-6">
      <DashboardPageIntro
        eyebrow="Tunnels"
        title="Inspect what is routable right now"
        description="The tunnel table is connected to the control plane adapter and intentionally expects stable, operations-friendly fields such as region, health, and request volume."
      />

      <IntegrationState
        configured={tunnelsResult.configured}
        ok={tunnelsResult.ok}
        title="Tunnel data source"
        description="Binboi normalizes multiple backend response styles into one table shape so frontend work can continue while contracts settle."
        error={tunnelsResult.error}
      />

      <Panel className="overflow-hidden p-0">
        <table className="min-w-full divide-y divide-white/8 text-left text-sm">
          <thead className="bg-white/[0.03] text-foreground/48">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Hostname</th>
              <th className="px-4 py-3 font-medium">Protocol</th>
              <th className="px-4 py-3 font-medium">Region</th>
              <th className="px-4 py-3 font-medium">Requests / 24h</th>
              <th className="px-4 py-3 font-medium">Last seen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8">
            {tunnelsResult.data?.length ? (
              tunnelsResult.data.map((tunnel) => (
                <tr key={tunnel.id}>
                  <td className="px-4 py-4 text-foreground">{tunnel.name}</td>
                  <td className="px-4 py-4 text-foreground/62">{tunnel.hostname}</td>
                  <td className="px-4 py-4 text-foreground/62">{tunnel.protocol}</td>
                  <td className="px-4 py-4 text-foreground/62">{tunnel.region}</td>
                  <td className="px-4 py-4 text-foreground/62">
                    {formatNumber(tunnel.requests24h)}
                  </td>
                  <td className="px-4 py-4 text-foreground/62">
                    {formatDateTime(tunnel.lastSeenAt)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-foreground/46">
                  No tunnel data returned yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
