import type { Block } from "payload";

function homeSectionBlock(slug: string, label: string): Block {
  return {
    slug,
    labels: {
      singular: label,
      plural: label,
    },
    fields: [
      {
        name: "adminLabel",
        type: "text",
        admin: {
          description: "Optional label shown to editors only.",
        },
      },
    ],
  };
}

export const HomeHeroBlock = homeSectionBlock("homeHero", "Hero");
export const HomeClientLogosBlock = homeSectionBlock("homeClientLogos", "Client logos");
export const HomeCommandCenterBlock = homeSectionBlock("homeCommandCenter", "Command center");
export const HomeServicesBlock = homeSectionBlock("homeServices", "Services");
export const HomeProcessBlock = homeSectionBlock("homeProcess", "Process");
export const HomeApproachBlock = homeSectionBlock("homeApproach", "Approach");
export const HomeTestimonialsBlock = homeSectionBlock("homeTestimonials", "Testimonials");
export const HomeStatsBlock = homeSectionBlock("homeStats", "Stats");
export const HomeCollaborationGuidesBlock = homeSectionBlock("homeCollaborationGuides", "Collaboration guides");
export const HomePricingBlock = homeSectionBlock("homePricing", "Pricing");
export const HomeTechStackBlock = homeSectionBlock("homeTechStack", "Tech stack");
export const HomeProjectsBlock = homeSectionBlock("homeProjects", "Projects");
export const HomeVisitorTrackingBlock = homeSectionBlock("homeVisitorTracking", "Visitor tracking");
export const HomeFAQBlock = homeSectionBlock("homeFAQ", "FAQ");
export const HomeCTAFinalBlock = homeSectionBlock("homeCTAFinal", "Final CTA");

export const homeLayoutBlocks = [
  HomeHeroBlock,
  HomeClientLogosBlock,
  HomeCommandCenterBlock,
  HomeServicesBlock,
  HomeProcessBlock,
  HomeApproachBlock,
  HomeTestimonialsBlock,
  HomeStatsBlock,
  HomeCollaborationGuidesBlock,
  HomePricingBlock,
  HomeTechStackBlock,
  HomeProjectsBlock,
  HomeVisitorTrackingBlock,
  HomeFAQBlock,
  HomeCTAFinalBlock,
];
