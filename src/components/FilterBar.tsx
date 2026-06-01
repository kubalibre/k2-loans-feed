import type { SortKey } from "../api/types";

const PLATFORM_OPTIONS = [
  { value: "", label: "Все платформы" },
  { value: "lender", label: "lender" },
  { value: "vbeton", label: "vbeton" },
  { value: "fintrack", label: "fintrack" },
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "rate:asc", label: "Ставка ↑" },
  { value: "rate:desc", label: "Ставка ↓" },
  { value: "amount:asc", label: "Сумма ↑" },
  { value: "amount:desc", label: "Сумма ↓" },
  { value: "term:asc", label: "Срок ↑" },
  { value: "date:desc", label: "Дата ↓" },
];

const selectClass =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-foreground outline-none focus:border-blue-500";

interface FilterBarProps {
  platformName: string;
  sort: SortKey;
  onPlatformChange: (value: string) => void;
  onSortChange: (value: SortKey) => void;
}

export function FilterBar({ platformName, sort, onPlatformChange, onSortChange }: FilterBarProps) {
  return (
    <div className="sticky top-0 z-10 -mx-4 mb-4 border-b border-white/10 bg-zinc-950/80 px-4 py-3 backdrop-blur-lg">
      <h1 className="mb-3 text-xl font-semibold tracking-tight">Займы</h1>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-xs text-zinc-400">
          Платформа
          <select
            className={selectClass}
            value={platformName}
            onChange={(e) => onPlatformChange(e.target.value)}
          >
            {PLATFORM_OPTIONS.map((o) => (
              <option key={o.value || "all"} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs text-zinc-400">
          Сортировка
          <select
            className={selectClass}
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortKey)}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
