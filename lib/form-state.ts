/**
 * Shared form state used by auth and dashboard server actions.
 */
export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
  revealedSecret?: string;
};

export const INITIAL_FORM_STATE: FormState = {
  status: "idle",
};
