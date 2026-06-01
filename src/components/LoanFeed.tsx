import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { fetchPublicLoans } from "../api/client";
import type { LoansQuery, SortKey } from "../api/types";
import { FilterBar } from "./FilterBar";
import { LoanCard } from "./LoanCard";

export function LoanFeed() {
  const [platformName, setPlatformName] = useState("");
  const [sort, setSort] = useState<SortKey>("rate:asc");

  const query: LoansQuery = useMemo(
    () => ({ platformName: platformName || undefined, sort }),
    [platformName, sort],
  );

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["public-loans", query],
    queryFn: () => fetchPublicLoans(query),
    staleTime: 60_000,
  });

  return (
    <div className="mx-auto w-full max-w-[var(--app-max-width)] px-4 pb-8 pt-2">
      <FilterBar
        platformName={platformName}
        sort={sort}
        onPlatformChange={setPlatformName}
        onSortChange={setSort}
      />

      {isLoading && (
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      )}

      {isError && (
        <div className="rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-danger">
          <p className="font-medium">Не удалось загрузить займы</p>
          <p className="mt-1 opacity-80">{error instanceof Error ? error.message : String(error)}</p>
          <button type="button" className="mt-3 underline" onClick={() => void refetch()}>
            Повторить
          </button>
        </div>
      )}

      {!isLoading && !isError && data?.loans.length === 0 && (
        <p className="py-12 text-center text-default-500">Нет займов по выбранным фильтрам</p>
      )}

      {!isLoading && !isError && data && data.loans.length > 0 && (
        <>
          <p className="mb-3 text-xs text-default-500">
            {data.meta.total} займов{isFetching ? " · обновление…" : ""}
          </p>
          <ul className="flex flex-col gap-3">
            {data.loans.map((loan) => (
              <li key={loan.id}>
                <LoanCard loan={loan} />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
