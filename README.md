# k2-loans-feed

Отдельное клиентское приложение: лента нормализованных займов для браузера и Telegram Mini App.

**Не требует** локального запуска монорепозитория [k2_loan](https://github.com/your-org/k2_loan) — только публичный HTTP API.

## API

По умолчанию (см. `.env.example`):

```
GET https://admin-api-production-4a7f.up.railway.app/public/loans
```

Параметры: `sortBy`, `sortOrder`, опционально `platformName`. Ответ — только займы со статусом `ok`.

## Локальная разработка

```bash
cp .env.example .env
npm install
npm run dev
```

Откройте http://localhost:5174. В браузере без Telegram включите `VITE_TG_MOCK=true`.

## Сборка

```bash
npm run build
npm run preview
```

Артефакт: `dist/` (статика).

## Production (Railway)

- https://loans-feed-production.up.railway.app
- API: `https://admin-api-production-4a7f.up.railway.app/public/loans`

Nginx слушает переменную `PORT` (см. `nginx.conf.template`) — иначе healthcheck на Railway падает.

## Деплой (Railway / nginx)

1. Соберите с `VITE_API_URL`, указывающим на prod API.
2. Раздавайте `dist/` как static site (см. `Dockerfile`).
3. В BotFather укажите HTTPS URL Mini App на production-домен.

## Стек

- Vite + React 19 + TypeScript
- HeroUI v3 + Tailwind v4
- TanStack Query
- `@telegram-apps/sdk-react` (viewport, theme, ссылки)

Типы API продублированы в `src/api/types.ts` — без зависимости от `@k2/shared`.
