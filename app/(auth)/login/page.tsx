/**
 * Login page for workspace members returning to Binboi.
 */
import { AuthForm } from "@/components/auth/auth-form";
import { createMetadata } from "@/lib/metadata";

import { loginAction } from "../actions";

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

export const metadata = createMetadata({
  title: "Login",
  description: "Log in to access the Binboi dashboard, tokens, and billing surfaces.",
  path: "/login",
});

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { next } = await searchParams;

  return (
    <AuthForm
      title="Welcome back"
      description="Log in to manage tunnels, rotate tokens, and review usage from a single workspace view."
      submitLabel="Log in"
      action={loginAction}
      auxiliaryHref="/forgot-password"
      auxiliaryLabel="Forgot password?"
      footerHref="/register"
      footerLabel="Need an account? Create one"
      fields={[
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "team@company.com",
          autoComplete: "email",
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
          autoComplete: "current-password",
        },
        {
          name: "next",
          label: "Next",
          type: "hidden",
          defaultValue: next ?? "/dashboard",
        },
      ]}
    />
  );
}
