import { backButton, init as initSdk, miniApp, themeParams, viewport } from "@telegram-apps/sdk-react";

let initialized = false;

export function initTelegramApp(): void {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  try {
    initSdk();
    if (miniApp.mount.isAvailable()) {
      miniApp.mount();
    }
    if (viewport.mount.isAvailable()) {
      viewport.mount();
      viewport.expand();
    }
    if (themeParams.mount.isAvailable()) {
      themeParams.mount();
    }
    if (backButton.mount.isAvailable()) {
      backButton.mount();
      backButton.hide();
    }
    window.Telegram?.WebApp?.ready?.();
    window.Telegram?.WebApp?.expand?.();
  } catch {
    // outside Telegram
  }
}
