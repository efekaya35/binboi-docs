/**
 * Legacy dashboard route kept as a redirect to the new usage page.
 */
import { redirect } from "next/navigation";

export default function LegacyTotalRequestsPage() {
  redirect("/dashboard/usage");
}
