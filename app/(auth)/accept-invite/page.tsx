/**
 * Invite acceptance page for users joining an existing workspace.
 */
import { AuthForm } from "@/components/auth/auth-form";
import { createMetadata } from "@/lib/metadata";

import { acceptInviteAction } from "../actions";

type AcceptInvitePageProps = {
  searchParams: Promise<{
    email?: string;
    invite?: string;
  }>;
};

export const metadata = createMetadata({
  title: "Accept Invite",
  description: "Accept a Binboi workspace invite and finish your account setup.",
  path: "/accept-invite",
});

export default async function AcceptInvitePage({
  searchParams,
}: AcceptInvitePageProps) {
  const { email, invite } = await searchParams;

  return (
    <AuthForm
      title="Join your workspace"
      description="Invites stay explicit: we ask for the invite token, your display name, and a password so ownership remains clear from day one."
      submitLabel="Accept invite"
      action={acceptInviteAction}
      auxiliaryHref="/login"
      auxiliaryLabel="Already joined? Log in"
      fields={[
        invite
          ? {
              name: "inviteToken",
              label: "Invite token",
              type: "hidden",
              defaultValue: invite,
            }
          : {
              name: "inviteToken",
              label: "Invite token",
              type: "text",
              placeholder: "Paste your invite token",
            },
        {
          name: "name",
          label: "Full name",
          type: "text",
          placeholder: "Ada Lovelace",
          autoComplete: "name",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "team@company.com",
          defaultValue: email,
          autoComplete: "email",
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "Use at least 8 characters",
          autoComplete: "new-password",
        },
      ]}
    />
  );
}
