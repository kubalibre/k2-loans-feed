import { chromium } from "playwright";

const url = process.argv[2] ?? "https://loans-feed-production.up.railway.app/";

const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});

await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
await page.waitForTimeout(4000);

const state = await page.evaluate(() => ({
  h1: document.querySelector("h1")?.textContent,
  cards: document.querySelectorAll(".card").length,
  loans: document.querySelectorAll(".feed-list li").length,
  rootLen: document.getElementById("root")?.innerHTML?.length ?? 0,
  text: document.body.innerText.slice(0, 600),
}));

console.log(JSON.stringify({ url, state, errors }, null, 2));
await browser.close();
process.exit(state.loans > 0 && state.rootLen > 100 ? 0 : 1);
