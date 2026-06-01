import { Chip, Tabs } from "@heroui/react";
import type { SortKey } from "../api/types";
import { FilterSelect } from "./FilterSelect";

const PLATFORMS = [
  { id: "all", label: "Все" },
  { id: "lender", label: "Lender" },
  { id: "vbeton", label: "Vbeton" },
  { id: "fintrack", label: "Fintrack" },
];

const SORT_OPTIONS: { id: SortKey; label: string }[] = [
  { id: "rate:asc", label: "Ставка ↑" },
  { id: "rate:desc", label: "Ставка ↓" },
  { id: "amount:asc", label: "Сумма ↑" },
  { id: "amount:desc", label: "Сумма ↓" },
  { id: "term:asc", label: "Срок ↑" },
  { id: "date:desc", label: "Дата ↓" },
];

interface FilterBarProps {
  platformName: string;
  sort: SortKey;
  total?: number;
  isFetching?: boolean;
  onPlatformChange: (value: string) => void;
  onSortChange: (value: SortKey) => void;
}

export function FilterBar({
  platformName,
  sort,
  total,
  isFetching,
  onPlatformChange,
  onSortChange,
}: FilterBarProps) {
  const platformKey = platformName || "all";

  return (
    <header className="sticky top-0 z-20 -mx-4 mb-4 px-4 pt-2 pb-4 backdrop-blur-md">
      <div className="card card--secondary rounded-2xl p-4 shadow-sm">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">Займы</h1>
            <p className="mt-0.5 text-sm text-muted">Сравнение предложений с платформ</p>
          </div>
          {total != null && (
            <Chip size="sm" variant="soft" color="accent">
              {total}
              {isFetching ? "…" : ""}
            </Chip>
          )}
        </div>

        <Tabs
          variant="secondary"
          selectedKey={platformKey}
          onSelectionChange={(key) => onPlatformChange(key === "all" ? "" : String(key))}
          className="mb-3"
        >
          <Tabs.ListContainer>
            <Tabs.List aria-label="Платформа">
              {PLATFORMS.map((p) => (
                <Tabs.Tab key={p.id} id={p.id}>
                  {p.label}
                </Tabs.Tab>
              ))}
              <Tabs.Indicator />
            </Tabs.List>
          </Tabs.ListContainer>
        </Tabs>

        <FilterSelect
          label="Сортировка"
          selectedKey={sort}
          options={SORT_OPTIONS}
          onChange={(id) => onSortChange(id as SortKey)}
        />
      </div>
    </header>
  );
}
