import { workflowScrapingJob } from "./workflow-scraping-job";
import { workflowTrackingVisiteurs } from "./workflow-tracking-visiteurs";

export const workflows: Record<string, object> = {
  "scraping-flowremote": workflowScrapingJob,
  "tracking-visiteurs": workflowTrackingVisiteurs,
  // EN slugs map to same workflows
  "visitor-tracking": workflowTrackingVisiteurs,
};
