import { Button, Card, Chip } from "@heroui/react";
import type { PublicLoan } from "../api/types";
import { openLoanUrl } from "../telegram/openExternal";

interface LoanCardProps {
  loan: PublicLoan;
}

export function LoanCard({ loan }: LoanCardProps) {
  return (
    <Card className="w-full border border-white/10 bg-white/5 backdrop-blur-md">
      <Card.Header className="flex flex-row items-start justify-between gap-2 pb-0">
        <div className="flex flex-col gap-1">
          <Chip size="sm" variant="soft" color="accent">
            {loan.platform_name}
          </Chip>
          <span className="text-2xl font-semibold tracking-tight">{loan.rate}</span>
        </div>
        <div className="text-right text-sm text-zinc-400">
          <div>{loan.amount}</div>
          <div>{loan.term}</div>
        </div>
      </Card.Header>
      <Card.Content className="flex flex-col gap-2 pt-2">
        <div className="text-sm text-zinc-300">
          <div className="truncate font-medium">{loan.borrower_name}</div>
          <div className="mt-1 flex flex-wrap gap-2 text-xs text-zinc-500">
            <span>{loan.date}</span>
            {loan.collateral !== "—" && <span>· {loan.collateral}</span>}
            {loan.ltv !== "—" && <span>· LTV {loan.ltv}</span>}
          </div>
        </div>
        {loan.card_url && (
          <Button
            size="sm"
            variant="secondary"
            className="w-full"
            onPress={() => openLoanUrl(loan.card_url)}
          >
            Открыть на платформе
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}
