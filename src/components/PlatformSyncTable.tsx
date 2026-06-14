import type { PublicPlatformSyncStats } from "../api/types";

interface PlatformSyncTableProps {
  platforms: PublicPlatformSyncStats[];
  platformsCount: number;
}

function formatLastRun(platform: PublicPlatformSyncStats): string {
  if (platform.last_run_status === "running") {
    return "сейчас…";
  }
  if (!platform.last_run_at) {
    return "—";
  }
  return new Date(platform.last_run_at).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function PlatformSyncTable({ platforms, platformsCount }: PlatformSyncTableProps) {
  return (
    <section className="feed-platform-table" aria-labelledby="feed-platform-table-title">
      <h2 id="feed-platform-table-title" className="feed-platform-table__title">
        Платформы · {platformsCount}
      </h2>
      <div className="feed-platform-table__card">
        <table className="feed-platform-table__grid">
          <thead>
            <tr>
              <th scope="col">Платформа</th>
              <th scope="col" className="feed-platform-table__col-numeric">
                Займы
              </th>
              <th scope="col" className="feed-platform-table__col-date">
                Последняя проверка
              </th>
            </tr>
          </thead>
          <tbody>
            {platforms.map((platform) => (
              <tr key={platform.platform_name}>
                <th scope="row" className="feed-platform-table__name" title={platform.platform_name}>
                  {platform.platform_name}
                </th>
                <td className="feed-platform-table__col-numeric tabular-nums">
                  {platform.active_loans_count}
                </td>
                <td className="feed-platform-table__col-date tabular-nums">
                  {formatLastRun(platform)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
