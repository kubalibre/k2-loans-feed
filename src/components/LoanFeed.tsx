import { Alert, Button, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { fetchPublicLoans } from "../api/client";
import type { LoansQuery, SortKey } from "../api/types";
import { FilterBar } from "./FilterBar";
import { LoanCard } from "./LoanCard";
import { LoanCardSkeleton } from "./LoanCardSkeleton";

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
    <div className="mx-auto w-full max-w-[var(--app-max-width)] px-4 pb-10">
      <FilterBar
        platformName={platformName}
        sort={sort}
        total={data?.meta.total}
        isFetching={isFetching && !isLoading}
        onPlatformChange={setPlatformName}
        onSortChange={setSort}
      />

      {isLoading && (
        <div className="feed-list" aria-busy="true">
          {Array.from({ length: 3 }, (_, i) => (
            <LoanCardSkeleton key={i} />
          ))}
        </div>
      )}

      {isError && (
        <Alert status="danger" className="mt-2">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Не удалось загрузить займы</Alert.Title>
            <Alert.Description>
              {error instanceof Error ? error.message : String(error)}
            </Alert.Description>
            <Button variant="outline" size="sm" className="mt-3" onPress={() => void refetch()}>
              Повторить
            </Button>
          </Alert.Content>
        </Alert>
      )}

      {!isLoading && !isError && data?.loans.length === 0 && (
        <Alert status="default" className="mt-2">
          <Alert.Content>
            <Alert.Title>Нет займов</Alert.Title>
            <Alert.Description>Попробуйте другую платформу или сортировку.</Alert.Description>
          </Alert.Content>
        </Alert>
      )}

      {!isLoading && !isError && data && data.loans.length > 0 && (
        <ul className="feed-list">
          {data.loans.map((loan) => (
            <li key={loan.id}>
              <LoanCard loan={loan} />
            </li>
          ))}
        </ul>
      )}

      {isFetching && !isLoading && !isError && (
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-30 -translate-x-1/2">
          <Spinner size="sm" />
        </div>
      )}
    </div>
  );
}
