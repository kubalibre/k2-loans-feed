import type { LoansQuery, PublicLoansResponse } from "./types";

const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ?? "";

export function getApiBaseUrl(): string {
  if (!API_URL) {
    throw new Error("VITE_API_URL is not set. Copy .env.example to .env");
  }
  return API_URL;
}

export async function fetchPublicLoans(query: LoansQuery): Promise<PublicLoansResponse> {
  const [sortBy, sortOrder] = query.sort.split(":") as [string, "asc" | "desc"];
  const params = new URLSearchParams({ sortBy, sortOrder });
  if (query.platformName) {
    params.set("platformName", query.platformName);
  }

  const response = await fetch(`${getApiBaseUrl()}/public/loans?${params}`);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP ${response.status}`);
  }
  return response.json() as Promise<PublicLoansResponse>;
}
