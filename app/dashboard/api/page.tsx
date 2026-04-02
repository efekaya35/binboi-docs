/**
 * Legacy dashboard route kept as a redirect to the new tokens page.
 */
import { redirect } from "next/navigation";

export default function LegacyApiPage() {
  redirect("/dashboard/tokens");
}
