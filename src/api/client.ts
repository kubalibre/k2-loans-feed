import type { ListingStatus, PublicLoansResponse, PublicRateHistoryResponse } from "./types";

const API_URL = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") ?? "";

export function getApiBaseUrl(): string {
  if (!API_URL) {
    throw new Error("VITE_API_URL is not set. Copy .env.example to .env");
  }
  return API_URL;
}

/** Public feed; listingStatus matches active/closed tab. */
export async function fetchPublicLoans(
  listingStatus: ListingStatus = "active",
): Promise<PublicLoansResponse> {
  const params = new URLSearchParams({ listingStatus });
  const response = await fetch(`${getApiBaseUrl()}/public/loans?${params}`);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP ${response.status}`);
  }
  return response.json() as Promise<PublicLoansResponse>;
}

export async function fetchRateHistory(days = 45): Promise<PublicRateHistoryResponse> {
  const params = new URLSearchParams({ days: String(days) });
  const response = await fetch(`${getApiBaseUrl()}/public/rate-history?${params}`);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP ${response.status}`);
  }
  return response.json() as Promise<PublicRateHistoryResponse>;
}
