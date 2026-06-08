/** Contract of k2_loan GET /public/loans — keep in sync manually. */

export type ListingStatus = "active" | "closed";

export interface PublicPlatformSyncStats {
  platform_name: string;
  active_loans_count: number;
  last_run_at: string | null;
  last_run_status: "running" | "success" | "failed" | null;
}

export interface PublicLoan {
  id: string;
  listing_status: ListingStatus;
  /** Display name from admin (`Platform.name`). */
  platform_name: string;
  platform_logo_url: string | null;
  rate: string;
  term: string;
  amount: string;
  date: string;
  borrower_name: string;
  collateral: string;
  ltv: string;
  repayment_type: string;
  loan_purpose: string;
  card_url: string;
}

export interface PublicLoansResponse {
  loans: PublicLoan[];
  meta: {
    total: number;
    /** All ok + active loans (widget «Займов»). */
    total_active: number;
    /** Highest rate in feed (max). */
    best_rate: string | null;
    /** All platforms configured in the system (not only those with loans in feed). */
    platforms_count: number;
    platforms: PublicPlatformSyncStats[];
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
}
