import type { PublicLoansResponse } from "./types";

const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ?? "";

export function getApiBaseUrl(): string {
  if (!API_URL) {
    throw new Error("VITE_API_URL is not set. Copy .env.example to .env");
  }
  return API_URL;
}

/** Public feed: fixed order (best rate first), no client-side filters. */
export async function fetchPublicLoans(): Promise<PublicLoansResponse> {
  const response = await fetch(`${getApiBaseUrl()}/public/loans`);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP ${response.status}`);
  }
  return response.json() as Promise<PublicLoansResponse>;
}
