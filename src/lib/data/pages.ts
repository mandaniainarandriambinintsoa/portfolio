export type HomeBlockType =
  | "homeHero"
  | "homeClientLogos"
  | "homeCommandCenter"
  | "homeServices"
  | "homeProcess"
  | "homeApproach"
  | "homeTestimonials"
  | "homeStats"
  | "homeCollaborationGuides"
  | "homePricing"
  | "homeTechStack"
  | "homeProjects"
  | "homeVisitorTracking"
  | "homeFAQ"
  | "homeCTAFinal";

export type PageLayoutBlock = {
  blockType: HomeBlockType;
  id?: string | null;
};

export const defaultHomeLayout: PageLayoutBlock[] = [
  { blockType: "homeHero" },
  { blockType: "homeClientLogos" },
  { blockType: "homeCommandCenter" },
  { blockType: "homeServices" },
  { blockType: "homeProcess" },
  { blockType: "homeApproach" },
  { blockType: "homeTestimonials" },
  { blockType: "homeStats" },
  { blockType: "homeCollaborationGuides" },
  { blockType: "homePricing" },
  { blockType: "homeTechStack" },
  { blockType: "homeProjects" },
  { blockType: "homeVisitorTracking" },
  { blockType: "homeFAQ" },
  { blockType: "homeCTAFinal" },
];
