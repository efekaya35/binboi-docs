"use server";

/**
 * Server actions for Binboi auth routes. These actions validate form inputs and hand off to
 * an upstream auth service when the relevant environment variables are configured.
 */
import { redirect } from "next/navigation";

import { normalizeDashboardRedirectPath } from "@/lib/auth/redirects";
import { createAppSessionCookie } from "@/lib/auth/session";
import { fetchServiceJson } from "@/lib/backend/client";
import type { ServiceResult } from "@/lib/backend/contracts";
import { INITIAL_FORM_STATE, type FormState } from "@/lib/form-state";
import { getStringValue, isEmail, validatePassword } from "@/lib/validation";

async function callAuthService(
  path: string,
  payload: Record<string, string>,
) {
  return fetchServiceJson<Record<string, unknown>>("auth", path, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

function createAuthErrorState(result: ServiceResult<Record<string, unknown>>) {
  if (!result.configured) {
    return {
      status: "error",
      message:
        "Auth service is not configured yet. Add AUTH_API_URL and AUTH_API_SECRET to enable this flow.",
    };
  }

  if (!result.ok) {
    return {
      status: "error",
      message: result.error ?? "The auth request failed. Check the upstream service response.",
    };
  }

  return {
    status: "error",
    message: "The auth request could not be completed.",
  };
}

function createSuccessState(successMessage: string): FormState {
  return {
    status: "success",
    message: successMessage,
  };
}

/**
 * Handles login form submissions against the upstream auth service.
 */
export async function loginAction(
  _state: FormState = INITIAL_FORM_STATE,
  formData: FormData,
): Promise<FormState> {
  const email = getStringValue(formData, "email");
  const password = getStringValue(formData, "password");
  const nextPath = getStringValue(formData, "next");

  if (!isEmail(email) || !password) {
    return {
      status: "error",
      message: "Enter a valid email and password.",
      fieldErrors: {
        ...(isEmail(email) ? {} : { email: "Use a valid email address." }),
        ...(password ? {} : { password: "Password is required." }),
      },
    };
  }

  const result = await callAuthService("/login", { email, password });

  if (!result.ok) {
    return createAuthErrorState(result);
  }

  await createAppSessionCookie({ email });
  redirect(normalizeDashboardRedirectPath(nextPath));
}

/**
 * Handles registration submissions and enforces minimal password quality.
 */
export async function registerAction(
  _state: FormState = INITIAL_FORM_STATE,
  formData: FormData,
): Promise<FormState> {
  const name = getStringValue(formData, "name");
  const email = getStringValue(formData, "email");
  const password = getStringValue(formData, "password");

  const fieldErrors: Record<string, string> = {};

  if (!name) {
    fieldErrors.name = "Tell us who this workspace belongs to.";
  }
  if (!isEmail(email)) {
    fieldErrors.email = "Use a valid email address.";
  }
  if (!validatePassword(password)) {
    fieldErrors.password = "Use at least 8 characters.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  const result = await callAuthService("/register", { email, name, password });

  if (!result.ok) {
    return createAuthErrorState(result);
  }

  return createSuccessState(
    "Account created. Check your inbox to verify the email before logging in.",
  );
}

/**
 * Starts the password recovery flow for a known email address.
 */
export async function forgotPasswordAction(
  _state: FormState = INITIAL_FORM_STATE,
  formData: FormData,
): Promise<FormState> {
  const email = getStringValue(formData, "email");

  if (!isEmail(email)) {
    return {
      status: "error",
      message: "Enter a valid email address.",
      fieldErrors: {
        email: "Use a valid email address.",
      },
    };
  }

  const result = await callAuthService("/forgot-password", { email });

  if (!result.ok) {
    return createAuthErrorState(result);
  }

  return createSuccessState(
    "Recovery email requested. Continue on the check-email screen once the provider is configured.",
  );
}

/**
 * Completes password reset once the user has a valid recovery token.
 */
export async function resetPasswordAction(
  _state: FormState = INITIAL_FORM_STATE,
  formData: FormData,
): Promise<FormState> {
  const token = getStringValue(formData, "token");
  const password = getStringValue(formData, "password");
  const confirmPassword = getStringValue(formData, "confirmPassword");

  const fieldErrors: Record<string, string> = {};

  if (!token) {
    fieldErrors.token = "Reset token is required.";
  }
  if (!validatePassword(password)) {
    fieldErrors.password = "Use at least 8 characters.";
  }
  if (confirmPassword !== password) {
    fieldErrors.confirmPassword = "Passwords must match.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  const result = await callAuthService("/reset-password", { password, token });

  if (!result.ok) {
    return createAuthErrorState(result);
  }

  return createSuccessState("Password reset complete. You can return to login now.");
}

/**
 * Verifies an email confirmation token with the upstream auth service.
 */
export async function verifyEmailAction(
  _state: FormState = INITIAL_FORM_STATE,
  formData: FormData,
): Promise<FormState> {
  const token = getStringValue(formData, "token");
  const email = getStringValue(formData, "email");

  if (!token && !isEmail(email)) {
    return {
      status: "error",
      message: "Provide a verification token or a valid email address.",
      fieldErrors: {
        email: "Use a valid email address if you do not have the token.",
      },
    };
  }

  const result = await callAuthService("/verify-email", { email, token });

  if (!result.ok) {
    return createAuthErrorState(result);
  }

  return createSuccessState(
    "Verification request submitted. Continue to login once confirmed.",
  );
}

/**
 * Accepts a workspace invite and completes the invited user setup.
 */
export async function acceptInviteAction(
  _state: FormState = INITIAL_FORM_STATE,
  formData: FormData,
): Promise<FormState> {
  const inviteToken = getStringValue(formData, "inviteToken");
  const email = getStringValue(formData, "email");
  const name = getStringValue(formData, "name");
  const password = getStringValue(formData, "password");

  const fieldErrors: Record<string, string> = {};

  if (!inviteToken) {
    fieldErrors.inviteToken = "Invite token is required.";
  }
  if (!name) {
    fieldErrors.name = "Tell us your display name.";
  }
  if (!isEmail(email)) {
    fieldErrors.email = "Use a valid email address.";
  }
  if (!validatePassword(password)) {
    fieldErrors.password = "Use at least 8 characters.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors,
    };
  }

  const result = await callAuthService("/accept-invite", {
    email,
    inviteToken,
    name,
    password,
  });

  if (!result.ok) {
    return createAuthErrorState(result);
  }

  await createAppSessionCookie({ email, name });
  redirect("/dashboard");
}
