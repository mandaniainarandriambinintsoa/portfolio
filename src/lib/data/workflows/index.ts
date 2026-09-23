import { workflowScrapingJob } from "./workflow-scraping-job";
import { workflowTrackingVisiteurs } from "./workflow-tracking-visiteurs";
import { workflowVeilleCodeur } from "./workflow-veille-codeur";
import { workflowTeamiaProspecting } from "./workflow-teamia-prospecting";

export const workflows: Record<string, object> = {
  "scraping-flowremote": workflowScrapingJob,
  "tracking-visiteurs": workflowTrackingVisiteurs,
  "veille-codeur": workflowVeilleCodeur,
  "teamia-prospecting": workflowTeamiaProspecting,
  // EN slugs map to same workflows
  "visitor-tracking": workflowTrackingVisiteurs,
};
