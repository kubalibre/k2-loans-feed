import type { PublicLoansResponse } from "../api/types";

interface FeedStatsProps {
  meta: PublicLoansResponse["meta"];
  isFetching?: boolean;
}

export function FeedStats({ meta, isFetching }: FeedStatsProps) {
  return (
    <div className="feed-stats">
      <div className="feed-stat">
        <p className="feed-stat__value tabular-nums">{meta.total_active}</p>
        <p className="feed-stat__label">Займов</p>
      </div>
      <div className="feed-stat">
        <p className="feed-stat__value tabular-nums">{meta.best_rate ?? "—"}</p>
        <p className="feed-stat__label">Лучшая ставка</p>
      </div>
      <div className="feed-stat">
        <p className="feed-stat__value tabular-nums">
          {meta.platforms_count}
          {isFetching ? "…" : ""}
        </p>
        <p className="feed-stat__label">Платформ</p>
      </div>
    </div>
  );
}
