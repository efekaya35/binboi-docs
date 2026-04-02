"use server";

/**
 * Shared auth-related server actions that are not tied to a single route family.
 */
import { redirect } from "next/navigation";

import { clearAppSessionCookie } from "@/lib/auth/session";

/**
 * Clears the current signed app session and returns the user to login.
 */
export async function logoutAction() {
  await clearAppSessionCookie();
  redirect("/login");
}
