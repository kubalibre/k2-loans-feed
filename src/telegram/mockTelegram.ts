/** Browser dev without Telegram — optional mock via VITE_TG_MOCK=true */
export async function maybeMockTelegram(): Promise<void> {
  if (import.meta.env.PROD || import.meta.env.VITE_TG_MOCK !== "true") return;

  try {
    const { mockTelegramEnv } = await import("@telegram-apps/bridge");
    mockTelegramEnv({
      launchParams: new URLSearchParams({
        tgWebAppPlatform: "tdesktop",
        tgWebAppVersion: "8.0",
        tgWebAppThemeParams: JSON.stringify({
          bg_color: "#0a0a0a",
          text_color: "#fafafa",
        }),
      }),
    });
  } catch {
    // ignore
  }
}
