import { Card, Skeleton } from "@heroui/react";

function FieldSkeleton({ fullWidth }: { fullWidth?: boolean }) {
  return (
    <div className={fullWidth ? "loan-card__field loan-card__field--full" : "loan-card__field"}>
      <Skeleton className="h-4 w-full max-w-[5.5rem] rounded-md" />
      <Skeleton className="h-2.5 w-10 rounded-md" />
    </div>
  );
}

export function LoanCardSkeleton() {
  return (
    <Card variant="secondary" className="loan-card w-full">
      <Card.Content className="loan-card__body">
        <div className="loan-card__top">
          <FieldSkeleton />
          <Skeleton className="h-6 w-20 shrink-0 rounded-md" />
        </div>
        <div className="loan-card__field-grid">
          {Array.from({ length: 3 }, (_, i) => (
            <FieldSkeleton key={i} />
          ))}
        </div>
        <div className="loan-card__field-grid loan-card__field-grid--details">
          <FieldSkeleton />
          <div className="loan-card__field loan-card__field--wide">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-2.5 w-16 rounded-md" />
          </div>
        </div>
        <div className="loan-card__foot">
          <Skeleton className="h-3 w-2/3 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      </Card.Content>
    </Card>
  );
}
