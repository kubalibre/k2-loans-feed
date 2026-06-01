import { Card, Skeleton } from "@heroui/react";

export function LoanCardSkeleton() {
  return (
    <Card variant="secondary" className="loan-card w-full">
      <Card.Header className="loan-card__header">
        <Skeleton className="loan-card__logo rounded-lg" />
        <div className="min-w-0 flex-1">
          <Skeleton className="h-4 w-3/4 rounded-md" />
          <Skeleton className="mt-2 h-3 w-16 rounded-md" />
        </div>
      </Card.Header>
      <Card.Content className="loan-card__body">
        <div className="loan-card__metrics">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="loan-card__metric">
              <Skeleton className="h-5 w-full max-w-[5rem] rounded-md" />
              <Skeleton className="mt-1 h-2.5 w-10 rounded-md" />
            </div>
          ))}
        </div>
        <Skeleton className="h-3 w-4/5 rounded-md" />
      </Card.Content>
      <Card.Footer className="loan-card__footer">
        <Skeleton className="h-10 w-full rounded-xl" />
      </Card.Footer>
    </Card>
  );
}
