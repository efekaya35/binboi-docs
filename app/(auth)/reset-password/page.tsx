/**
 * Password reset completion page that consumes a recovery token from the URL or form.
 */
import { AuthForm } from "@/components/auth/auth-form";
import { createMetadata } from "@/lib/metadata";

import { resetPasswordAction } from "../actions";

type ResetPasswordPageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

export const metadata = createMetadata({
  title: "Reset Password",
  description: "Set a new password for your Binboi account.",
  path: "/reset-password",
});

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { token } = await searchParams;

  return (
    <AuthForm
      title="Choose a new password"
      description="If you opened this page from a recovery email, the reset token is already attached. Otherwise you can paste it manually."
      submitLabel="Save new password"
      action={resetPasswordAction}
      auxiliaryHref="/login"
      auxiliaryLabel="Back to login"
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
              label: "Reset token",
              type: "text",
              placeholder: "Paste the recovery token",
            },
        {
          name: "password",
          label: "New password",
          type: "password",
          placeholder: "Use at least 8 characters",
          autoComplete: "new-password",
        },
        {
          name: "confirmPassword",
          label: "Confirm password",
          type: "password",
          placeholder: "Repeat the password",
          autoComplete: "new-password",
        },
      ]}
    />
  );
}
