# AGENT.md — k2-loans-feed

## Bootstrap

1. **«Прочитай AGENT.md»** — перед правками кода.
2. **UI/UX (блокирующее):** **никогда** не делать дизайн/mockup/стили без скиллов. Любая UI-задача → **сначала** прочитать скиллы (раздел ниже) → audit/варианты → код. Правило `.cursor/rules/ui-ux.mdc`.
3. **Backend/API** — монорепо [k2_loan](https://github.com/kubalibre/k2_loan); здесь только клиент + `GET /public/loans`.
4. **Git push** — после коммита агент пушит сам (`origin`, ветка `master`). Коммит — только по запросу.

---

## Purpose

Публичная лента нормализованных займов: браузер и **Telegram Mini App**.

| Prod | URL |
|------|-----|
| Feed | https://loans-feed-production.up.railway.app |
| API | https://admin-api-production-4a7f.up.railway.app/public/loans |

Репо: `w:\YandexDisk\gitrepos\k2-loans-feed` · GitHub `kubalibre/k2-loans-feed` · Railway project `6094cfb9-cfb8-4a98-adb6-758e87de8913`

---

## Dev

```bash
cp .env.example .env
npm install
npm run dev    # http://localhost:5174
```

- `VITE_TG_MOCK=true` — эмуляция Telegram в браузере.
- Сборка: `npm run build` · preview: `npm run preview`.
- Nginx: переменная `PORT` обязательна (Railway healthcheck).

---

## Стек

- Vite + React 19 + TypeScript
- HeroUI v3 + Tailwind v4
- TanStack Query · `@telegram-apps/sdk-react`
- Типы API: `src/api/types.ts` (без `@k2/shared`)

### Ключевые файлы UI

| Компонент | Путь |
|-----------|------|
| Лента | `src/components/LoanFeed.tsx` |
| Карточка | `src/components/LoanCard.tsx` |
| Stats | `src/components/FeedStats.tsx` |
| Стили | `src/index.css` |

---

## Дизайн и UX (согласовано 2026-06-03)

**Жёсткое правило:** без **явного согласования владельца** не менять визуал и UX.

| Можно без отдельного «ок на дизайн» | Только после согласования |
|-------------------------------------|---------------------------|
| Багфикс по **прямому** описанию («убери sticky», «исправь наложение») | Layout, цвета, типографика, радиусы, borders, sticky/fixed шапка |
| Контракт API / данные по **отдельной** задаче | Новые блоки в карточке, фильтры, сортировка в UI, CTA |
| Рефакторинг без изменения внешнего вида | Push/deploy «улучшений дизайна» по инициативе агента |

**Идеи по дизайну — предложить, не внедрять:**

1. Кратко: вариант + trade-offs (1–3 пункта).
2. Mockup в `docs/mockups/` (HTML, двойной клик в Explorer).
3. Дождаться **«ок» / «делай»** — только потом код.

**Baseline (не менять без ok):** stats (займы / лучшая ставка = max / платформы в системе), карточка с логотипом, сумма·срок·ставка, вторичная строка, кнопка «Открыть займ», **без** sticky-шапки и **без** фильтров/сортировки в UI.

---

## UI/UX скиллы — обязательный workflow

**Триггер:** карточка, лента, stats, mockup, CSS, HeroUI, Telegram layout, a11y, CTA, типографика.

**Порядок (не пропускать):**

1. **`ui-ux-pro-max`** — иерархия, a11y (контраст, focus, touch ≥44px), mobile-first, без horizontal scroll, spacing, состояния loading/error.
2. **`frontend-design`** — mockup и визуальные варианты; тон: сдержанный fintech/utilitarian для ленты (не «кричащий» CTA на каждой карточке). **Без** чужого branding (Deerflow и т.п.).
3. **`web-design-guidelines`** — перед финализацией mockup или после правок TSX: fetch guidelines, краткий self-check.

**Данные в UI:** сумма займа — до **~100 млн ₽** и больше; не обрезать `…` без согласования. Паттерн: **сумма — отдельная hero-строка** (полная ширина, `tabular-nums`, fluid `font-size` или сокращение «100 млн ₽» + полное значение в `title`/`aria-label`).

| Скилл | Путь |
|-------|------|
| ui-ux-pro-max | `.agents/skills/ui-ux-pro-max/SKILL.md` |
| frontend-design | `.agents/skills/frontend-design/SKILL.md` |
| web-design-guidelines | `.agents/skills/web-design-guidelines/SKILL.md` |

Обновление: `npx skills add <owner/repo@skill> -y`

---

## Decisions log

- Отдельный репо от k2_loan; только public API (2026-06-01)
- Telegram Mini App — основной сценарий; mobile-first
- Baseline UI зафиксирован; изменения только после согласования (2026-06-03)
- UI/UX скиллы подключены в `.agents/skills/` (2026-06-03)
- Агент **обязан** читать UI/UX скиллы на каждой UI-задаче; сумма — hero-строка, stress до 100 млн ₽ (2026-06-03)
