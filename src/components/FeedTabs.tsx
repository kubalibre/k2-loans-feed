import type { ListingStatus } from "../api/types";

interface FeedTabsProps {
  value: ListingStatus;
  onChange: (tab: ListingStatus) => void;
}

export function FeedTabs({ value, onChange }: FeedTabsProps) {
  return (
    <div className="feed-tabs" role="tablist" aria-label="Статус займов">
      <button
        type="button"
        role="tab"
        id="feed-tab-active"
        aria-selected={value === "active"}
        aria-controls="feed-panel"
        className={`feed-tabs__btn${value === "active" ? " feed-tabs__btn--active" : ""}`}
        onClick={() => onChange("active")}
      >
        Активные
      </button>
      <button
        type="button"
        role="tab"
        id="feed-tab-closed"
        aria-selected={value === "closed"}
        aria-controls="feed-panel"
        className={`feed-tabs__btn${value === "closed" ? " feed-tabs__btn--active" : ""}`}
        onClick={() => onChange("closed")}
      >
        Закрытые
      </button>
    </div>
  );
}
