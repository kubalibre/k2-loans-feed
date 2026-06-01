import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./index.css";
import { initTelegramApp } from "./telegram/initTelegram";
import { maybeMockTelegram } from "./telegram/mockTelegram";

const queryClient = new QueryClient();

async function bootstrap() {
  try {
    await maybeMockTelegram();
    initTelegramApp();
  } catch (e) {
    console.warn("Telegram init skipped:", e);
  }

  const rootEl = document.getElementById("root");
  if (!rootEl) return;

  createRoot(rootEl).render(
    <StrictMode>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ErrorBoundary>
    </StrictMode>,
  );
}

void bootstrap().catch((e) => {
  console.error("Bootstrap failed:", e);
});
