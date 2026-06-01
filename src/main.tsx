import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";
import { initTelegramApp } from "./telegram/initTelegram";
import { maybeMockTelegram } from "./telegram/mockTelegram";

const queryClient = new QueryClient();

async function bootstrap() {
  await maybeMockTelegram();
  initTelegramApp();

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>,
  );
}

void bootstrap();
