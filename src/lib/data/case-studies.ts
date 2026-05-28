import type { CaseStudy } from "@/lib/types";
import type { Locale } from "@/i18n/config";

type LocalizedCaseStudy = Record<Locale, CaseStudy>;

const caseStudies: Record<string, LocalizedCaseStudy> = {
  madavoyage: {
    fr: {
      brief:
        "Concevoir une landing page premium pour une agence de voyages à Madagascar. Le site devait transmettre l'aventure et l'unicité de l'île tout en restant rassurant et professionnel pour la conversion. Cible : voyageurs européens en quête d'expérience authentique. Sections attendues : hero immersif, circuits proposés, formulaire de réservation, rassurance, galerie, témoignages.",
      variantsIntro:
        "Workflow design IA-first : à partir du brief, du design système et du logo, je génère 3 variantes design par IA. Le client choisit la direction qui le parle, on retouche si besoin, puis on passe au code. Ici, une 1ère piste a été écartée tôt et deux directions ont été présentées côte à côte.",
      variants: [
        {
          image: "/images/projects/madavoyage/variant-2-hero.png",
          label: "Direction 2 — Plage tropicale lumineuse",
          description:
            "Atmosphère claire et solaire, palmiers et eau turquoise. Très accessible, immédiatement reconnaissable comme « Madagascar plage ». Composition hero + cards circuits + formulaire de réservation latéral.",
        },
        {
          image: "/images/projects/madavoyage/variant-3-hero.png",
          label: "Direction 3 — Côte rocheuse au coucher de soleil",
          description:
            "Tonalité plus cinématographique, atmosphère sauvage. Plus différenciant mais potentiellement trop sombre pour une page conversion, et moins évident à étendre aux sections suivantes.",
        },
      ],
      decision:
        "La direction 2 a été retenue : le côté lumineux et tropical inspire plus immédiatement l'envie de voyage, et la composition hero + circuits + formulaire latéral structurait mieux le funnel de réservation. Décision validée en une itération, sans retouche supplémentaire.",
      finalImage: "/images/projects/madavoyage/final-desktop.png",
      finalCaption:
        "Intégration finale en Next.js 16 + GSAP. Le site final reprend la direction artistique de la variante 2 (palmiers, lumière dorée) avec une photo réelle de Madagascar pour le hero plutôt que la maquette IA brute. Architecture découplée (data, composants, lib) prête à être dupliquée pour d'autres clients voyage ou réservation.",
    },
    en: {
      brief:
        "Design a premium landing page for a Madagascar travel agency. The site needed to convey adventure and the island's uniqueness while staying reassuring and professional for conversion. Target: European travelers looking for authentic experiences. Expected sections: immersive hero, featured tours, booking form, trust signals, gallery, testimonials.",
      variantsIntro:
        "AI-first design workflow: from the brief, design system and logo, I generate 3 AI design variants. The client picks the direction they like, we tweak if needed, then we move to code. Here, an early direction was set aside and two directions were presented side by side.",
      variants: [
        {
          image: "/images/projects/madavoyage/variant-2-hero.png",
          label: "Direction 2 — Bright tropical beach",
          description:
            "Sunny, clear atmosphere with palm trees and turquoise water. Very accessible, immediately recognizable as 'Madagascar beach'. Composition: hero + tour cards + side booking form.",
        },
        {
          image: "/images/projects/madavoyage/variant-3-hero.png",
          label: "Direction 3 — Rocky coastline at sunset",
          description:
            "More cinematic tone, wild atmosphere. More distinctive but potentially too dark for a conversion page, and harder to extend to the rest of the page.",
        },
      ],
      decision:
        "Direction 2 was selected: the bright, tropical mood inspires the desire to travel more immediately, and the hero + tours + side booking form composition structured the booking funnel better. Decision locked in one iteration, no further tweak needed.",
      finalImage: "/images/projects/madavoyage/final-desktop.png",
      finalCaption:
        "Final build in Next.js 16 + GSAP. The site echoes the variant 2 art direction (palm trees, golden light) with a real Madagascar photo for the hero rather than the raw AI mockup. Decoupled architecture (data, components, lib) ready to be duplicated for other travel or booking clients.",
    },
  },
};

export function getCaseStudy(slug: string, locale: Locale): CaseStudy | null {
  return caseStudies[slug]?.[locale] ?? null;
}

export function hasCaseStudy(slug: string): boolean {
  return slug in caseStudies;
}
