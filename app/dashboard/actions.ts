"use server";

/**
 * Server actions for dashboard mutations such as token lifecycle and billing checkout.
 */
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAuthenticatedAppUser } from "@/lib/auth/guards";
import { createCheckoutLink, createToken, revokeToken } from "@/lib/backend/control-plane";
import { INITIAL_FORM_STATE, type FormState } from "@/lib/form-state";
import { getStringValue } from "@/lib/validation";

/**
 * Creates a new API token using the control plane adapter.
 */
export async function createTokenAction(
  _state: FormState = INITIAL_FORM_STATE,
  formData: FormData,
): Promise<FormState> {
  await requireAuthenticatedAppUser();

  const name = getStringValue(formData, "name");
  const scope = getStringValue(formData, "scope");

  if (!name || !scope) {
    return {
      status: "error",
      message: "Token name and scope are required.",
      fieldErrors: {
        ...(name ? {} : { name: "Give the token a clear name." }),
        ...(scope ? {} : { scope: "Choose a scope." }),
      },
    };
  }

  const result = await createToken({ name, scope });

  if (!result.configured) {
    return {
      status: "error",
      message:
        "Control plane is not configured yet. Add CONTROL_PLANE_API_URL and CONTROL_PLANE_API_KEY to enable token management.",
    };
  }

  if (!result.ok || !result.data) {
    return {
      status: "error",
      message: result.error ?? "Token creation failed.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/tokens");

  return {
    status: "success",
    message: "Token created. Copy the secret into your secure storage now.",
    revealedSecret: result.data.token || undefined,
  };
}

/**
 * Revokes an existing API token and refreshes affected dashboard views.
 */
export async function revokeTokenAction(tokenId: string, _formData: FormData) {
  await requireAuthenticatedAppUser();

  const result = await revokeToken(tokenId);

  if (result.ok) {
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/tokens");
  }
}

/**
 * Requests a hosted billing checkout or portal URL and redirects when available.
 */
export async function startCheckoutAction(
  _state: FormState = INITIAL_FORM_STATE,
  formData: FormData,
): Promise<FormState> {
  await requireAuthenticatedAppUser();

  const planId = getStringValue(formData, "planId");
  const result = await createCheckoutLink(planId || "team");

  if (!result.configured) {
    return {
      status: "error",
      message:
        "Billing integration is not configured yet. Add billing or control plane service variables plus Paddle credentials.",
    };
  }

  if (!result.ok) {
    return {
      status: "error",
      message: result.error ?? "Could not start the billing flow.",
    };
  }

  const checkoutUrl =
    result.data && typeof result.data.url === "string" ? result.data.url : "";

  if (!checkoutUrl) {
    return {
      status: "error",
      message:
        "The billing service responded without a checkout URL. Confirm the Paddle-backed endpoint contract.",
    };
  }

  redirect(checkoutUrl);
}
