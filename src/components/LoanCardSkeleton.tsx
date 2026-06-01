import { Card, Skeleton } from "@heroui/react";

export function LoanCardSkeleton() {
  return (
    <Card variant="secondary" className="w-full">
      <Card.Header className="flex justify-between">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </Card.Header>
      <Card.Content className="flex flex-col gap-3 pt-0">
        <Skeleton className="h-9 w-28 rounded-lg" />
        <Skeleton className="h-4 w-full rounded-md" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </Card.Content>
      <Card.Footer>
        <Skeleton className="h-10 w-full rounded-xl" />
      </Card.Footer>
    </Card>
  );
}
