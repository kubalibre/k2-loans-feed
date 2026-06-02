import { Button, Card, Separator } from "@heroui/react";
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

function buildDetailsLine(loan: PublicLoan): string | null {
  const parts = [
    loan.date,
    loan.collateral !== "—" ? loan.collateral : null,
    loan.ltv !== "—" ? `LTV ${loan.ltv}` : null,
    loan.repayment_type !== "—" ? `Погашение: ${loan.repayment_type}` : null,
    loan.loan_purpose !== "—" ? `Цель: ${loan.loan_purpose}` : null,
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(" · ") : null;
}

function PlatformLogo({ loan }: { loan: PublicLoan }) {
  const label = PLATFORM_LABEL[loan.platform_name] ?? loan.platform_name;

  if (loan.platform_logo_url) {
    return (
      <img
        src={loan.platform_logo_url}
        alt=""
        className="loan-card__logo"
        width={32}
        height={32}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <span className="loan-card__logo-fallback" aria-hidden="true">
      {label.charAt(0).toUpperCase()}
    </span>
  );
}

export function LoanCard({ loan }: LoanCardProps) {
  const platformLabel = PLATFORM_LABEL[loan.platform_name] ?? loan.platform_name;
  const details = buildDetailsLine(loan);

  return (
    <Card variant="secondary" className="loan-card w-full">
      <Card.Header className="loan-card__header">
        <PlatformLogo loan={loan} />
        <div className="min-w-0 flex-1">
          <Card.Title className="loan-card__title truncate">{loan.borrower_name}</Card.Title>
          <Card.Description className="loan-card__platform">{platformLabel}</Card.Description>
        </div>
      </Card.Header>

      <Card.Content className="loan-card__body">
        <div className="loan-card__metrics" role="group" aria-label="Условия займа">
          <div className="loan-card__metric loan-card__metric--primary">
            <span className="loan-card__metric-value tabular-nums">{loan.amount}</span>
            <span className="loan-card__metric-label">Сумма</span>
          </div>
          <div className="loan-card__metric loan-card__metric--primary">
            <span className="loan-card__metric-value tabular-nums">{loan.term}</span>
            <span className="loan-card__metric-label">Срок</span>
          </div>
          <div className="loan-card__metric">
            <span className="loan-card__metric-value tabular-nums">{loan.rate}</span>
            <span className="loan-card__metric-label">Ставка</span>
          </div>
        </div>
        {details && <p className="loan-card__details">{details}</p>}
      </Card.Content>

      {loan.card_url && (
        <>
          <Separator />
          <Card.Footer className="loan-card__footer">
            <Button
              variant="primary"
              size="sm"
              className="loan-card__cta"
              onPress={() => openLoanUrl(loan.card_url)}
            >
              Открыть займ
            </Button>
          </Card.Footer>
        </>
      )}
    </Card>
  );
}
