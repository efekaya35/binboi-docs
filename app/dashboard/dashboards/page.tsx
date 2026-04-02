/**
 * Legacy dashboard route kept as a redirect to the overview page.
 */
import { redirect } from "next/navigation";

export default function LegacyDashboardsPage() {
  redirect("/dashboard");
}
