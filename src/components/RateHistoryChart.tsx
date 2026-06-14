import { useCallback, useMemo, useRef, useState } from "react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";
import type { PublicRateDailyPoint } from "../api/types";

interface RateHistoryChartProps {
  points: PublicRateDailyPoint[];
}

function formatRate(rate: number): string {
  const rounded = Number.isInteger(rate) ? String(rate) : String(rate).replace(/\.?0+$/, "");
  return `${rounded}%`;
}

function formatDisplayDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

function avgTrend(points: PublicRateDailyPoint[], index: number): "up" | "down" | null {
  if (index === 0) return null;
  const prev = points[index - 1].avg_rate;
  const cur = points[index].avg_rate;
  if (cur > prev) return "up";
  if (cur < prev) return "down";
  return null;
}

export function RateHistoryChart({ points }: RateHistoryChartProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const chartData = useMemo(
    () =>
      points.map((p, i) => ({
        i,
        dateLabel: formatDisplayDate(p.date),
        max_rate: p.max_rate,
        avg_rate: p.avg_rate,
        avg_part: p.avg_rate,
        max_part: Math.max(0, p.max_rate - p.avg_rate),
      })),
    [points],
  );

  const resolveIndex = useCallback(
    (clientX: number) => {
      const el = wrapperRef.current;
      if (!el || points.length === 0) return null;
      const rect = el.getBoundingClientRect();
      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      return Math.min(
        points.length - 1,
        Math.max(0, Math.floor((x / rect.width) * points.length)),
      );
    },
    [points.length],
  );

  const onPointerMove = useCallback(
    (clientX: number) => {
      setActiveIndex(resolveIndex(clientX));
    },
    [resolveIndex],
  );

  const active = activeIndex !== null ? chartData[activeIndex] : null;
  const trend = activeIndex !== null ? avgTrend(points, activeIndex) : null;

  return (
    <div
      className="rate-history-chart"
      ref={wrapperRef}
      role="img"
      aria-label="График ставок за 45 дней"
      onMouseMove={(e) => onPointerMove(e.clientX)}
      onMouseLeave={() => setActiveIndex(null)}
      onTouchStart={(e) => {
        e.preventDefault();
        onPointerMove(e.touches[0].clientX);
      }}
      onTouchMove={(e) => {
        e.preventDefault();
        onPointerMove(e.touches[0].clientX);
      }}
      onTouchEnd={() => setActiveIndex(null)}
    >
      {active && activeIndex !== null && (
        <div
          className="rate-history-tooltip visible"
          style={{ left: `${((activeIndex + 0.5) / points.length) * 100}%` }}
        >
          <div className="rate-history-tooltip__title">Ставка</div>
          <div>{active.dateLabel}</div>
          <div>макс {formatRate(active.max_rate)}</div>
          <div className="tabular-nums">
            ср. {formatRate(active.avg_rate)}
            {trend === "up" && <span className="trend-up"> ↑</span>}
            {trend === "down" && <span className="trend-down"> ↓</span>}
          </div>
        </div>
      )}
      <ResponsiveContainer width="100%" height={48}>
        <BarChart
          data={chartData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          barCategoryGap="6%"
        >
          <Bar
            dataKey="avg_part"
            stackId="day"
            fill="color-mix(in oklch, var(--muted) 55%, transparent)"
            isAnimationActive={false}
          />
          <Bar
            dataKey="max_part"
            stackId="day"
            fill="var(--accent)"
            radius={[1, 1, 0, 0]}
            isAnimationActive={false}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
