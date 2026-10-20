import assert from "node:assert/strict";
import test from "node:test";
import { isAutomatedBrowser } from "./analytics-browser.ts";

test("detects webdriver-controlled browsers", () => {
  assert.equal(
    isAutomatedBrowser({
      webdriver: true,
      userAgent: "Mozilla/5.0 Chrome/141.0.0.0 Safari/537.36",
    }),
    true,
  );
});
test("detects common audit user agents", () => {
  assert.equal(
    isAutomatedBrowser({ userAgent: "Mozilla/5.0 HeadlessChrome/141.0.0.0" }),
    true,
  );
  assert.equal(
    isAutomatedBrowser({ userAgent: "Mozilla/5.0 Chrome-Lighthouse" }),
    true,
  );
});

test("keeps normal browsers eligible for analytics", () => {
  assert.equal(
    isAutomatedBrowser({
      webdriver: false,
      userAgent: "Mozilla/5.0 Chrome/141.0.0.0 Safari/537.36",
    }),
    false,
  );
});
