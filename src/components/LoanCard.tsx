import { Card } from "@heroui/react";
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

interface DetailField {
  label: string;
  value: string;
  fullWidth?: boolean;
  /** Широкая ячейка в ряду деталей (дата + погашение) */
  wide?: boolean;
}

function buildDetailFields(loan: PublicLoan): DetailField[] {
  const items: DetailField[] = [];
  if (loan.date) items.push({ label: "Дата", value: loan.date });
  if (loan.repayment_type !== "—") {
    items.push({
      label: "Погашение",
      value: loan.repayment_type,
      wide: true,
      fullWidth: !loan.date,
    });
  }
  return items;
}

/** Единый порядок: значение сверху, подпись снизу */
function FieldCell({
  label,
  value,
  fullWidth,
  wide,
  valueVariant = "default",
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
  wide?: boolean;
  valueVariant?: "default" | "primary";
}) {
  const valueClass =
    valueVariant === "primary"
      ? "loan-card__field-value loan-card__field-value--primary tabular-nums"
      : "loan-card__field-value tabular-nums";

  const fieldClass = [
    "loan-card__field",
    fullWidth && "loan-card__field--full",
    wide && "loan-card__field--wide",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={fieldClass}>
      <span
        className={valueClass}
        title={fullWidth || wide ? value : undefined}
        translate="no"
      >
        {value}
      </span>
      <span className="loan-card__field-label">{label}</span>
    </div>
  );
}

function PlatformBadge({ loan }: { loan: PublicLoan }) {
  const label = PLATFORM_LABEL[loan.platform_name] ?? loan.platform_name;

  return (
    <div className="loan-card__platform" translate="no">
      {loan.platform_logo_url ? (
        <img
          src={loan.platform_logo_url}
          alt=""
          className="loan-card__logo"
          width={24}
          height={24}
          loading="lazy"
          decoding="async"
          aria-hidden="true"
        />
      ) : (
        <span className="loan-card__logo-fallback" aria-hidden="true">
          {label.charAt(0).toUpperCase()}
        </span>
      )}
      <span className="loan-card__field-value loan-card__field-value--primary loan-card__platform-name">
        {label}
      </span>
    </div>
  );
}

export function LoanCard({ loan }: LoanCardProps) {
  const details = buildDetailFields(loan);
  const showLtv = loan.ltv !== "—";
  const platformLabel = PLATFORM_LABEL[loan.platform_name] ?? loan.platform_name;

  return (
    <Card variant="secondary" className="loan-card w-full">
      <Card.Content className="loan-card__body">
        <div className="loan-card__top">
          <FieldCell label="Сумма" value={loan.amount} valueVariant="primary" />
          <PlatformBadge loan={loan} />
        </div>

        <div
          className={`loan-card__field-grid${showLtv ? "" : " loan-card__field-grid--two"}`}
          role="group"
          aria-label="Условия займа"
        >
          <FieldCell label="Срок" value={loan.term} />
          <FieldCell label="Ставка" value={loan.rate} />
          {showLtv && <FieldCell label="LTV" value={loan.ltv} />}
        </div>

        {details.length > 0 && (
          <div className="loan-card__field-grid loan-card__field-grid--details">
            {details.map((item) => (
              <FieldCell
                key={item.label}
                label={item.label}
                value={item.value}
                fullWidth={item.fullWidth}
                wide={item.wide}
              />
            ))}
          </div>
        )}

        <div className="loan-card__foot">
          <p className="loan-card__borrower">{loan.borrower_name}</p>
          {loan.card_url && (
            <a
              href={loan.card_url}
              className="loan-card__link-cta"
              aria-label={`Открыть займ на ${platformLabel}`}
              onClick={(e) => {
                e.preventDefault();
                openLoanUrl(loan.card_url);
              }}
            >
              Открыть →
            </a>
          )}
        </div>
      </Card.Content>
    </Card>
  );
}
