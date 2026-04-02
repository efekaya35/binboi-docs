/**
 * Centralized server-side adapter for talking to the external `binboi-go` engine.
 */
import { env, hasEnvValues } from "@/lib/env";
import {
  type EngineHealth,
  type EngineTunnel,
  type ServiceResult,
} from "@/lib/backend/contracts";
import { fetchServiceJson } from "@/lib/backend/client";

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function extractPayload(value: unknown): unknown {
  if (!isRecord(value)) {
    return value;
  }

  if ("data" in value) {
    return value.data;
  }

  if ("items" in value) {
    return value.items;
  }

  return value;
}

function readString(record: JsonRecord, ...keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  return "";
}

function readNumber(record: JsonRecord, ...keys: string[]) {
  for (const key of keys) {
    const value = record[key];
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
    if (typeof value === "string" && value.trim() !== "" && !Number.isNaN(Number(value))) {
      return Number(value);
    }
  }

  return 0;
}

function mapResult<T>(
  result: ServiceResult<unknown>,
  mapData: (value: unknown) => T,
): ServiceResult<T> {
  if (!result.ok || result.data === null) {
    return {
      ...result,
      data: null,
    };
  }

  return {
    ...result,
    data: mapData(result.data),
  };
}

function mapEngineHealth(value: unknown): EngineHealth {
  const payload = extractPayload(value);
  const record = isRecord(payload) ? payload : {};
  const rawStatus = readString(record, "status", "health");

  return {
    status:
      rawStatus === "degraded" || rawStatus === "offline" ? rawStatus : "healthy",
    version: readString(record, "version") || "unknown",
    instanceName: readString(record, "instanceName", "nodeName", "name") || "binboi-go",
    region: readString(record, "region") || "global",
    uptimeSeconds: readNumber(record, "uptimeSeconds", "uptime"),
  };
}

function mapEngineTunnels(value: unknown): EngineTunnel[] {
  const payload = extractPayload(value);
  const items = Array.isArray(payload) ? payload : [];

  return items.map((item, index) => {
    const record = isRecord(item) ? item : {};
    const rawStatus = readString(record, "status", "health");

    return {
      id: readString(record, "id") || `engine-tunnel-${index + 1}`,
      name: readString(record, "name") || `Tunnel ${index + 1}`,
      status:
        rawStatus === "degraded" || rawStatus === "offline" ? rawStatus : "healthy",
      lastSeenAt:
        readString(record, "lastSeenAt", "updatedAt") || new Date().toISOString(),
    };
  });
}

/**
 * Returns the engine's health signal when the upstream `binboi-go` API is configured.
 */
export async function getEngineHealth() {
  const result = await fetchServiceJson<unknown>("engine", env.engineHealthPath);
  return mapResult(result, mapEngineHealth);
}

/**
 * Returns a normalized tunnel list directly from the engine when that endpoint exists.
 * TODO: tighten this mapping once the binboi-go tunnel contract is finalized.
 */
export async function getEngineTunnels() {
  const result = await fetchServiceJson<unknown>("engine", env.engineTunnelsPath);
  return mapResult(result, mapEngineTunnels);
}

/**
 * Summarizes the install/connect posture so UI code doesn't need to know engine paths.
 */
export async function getEngineInstallOverview() {
  const [healthResult, tunnelsResult] = await Promise.all([
    getEngineHealth(),
    getEngineTunnels(),
  ]);

  return {
    configured: hasEnvValues(env.engineApiUrl),
    engineBaseUrl: env.engineApiUrl,
    controlPlaneBaseUrl: env.appUrl,
    controlPlaneInternalUrl: env.controlPlaneInternalApiUrl || env.appUrl,
    internalHealthUrl: new URL("/api/internal/engine/health", env.appUrl).toString(),
    health: healthResult.data,
    healthError: healthResult.error,
    tunnelCount: tunnelsResult.data?.length ?? 0,
    tunnelError: tunnelsResult.error,
    expectedPaths: {
      connect: env.engineConnectPath,
      health: env.engineHealthPath,
      sessions: env.engineSessionsPath,
      tunnels: env.engineTunnelsPath,
    },
  };
}
