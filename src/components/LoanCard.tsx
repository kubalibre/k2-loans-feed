import { Button, Card, Chip, Separator } from "@heroui/react";
import type { PublicLoan } from "../api/types";
import { openLoanUrl } from "../telegram/openExternal";

const PLATFORM_LABEL: Record<string, string> = {
  lender: "Lender",
  vbeton: "Vbeton",
  fintrack: "Fintrack",
};

interface LoanCardProps {
  loan: PublicLoan;
}

export function LoanCard({ loan }: LoanCardProps) {
  const platformLabel = PLATFORM_LABEL[loan.platform_name] ?? loan.platform_name;

  return (
    <Card variant="secondary" className="w-full">
      <Card.Header className="flex flex-row items-start justify-between gap-3">
        <Chip size="sm" variant="soft" color="accent">
          {platformLabel}
        </Chip>
        <div className="text-right">
          <p className="text-sm font-medium">{loan.amount}</p>
          <p className="text-xs text-muted">{loan.term}</p>
        </div>
      </Card.Header>

      <Card.Content className="flex flex-col gap-3 pt-0">
        <div>
          <Card.Title className="text-3xl font-semibold tracking-tight">{loan.rate}</Card.Title>
          <Card.Description className="mt-1 line-clamp-2">{loan.borrower_name}</Card.Description>
        </div>

        <div className="flex flex-wrap gap-2">
          <Chip size="sm" variant="tertiary">
            {loan.date}
          </Chip>
          {loan.collateral !== "—" && (
            <Chip size="sm" variant="tertiary">
              {loan.collateral}
            </Chip>
          )}
          {loan.ltv !== "—" && (
            <Chip size="sm" variant="tertiary">
              LTV {loan.ltv}
            </Chip>
          )}
        </div>
      </Card.Content>

      {loan.card_url && (
        <>
          <Separator />
          <Card.Footer>
            <Button variant="primary" className="w-full" onPress={() => openLoanUrl(loan.card_url)}>
              Открыть на платформе
            </Button>
          </Card.Footer>
        </>
      )}
    </Card>
  );
}
