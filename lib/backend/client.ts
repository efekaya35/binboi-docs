import { connection } from "next/server";

import { env, hasEnvValues } from "@/lib/env";
import type { ServiceName, ServiceResult } from "@/lib/backend/contracts";

type ServiceConfig = {
  label: string;
  baseUrl: string;
  token: string;
};

/**
 * Service registry for upstream APIs the product app can call from the server.
 */
const serviceConfigMap: Record<ServiceName, ServiceConfig> = {
  auth: {
    label: "auth service",
    baseUrl: env.authBaseUrl,
    token: env.authApiSecret,
  },
  billing: {
    label: "billing service",
    baseUrl: env.billingApiUrl,
    token: env.billingApiKey,
  },
  engine: {
    label: "binboi-go engine",
    baseUrl: env.engineApiUrl,
    token: env.engineApiKey,
  },
  controlPlane: {
    label: "control plane",
    baseUrl: env.controlPlaneApiUrl,
    token: env.controlPlaneApiKey,
  },
};

async function readPayload(response: Response) {
  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return text || null;
}

/**
 * Performs server-side fetches to the configured upstream service and standardizes failures.
 */
export async function fetchServiceJson<T>(
  service: ServiceName,
  path: string,
  init?: RequestInit,
): Promise<ServiceResult<T>> {
  const config = serviceConfigMap[service];

  if (!hasEnvValues(config.baseUrl)) {
    return {
      configured: false,
      ok: false,
      data: null,
      error: `${config.label} is not configured.`,
    };
  }

  await connection();

  const endpoint = new URL(path, config.baseUrl).toString();
  const headers = new Headers(init?.headers);
  headers.set("Accept", "application/json");

  if (!headers.has("Content-Type") && init?.body) {
    headers.set("Content-Type", "application/json");
  }

  if (config.token) {
    headers.set("Authorization", `Bearer ${config.token}`);
  }

  try {
    const response = await fetch(endpoint, {
      ...init,
      cache: "no-store",
      headers,
    });

    const payload = await readPayload(response);

    if (!response.ok) {
      return {
        configured: true,
        ok: false,
        data: null,
        endpoint,
        status: response.status,
        error:
          typeof payload === "string"
            ? payload
            : `Request to ${config.label} failed with status ${response.status}.`,
      };
    }

    return {
      configured: true,
      ok: true,
      data: payload as T,
      endpoint,
      status: response.status,
    };
  } catch (error) {
    return {
      configured: true,
      ok: false,
      data: null,
      endpoint,
      error:
        error instanceof Error
          ? error.message
          : `Unknown error while contacting ${config.label}.`,
    };
  }
}
