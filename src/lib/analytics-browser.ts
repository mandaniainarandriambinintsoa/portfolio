const AUTOMATION_USER_AGENT =
  /HeadlessChrome|Lighthouse|Google-InspectionTool|PageSpeed Insights/i;

export type BrowserAutomationSignals = {
  webdriver?: boolean;
  userAgent?: string;
};

export function isAutomatedBrowser({
  webdriver = false,
  userAgent = "",
}: BrowserAutomationSignals): boolean {
  return webdriver || AUTOMATION_USER_AGENT.test(userAgent);
}
export function isCurrentBrowserAutomated(): boolean {
  if (typeof navigator === "undefined") return false;

  return isAutomatedBrowser({
    webdriver: navigator.webdriver,
    userAgent: navigator.userAgent,
  });
}
