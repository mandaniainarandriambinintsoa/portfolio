import { workflowScrapingJob } from "./workflow-scraping-job";
import { workflowTrackingVisiteurs } from "./workflow-tracking-visiteurs";
import { workflowVeilleCodeur } from "./workflow-veille-codeur";

export const workflows: Record<string, object> = {
  "scraping-flowremote": workflowScrapingJob,
  "tracking-visiteurs": workflowTrackingVisiteurs,
  "veille-codeur": workflowVeilleCodeur,
  // EN slugs map to same workflows
  "visitor-tracking": workflowTrackingVisiteurs,
};
