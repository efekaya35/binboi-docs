/**
 * Email verification page that supports token-based or email-based confirmation.
 */
import { AuthForm } from "@/components/auth/auth-form";
import { createMetadata } from "@/lib/metadata";

import { verifyEmailAction } from "../actions";

type VerifyEmailPageProps = {
  searchParams: Promise<{
    email?: string;
    token?: string;
  }>;
};

export const metadata = createMetadata({
  title: "Verify Email",
  description: "Verify your Binboi email address before logging in.",
  path: "/verify-email",
});

export default async function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const { email, token } = await searchParams;

  return (
    <AuthForm
      title="Verify your email"
      description="Verification is handled by the upstream auth service. Use the token from your inbox or confirm the address that should receive a new email."
      submitLabel="Verify email"
      action={verifyEmailAction}
      auxiliaryHref="/check-email"
      auxiliaryLabel="Need to check your inbox first?"
      footerHref="/login"
      footerLabel="Already verified? Return to login"
      fields={[
        token
          ? {
              name: "token",
              label: "Token",
              type: "hidden",
              defaultValue: token,
            }
          : {
              name: "token",
              label: "Verification token",
              type: "text",
              placeholder: "Paste the verification token",
              required: false,
            },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "team@company.com",
          defaultValue: email,
          autoComplete: "email",
          required: false,
          description: "Used when the auth service resends or checks the verification target.",
        },
      ]}
    />
  );
}
