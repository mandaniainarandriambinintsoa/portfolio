"use client";

import { useState, useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap-register";
import Link from "next/link";
import IconScoutIcon, {
  LegacyIconScoutIcon,
} from "@/components/icons/IconScoutIcon";

type Scores = {
  workflow: number;
  custom_app: number;
  ai_integration: number;
  full_scale: number;
};

type ProfileKey = keyof Scores;

type QuizOption = {
  label: string;
  scores: Scores;
};

type QuizQuestion = {
  icon: string;
  title: string;
  options: QuizOption[];
};

type QuizResult = {
  title: string;
  color: string;
  description: string;
  benefits: string[];
  service_slug: string;
};

type QuizDict = {
  page_title: string;
  page_subtitle: string;
  badge: string;
  start: string;
  next: string;
  email_title: string;
  email_subtitle: string;
  email_placeholder: string;
  email_submit: string;
  email_error: string;
  result_title: string;
  result_cta_contact: string;
  result_cta_service: string;
  result_restart: string;
  questions: QuizQuestion[];
  results: Record<string, QuizResult>;
};

const TOTAL_QUESTIONS = 5;

const colorMap: Record<string, string> = {
  indigo: "text-indigo-400",
  emerald: "text-emerald-400",
  blue: "text-blue-400",
  purple: "text-purple-400",
};

const bgColorMap: Record<string, string> = {
  indigo: "bg-indigo-500/10 border-indigo-500/20",
  emerald: "bg-emerald-500/10 border-emerald-500/20",
  blue: "bg-blue-500/10 border-blue-500/20",
  purple: "bg-purple-500/10 border-purple-500/20",
};

const borderColorMap: Record<string, string> = {
  indigo: "border-indigo-500/40",
  emerald: "border-emerald-500/40",
  blue: "border-blue-500/40",
  purple: "border-purple-500/40",
};

function calculateResult(answers: number[], questions: QuizQuestion[]): ProfileKey {
  const scores: Scores = { workflow: 0, custom_app: 0, ai_integration: 0, full_scale: 0 };

  answers.forEach((answerIndex, qIndex) => {
    const option = questions[qIndex]?.options[answerIndex];
    if (option) {
      (Object.keys(option.scores) as ProfileKey[]).forEach((key) => {
        scores[key] += option.scores[key];
      });
    }
  });

  const priority: ProfileKey[] = ["workflow", "custom_app", "ai_integration", "full_scale"];
  let best: ProfileKey = "workflow";
  let bestScore = -1;

  for (const key of priority) {
    if (scores[key] > bestScore) {
      bestScore = scores[key];
      best = key;
    }
  }

  return best;
}

export default function QuizClient({
  dict,
  locale,
}: {
  dict: QuizDict;
  locale: string;
}) {
  const [step, setStep] = useState(0); // 0=intro, 1-5=questions, 6=email, 7=result
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [resultType, setResultType] = useState<ProfileKey>("workflow");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);

  const animateIn = useCallback(() => {
    if (!stepRef.current) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        stepRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    });
  }, []);

  useGSAP(() => {
    animateIn();
  }, { scope: containerRef, dependencies: [step] });

  const goToStep = (newStep: number) => {
    if (!stepRef.current) {
      setStep(newStep);
      return;
    }
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(stepRef.current, {
        x: -60,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
        onComplete: () => {
          setStep(newStep);
          setSelectedOption(null);
        },
      });
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      setStep(newStep);
      setSelectedOption(null);
    });
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);

    // Pulse animation on selected
    const options = stepRef.current?.querySelectorAll("[data-option]");
    if (options?.[optionIndex]) {
      gsap.fromTo(
        options[optionIndex],
        { scale: 1 },
        { scale: 1.03, duration: 0.15, yoyo: true, repeat: 1, ease: "power2.out" }
      );
    }

    // Auto-advance after brief delay
    setTimeout(() => {
      const newAnswers = [...answers];
      newAnswers[step - 1] = optionIndex;
      setAnswers(newAnswers);

      if (step < TOTAL_QUESTIONS) {
        goToStep(step + 1);
      } else {
        // Calculate result and go to email step
        const result = calculateResult(newAnswers, dict.questions);
        setResultType(result);
        goToStep(6);
      }
    }, 400);
  };

  const handleEmailSubmit = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(dict.email_error);
      return;
    }
    setEmailError("");
    setIsSubmitting(true);

    try {
      await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          answers: answers.map((a, i) => ({
            question: dict.questions[i]?.title,
            answer: dict.questions[i]?.options[a]?.label,
          })),
          result_type: resultType,
          locale,
        }),
      });
    } catch {
      // Continue to result even if save fails
    }

    setIsSubmitting(false);
    goToStep(7);
  };

  const handleRestart = () => {
    setAnswers([]);
    setSelectedOption(null);
    setEmail("");
    setEmailError("");
    setResultType("workflow");
    goToStep(0);
  };

  const prefix = locale === "fr" ? "" : `/${locale}`;
  const result = dict.results[resultType];
  const progressPercent = step >= 1 && step <= 5 ? (step / TOTAL_QUESTIONS) * 100 : 0;

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto">
      {/* Progress bar for question steps */}
      {step >= 1 && step <= 5 && (
        <div className="mb-8">
          <div className="flex justify-between text-sm text-slate-500 mb-2">
            <span>Question {step}/{TOTAL_QUESTIONS}</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      <div ref={stepRef}>
        {/* Step 0: Intro */}
        {step === 0 && (
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
              <IconScoutIcon name="clock" size={16} />
              {dict.badge}
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter gradient-text">
              {dict.page_title}
            </h2>
            <p className="text-lg text-slate-400 max-w-lg mx-auto">
              {dict.page_subtitle}
            </p>
            <button
              onClick={() => goToStep(1)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all text-lg cursor-pointer"
            >
              {dict.start}
            </button>
          </div>
        )}

        {/* Steps 1-5: Questions */}
        {step >= 1 && step <= 5 && (
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <LegacyIconScoutIcon
                name={dict.questions[step - 1]?.icon ?? "code"}
                size={30}
                className="shrink-0 text-indigo-400"
              />
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {dict.questions[step - 1]?.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {dict.questions[step - 1]?.options.map((option, idx) => (
                <button
                  key={idx}
                  data-option
                  onClick={() => handleOptionSelect(idx)}
                  className={`text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                    selectedOption === idx
                      ? "bg-indigo-500/15 border-indigo-500/40 text-white"
                      : "glass-card border-white/[0.08] text-slate-300 hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Email */}
        {step === 6 && (
          <div className="text-center space-y-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
              <IconScoutIcon name="envelope" size={30} className="text-indigo-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              {dict.email_title}
            </h2>
            <p className="text-lg text-slate-400 max-w-md mx-auto">
              {dict.email_subtitle}
            </p>
            <div className="max-w-sm mx-auto space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                placeholder={dict.email_placeholder}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500/50 transition-all"
                onKeyDown={(e) => e.key === "Enter" && handleEmailSubmit()}
              />
              {emailError && (
                <p className="text-red-400 text-sm">{emailError}</p>
              )}
              <button
                onClick={handleEmailSubmit}
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-2xl transition-all text-lg cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <IconScoutIcon name="spinner" size={22} className="animate-spin" />
                  </span>
                ) : (
                  dict.email_submit
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 7: Result */}
        {step === 7 && result && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                {dict.result_title}
              </p>
              <h2 className={`text-3xl md:text-5xl font-extrabold tracking-tighter ${colorMap[result.color] || "text-indigo-400"}`}>
                {result.title}
              </h2>
            </div>

            <div className={`glass-card rounded-2xl p-8 border ${borderColorMap[result.color] || ""}`}>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                {result.description}
              </p>
              <ul className="space-y-3">
                {result.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300">
                    <IconScoutIcon
                      name="check"
                      size={18}
                      className={`mt-0.5 shrink-0 ${colorMap[result.color] || "text-indigo-400"}`}
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`${prefix}/contact`}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-white transition-all ${
                  result.color === "indigo" ? "bg-indigo-600 hover:bg-indigo-500" :
                  result.color === "emerald" ? "bg-emerald-600 hover:bg-emerald-500" :
                  result.color === "blue" ? "bg-blue-600 hover:bg-blue-500" :
                  "bg-purple-600 hover:bg-purple-500"
                }`}
              >
                {dict.result_cta_contact}
              </Link>
              <Link
                href={`${prefix}/services/${result.service_slug}`}
                className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold border transition-all ${bgColorMap[result.color] || ""} ${colorMap[result.color] || "text-indigo-400"}`}
              >
                {dict.result_cta_service}
              </Link>
            </div>

            <div className="text-center">
              <button
                onClick={handleRestart}
                className="text-slate-500 hover:text-white transition-all text-sm underline underline-offset-4 cursor-pointer"
              >
                {dict.result_restart}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
