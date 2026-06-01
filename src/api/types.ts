/** Contract of k2_loan GET /public/loans — keep in sync manually. */

export interface PublicLoan {
  id: string;
  platform_name: string;
  platform_logo_url: string | null;
  rate: string;
  term: string;
  amount: string;
  date: string;
  borrower_name: string;
  collateral: string;
  ltv: string;
  card_url: string;
}

export interface PublicLoansResponse {
  loans: PublicLoan[];
  meta: {
    total: number;
    best_rate: string | null;
    /** All platforms configured in the system (not only those with loans in feed). */
    platforms_count: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
}
