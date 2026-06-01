/** Contract of k2_loan GET /public/loans — keep in sync manually. */

export interface PublicLoan {
  id: string;
  platform_name: string;
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
    sortBy: string;
    sortOrder: "asc" | "desc";
  };
}

export type SortKey = "rate:asc" | "rate:desc" | "amount:asc" | "amount:desc" | "term:asc" | "date:desc";

export interface LoansQuery {
  platformName?: string;
  sort: SortKey;
}
