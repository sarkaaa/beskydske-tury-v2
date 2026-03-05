import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    trace: "on-first-retry",
    extraHTTPHeaders: {
      "x-vercel-protection-bypass": process.env.VERCEL_AUTOMATION_BYPASS_SECRET ?? "",
    },
  },
  webServer: {
    command: "pnpm run dev",
    url: process.env.BASE_URL ?? "http://localhost:3000",
    reuseExistingServer: true,
  },
  projects: [
    {
      name: "DesktopChrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
});
