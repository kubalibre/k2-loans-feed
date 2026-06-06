import { Alert, Button, Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchPublicLoans } from "../api/client";
import type { ListingStatus } from "../api/types";
import { FeedStats } from "./FeedStats";
import { FeedTabs } from "./FeedTabs";
import { LoanCard } from "./LoanCard";
import { LoanCardSkeleton } from "./LoanCardSkeleton";

const EMPTY_COPY: Record<ListingStatus, { title: string; description: string }> = {
  active: {
    title: "Нет активных займов",
    description: "Сейчас нет активных предложений.",
  },
  closed: {
    title: "Нет закрытых займов",
    description: "Закрытые займы появятся здесь после снятия с листинга.",
  },
};

export function LoanFeed() {
  const [listingStatus, setListingStatus] = useState<ListingStatus>("active");

  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ["public-loans", listingStatus],
    queryFn: () => fetchPublicLoans(listingStatus),
    staleTime: 60_000,
  });

  const empty = EMPTY_COPY[listingStatus];

  return (
    <div className="mx-auto w-full max-w-[var(--app-max-width)] px-4 pb-10">
      <header className="feed-header">
        <h1 className="feed-header__title">Займы</h1>
        <p className="feed-header__subtitle">Предложения с инвестиционных платформ</p>
        {data?.meta && (
          <FeedStats meta={data.meta} isFetching={isFetching && !isLoading} />
        )}
      </header>

      <FeedTabs value={listingStatus} onChange={setListingStatus} />

      <div id="feed-panel" role="tabpanel" aria-labelledby={`feed-tab-${listingStatus}`}>
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
              <Alert.Title>{empty.title}</Alert.Title>
              <Alert.Description>{empty.description}</Alert.Description>
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
      </div>

      {isFetching && !isLoading && !isError && (
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-30 -translate-x-1/2">
          <Spinner size="sm" />
        </div>
      )}
    </div>
  );
}
