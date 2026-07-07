import { defineConfig, devices } from "@playwright/test";
import { AUDIT_SERVER_PORT } from "./scripts/export-audit/constants";

const baseURL = `http://127.0.0.1:${AUDIT_SERVER_PORT}`;

export default defineConfig({
  testDir: "./e2e",
  testMatch: /export-audit\.(pages|links)\.spec\.ts/,
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: Number(process.env.AUDIT_RETRIES ?? (process.env.CI ? 1 : 0)),
  workers: Number(process.env.AUDIT_WORKERS ?? (process.env.CI ? 4 : 6)),
  reporter: [["list"], ["html", { open: "never", outputFolder: "reports/playwright-html" }]],
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL,
    trace: "off",
    screenshot: "off",
    video: "off",
  },
  projects: [
    {
      name: "pages",
      testMatch: /export-audit\.pages\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "links",
      testMatch: /export-audit\.links\.spec\.ts/,
      dependencies: ["pages"],
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  globalSetup: "./e2e/global-setup.ts",
  globalTeardown: "./e2e/global-teardown.ts",
  webServer: {
    // Do NOT use -s (SPA mode): missing files must return real HTTP 404.
    command: `npx serve out -l ${AUDIT_SERVER_PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
