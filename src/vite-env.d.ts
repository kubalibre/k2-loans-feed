/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_TG_MOCK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface TelegramWebApp {
  openLink?: (url: string) => void;
  ready?: () => void;
  expand?: () => void;
}

interface Window {
  Telegram?: { WebApp?: TelegramWebApp };
}
