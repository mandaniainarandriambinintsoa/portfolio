import type { Metadata } from "next";
import { i18n, type Locale } from "@/i18n/config";
import { SITE_URL } from "@/lib/constants";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";
import IconScoutIcon from "@/components/icons/IconScoutIcon";

type Goal = {
  title: string;
  detail?: string;
  completed: boolean;
};

type GoalGroup = {
  title: string;
  goals: Goal[];
};

type GoalsContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  progressLabel: string;
  completedLabel: string;
  pendingLabel: string;
  groups: GoalGroup[];
};

const content: Record<Locale, GoalsContent> = {
  fr: {
    metaTitle: "Objectifs de Manda | Parcours et ambitions",
    metaDescription:
      "La feuille de route publique de Manda : formation, développement, entrepreneuriat, investissement, agriculture et apprentissage des langues.",
    eyebrow: "FEUILLE DE ROUTE PERSONNELLE",
    title: "Des objectifs écrits. Des progrès visibles.",
    intro:
      "Un rêve devient plus concret lorsqu’il est nommé, écrit et suivi. Cette page rassemble les étapes déjà franchies et celles qui donnent une direction à la suite de mon parcours.",
    progressLabel: "objectifs accomplis",
    completedLabel: "Accompli",
    pendingLabel: "À construire",
    groups: [
      {
        title: "Fondations",
        goals: [
          {
            title: "Étudier l’informatique",
            detail: "Un objectif fixé dès la classe de seconde.",
            completed: true,
          },
          {
            title: "Obtenir une licence en développement informatique",
            completed: true,
          },
          {
            title: "Valider un Master 1 en informatique",
            completed: true,
          },
          {
            title: "Acquérir de solides bases du métier de développeur en CDI",
            completed: true,
          },
          {
            title: "Me lancer en freelance",
            completed: true,
          },
        ],
      },
      {
        title: "Développement professionnel",
        goals: [
          {
            title: "Cartonner durablement en freelance",
            completed: false,
          },
          {
            title:
              "Déléguer les surplus de missions à d’autres freelances et développer l’apport d’affaires",
            completed: false,
          },
          {
            title: "Créer mon entreprise",
            completed: false,
          },
          {
            title:
              "Devenir top of mind dans plusieurs domaines professionnels",
            completed: false,
          },
        ],
      },
      {
        title: "Investissement et économie locale",
        goals: [
          {
            title: "Investir sur les marchés financiers",
            completed: false,
          },
          {
            title: "Investir dans le secteur du transport",
            completed: false,
          },
          {
            title: "Investir dans l’immobilier",
            completed: false,
          },
          {
            title: "Entreprendre dans l’agriculture locale",
            completed: false,
          },
        ],
      },
      {
        title: "Ouverture internationale",
        goals: [
          {
            title: "Parler couramment d’autres langues",
            detail: "Priorités actuelles : anglais et mandarin.",
            completed: false,
          },
        ],
      },
    ],
  },
  en: {
    metaTitle: "Manda's Goals | Career and long-term ambitions",
    metaDescription:
      "Manda's public roadmap across education, software development, entrepreneurship, investing, local agriculture and language learning.",
    eyebrow: "PERSONAL ROADMAP",
    title: "Written goals. Visible progress.",
    intro:
      "A dream becomes more concrete once it is named, written down and tracked. This page records the milestones already reached and the ambitions shaping the next part of my journey.",
    progressLabel: "goals completed",
    completedLabel: "Completed",
    pendingLabel: "In progress",
    groups: [
      {
        title: "Foundations",
        goals: [
          {
            title: "Study computer science",
            detail: "A goal I set during my second year of high school.",
            completed: true,
          },
          {
            title: "Earn a degree in software development",
            completed: true,
          },
          {
            title: "Complete the first year of a Master's degree",
            completed: true,
          },
          {
            title:
              "Build solid professional foundations as a full-time developer",
            completed: true,
          },
          {
            title: "Start working as a freelancer",
            completed: true,
          },
        ],
      },
      {
        title: "Professional growth",
        goals: [
          {
            title: "Build lasting success as a freelancer",
            completed: false,
          },
          {
            title:
              "Delegate surplus work to other freelancers and develop business referral activity",
            completed: false,
          },
          {
            title: "Build my own company",
            completed: false,
          },
          {
            title: "Become top of mind across several professional fields",
            completed: false,
          },
        ],
      },
      {
        title: "Investment and local economy",
        goals: [
          {
            title: "Invest in financial markets",
            completed: false,
          },
          {
            title: "Invest in the transport sector",
            completed: false,
          },
          {
            title: "Invest in real estate",
            completed: false,
          },
          {
            title: "Build a business in local agriculture",
            completed: false,
          },
        ],
      },
      {
        title: "International outlook",
        goals: [
          {
            title: "Become fluent in additional languages",
            detail: "Current priorities: English and Mandarin.",
            completed: false,
          },
        ],
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale)
    ? rawLocale
    : i18n.defaultLocale) as Locale;
  const copy = content[locale];
  const path = locale === "fr" ? "/goals" : "/en/goals";

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates: {
      canonical: `${SITE_URL}${path}`,
      languages: {
        fr: `${SITE_URL}/goals`,
        en: `${SITE_URL}/en/goals`,
        "x-default": `${SITE_URL}/goals`,
      },
    },
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      url: `${SITE_URL}${path}`,
      type: "profile",
    },
  };
}

export default async function GoalsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = (i18n.locales.includes(rawLocale as Locale)
    ? rawLocale
    : i18n.defaultLocale) as Locale;
  const copy = content[locale];
  const goals = copy.groups.flatMap((group) => group.goals);
  const completedCount = goals.filter((goal) => goal.completed).length;
  const progress = Math.round((completedCount / goals.length) * 100);

  return (
    <main id="main-content" className="relative min-h-screen px-6 pb-24 pt-32">
      <BreadcrumbJsonLd
        items={[
          {
            name: locale === "fr" ? "Accueil" : "Home",
            href: locale === "fr" ? "/" : "/en",
          },
          {
            name: locale === "fr" ? "Objectifs" : "Goals",
            href: locale === "fr" ? "/goals" : "/en/goals",
          },
        ]}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-[34rem] max-w-6xl bg-[radial-gradient(circle_at_65%_10%,rgba(99,102,241,0.13),transparent_55%)]"
      />

      <div className="relative mx-auto max-w-5xl">
        <header className="max-w-4xl border-b border-white/10 pb-12 md:pb-16">
          <p className="text-xs font-bold tracking-[0.24em] text-indigo-300">
            {copy.eyebrow}
          </p>
          <h1 className="gradient-text mt-5 max-w-4xl text-balance text-5xl font-extrabold tracking-tighter md:text-7xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-3xl text-pretty text-lg leading-relaxed text-slate-400 md:text-xl">
            {copy.intro}
          </p>

          <div className="mt-10 max-w-2xl" aria-label={`${completedCount}/${goals.length} ${copy.progressLabel}`}>
            <div className="mb-3 flex items-end justify-between gap-4">
              <p className="text-sm font-semibold text-slate-300">
                <span className="text-3xl font-black text-white">
                  {completedCount}
                </span>{" "}
                / {goals.length} {copy.progressLabel}
              </p>
              <span className="font-mono text-sm font-bold text-indigo-300">
                {progress}%
              </span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </header>

        <div className="mt-6 md:mt-10">
          {copy.groups.map((group, groupIndex) => (
            <section
              key={group.title}
              aria-labelledby={`goal-group-${groupIndex}`}
              className="grid border-b border-white/10 py-10 md:grid-cols-[14rem_1fr] md:gap-12 md:py-14"
            >
              <h2
                id={`goal-group-${groupIndex}`}
                className="mb-6 text-sm font-bold uppercase tracking-[0.16em] text-slate-500 md:mb-0"
              >
                {group.title}
              </h2>

              <ol className="divide-y divide-white/10">
                {group.goals.map((goal, goalIndex) => (
                  <li
                    key={goal.title}
                    className="grid grid-cols-[2rem_1fr_auto] gap-3 py-5 first:pt-0 last:pb-0 sm:grid-cols-[2.5rem_1fr_auto] sm:gap-4"
                  >
                    <span className="pt-1 font-mono text-xs text-slate-600" aria-hidden="true">
                      {String(goalIndex + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p
                        className={`text-base font-semibold leading-relaxed sm:text-lg ${
                          goal.completed ? "text-slate-300" : "text-white"
                        }`}
                      >
                        {goal.title}
                      </p>
                      {goal.detail ? (
                        <p className="mt-1 text-sm leading-relaxed text-slate-500">
                          {goal.detail}
                        </p>
                      ) : null}
                    </div>

                    <span
                      className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-md border ${
                        goal.completed
                          ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                          : "border-white/20 text-transparent"
                      }`}
                      role="img"
                      aria-label={
                        goal.completed
                          ? copy.completedLabel
                          : copy.pendingLabel
                      }
                    >
                      {goal.completed ? (
                        <IconScoutIcon name="check" size={17} />
                      ) : (
                        <span aria-hidden="true">·</span>
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
