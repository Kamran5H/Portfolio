"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { FormEvent, ReactNode } from "react";

type FieldKey = "name" | "email" | "projectType" | "budget" | "message";

type FieldErrors = Partial<Record<FieldKey, string>>;

type FormValues = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Icon({ children }: { children: ReactNode }) {
  return <span className="text-[var(--accent-cyan)]">{children}</span>;
}

const EnvelopeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 6h16v12H4V6Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      opacity="0.95"
    />
    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);
const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 22A10 10 0 1 0 12 2a10 10 0 0 0 0 20Z" stroke="currentColor" strokeWidth="2" />
    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 22A10 10 0 1 0 12 2a10 10 0 0 0 0 20Z" stroke="currentColor" strokeWidth="2" />
    <path d="M2 12h20" stroke="currentColor" strokeWidth="2" opacity="0.85" />
    <path d="M12 2c3 3 3 17 0 20-3-3-3-17 0-20Z" stroke="currentColor" strokeWidth="2" opacity="0.85" />
  </svg>
);
const ChatIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M4 4h16v12H7l-3 3V4Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M8 9h8M8 12h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
  </svg>
);
const DropdownArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="m7 10 5 5 5-5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PROJECT_TYPES = [
  "Amazon Brand Research Pipeline",
  "Custom Scraper",
  "ASIN Intelligence Tool",
  "Desktop Automation GUI",
  "Full 3-Phase Pipeline",
  "Something Else",
] as const;

const BUDGETS = ["$100–$500", "$500–$1,500", "$1,500–$5,000", "$5,000+", "Let's Discuss"] as const;

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formError, setFormError] = useState<string | null>(null);

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    company: "",
    projectType: PROJECT_TYPES[0],
    budget: BUDGETS[0],
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (!values.name.trim()) next.name = "Your full name is required.";
    if (!values.email.trim()) next.email = "Email is required.";
    else if (!emailRegex.test(values.email.trim())) next.email = "Enter a valid email address.";
    if (!values.projectType.trim()) next.projectType = "Project type is required.";
    if (!values.budget.trim()) next.budget = "Budget range is required.";
    if (!values.message.trim()) next.message = "Project brief is required.";

    setFieldErrors(next);
    setFormError(null);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setFormError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          company: values.company,
          projectType: values.projectType,
          budget: values.budget,
          message: values.message,
        }),
      });

      const data: unknown = await res.json();
      if (!res.ok) {
        const msg = typeof data === "object" && data && "error" in data ? (data as { error?: unknown }).error : null;
        setStatus("error");
        setFormError(typeof msg === "string" && msg ? msg : null);
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setFormError(null);
    }
  };

  return (
    <section id="contact" className="bg-[var(--bg-primary)] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="font-ibm uppercase text-[12px] tracking-[0.2em] text-[var(--accent-cyan)]">// contact</div>
          <div className="font-mono font-bold text-[42px] text-[var(--text-primary)] mt-2">Start Your Project</div>
        </div>

        <div className="mt-16 flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-[45%]">
            <div className="font-mono font-bold text-[36px] leading-[1.2] text-[var(--text-primary)] whitespace-pre-line">
              Let's build something
              <br />
              that actually works.
            </div>

            <div className="mt-4 font-body text-[16px] leading-[1.7] text-[var(--text-secondary)]">
              Tell me what you need. I'll tell you exactly how I'd build it, how long it takes, and what it costs — within 24
              hours. No sales pitch. No generic proposals.
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] py-4">
                <Icon>
                  <EnvelopeIcon />
                </Icon>
                <div className="font-body text-[14px] text-[var(--text-secondary)]">hello@kamranashraf.com</div>
              </div>
              <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] py-4">
                <Icon>
                  <ClockIcon />
                </Icon>
                <div className="font-body text-[14px] text-[var(--text-secondary)]">Response within 24 hours</div>
              </div>
              <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] py-4">
                <Icon>
                  <GlobeIcon />
                </Icon>
                <div className="font-body text-[14px] text-[var(--text-secondary)]">Available for remote projects worldwide</div>
              </div>
              <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] py-4">
                <Icon>
                  <ChatIcon />
                </Icon>
                <div className="font-body text-[14px] text-[var(--text-secondary)]">
                  Also on: Upwork · Fiverr · LinkedIn
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-3 font-ibm uppercase text-[11px] text-[var(--accent-green)]">
                <span className="animate-pulse_dot" aria-hidden="true">
                  ◉
                </span>
                <span>CURRENTLY AVAILABLE FOR NEW PROJECTS</span>
              </div>
              <div className="font-ibm text-[11px] text-[var(--text-muted)] mt-2">Estimated start: Within 48 hours</div>
            </div>
          </div>

          <div className="w-full lg:w-[55%]">
            <div
              className="bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-[12px] p-[32px] transition-colors duration-200 focus-within:border-[var(--border-glow)]"
            >
              <AnimatePresence mode="wait">
                {status !== "success" ? (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    <div>
                      <label htmlFor="name" className="font-ibm uppercase text-[11px] tracking-[0.15em] text-[var(--text-muted)] block mb-2">
                        Name*
                      </label>
                      <input
                        id="name"
                        value={values.name}
                        onChange={(ev) => setValues((v) => ({ ...v, name: ev.target.value }))}
                        className="bg-[rgba(0,212,255,0.03)] border border-[var(--border-subtle)] rounded-[6px] text-[var(--text-primary)] font-jetbrains text-[14px] p-[12px_16px] w-full placeholder:text-[var(--text-muted)] focus:border-[var(--accent-cyan)] focus:shadow-[0_0_0_3_rgba(0,212,255,0.08)] outline-none transition-all duration-200"
                        placeholder="Your full name"
                        autoComplete="name"
                      />
                      {fieldErrors.name && (
                        <div className="mt-1 font-ibm text-[11px] text-[var(--error-red)]" aria-live="polite">
                          {fieldErrors.name}
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="font-ibm uppercase text-[11px] tracking-[0.15em] text-[var(--text-muted)] block mb-2">
                        Email*
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={values.email}
                        onChange={(ev) => setValues((v) => ({ ...v, email: ev.target.value }))}
                        className="bg-[rgba(0,212,255,0.03)] border border-[var(--border-subtle)] rounded-[6px] text-[var(--text-primary)] font-jetbrains text-[14px] p-[12px_16px] w-full placeholder:text-[var(--text-muted)] focus:border-[var(--accent-cyan)] focus:shadow-[0_0_0_3_rgba(0,212,255,0.08)] outline-none transition-all duration-200"
                        placeholder="your@email.com"
                        autoComplete="email"
                      />
                      {fieldErrors.email && (
                        <div className="mt-1 font-ibm text-[11px] text-[var(--error-red)]" aria-live="polite">
                          {fieldErrors.email}
                        </div>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="company"
                        className="font-ibm uppercase text-[11px] tracking-[0.15em] text-[var(--text-muted)] block mb-2"
                      >
                        Company / Website
                      </label>
                      <input
                        id="company"
                        value={values.company}
                        onChange={(ev) => setValues((v) => ({ ...v, company: ev.target.value }))}
                        className="bg-[rgba(0,212,255,0.03)] border border-[var(--border-subtle)] rounded-[6px] text-[var(--text-primary)] font-jetbrains text-[14px] p-[12px_16px] w-full placeholder:text-[var(--text-muted)] focus:border-[var(--accent-cyan)] focus:shadow-[0_0_0_3_rgba(0,212,255,0.08)] outline-none transition-all duration-200"
                        placeholder="Amazon store / company (optional)"
                      />
                    </div>

                    <div>
                      <label htmlFor="projectType" className="font-ibm uppercase text-[11px] tracking-[0.15em] text-[var(--text-muted)] block mb-2">
                        Project Type*
                      </label>
                      <div className="relative">
                        <select
                          id="projectType"
                          value={values.projectType}
                          onChange={(ev) => setValues((v) => ({ ...v, projectType: ev.target.value }))}
                          className="appearance-none bg-[rgba(0,212,255,0.03)] border border-[var(--border-subtle)] rounded-[6px] text-[var(--text-primary)] font-jetbrains text-[14px] p-[12px_16px] w-full pr-[40px] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-cyan)] focus:shadow-[0_0_0_3_rgba(0,212,255,0.08)] outline-none transition-all duration-200"
                        >
                          {PROJECT_TYPES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 text-[var(--accent-cyan)]">
                          <DropdownArrow />
                        </div>
                      </div>
                      {fieldErrors.projectType && (
                        <div className="mt-1 font-ibm text-[11px] text-[var(--error-red)]" aria-live="polite">
                          {fieldErrors.projectType}
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="budget" className="font-ibm uppercase text-[11px] tracking-[0.15em] text-[var(--text-muted)] block mb-2">
                        Budget Range*
                      </label>
                      <div className="relative">
                        <select
                          id="budget"
                          value={values.budget}
                          onChange={(ev) => setValues((v) => ({ ...v, budget: ev.target.value }))}
                          className="appearance-none bg-[rgba(0,212,255,0.03)] border border-[var(--border-subtle)] rounded-[6px] text-[var(--text-primary)] font-jetbrains text-[14px] p-[12px_16px] w-full pr-[40px] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-cyan)] focus:shadow-[0_0_0_3_rgba(0,212,255,0.08)] outline-none transition-all duration-200"
                        >
                          {BUDGETS.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute right-[14px] top-1/2 -translate-y-1/2 text-[var(--accent-cyan)]">
                          <DropdownArrow />
                        </div>
                      </div>
                      {fieldErrors.budget && (
                        <div className="mt-1 font-ibm text-[11px] text-[var(--error-red)]" aria-live="polite">
                          {fieldErrors.budget}
                        </div>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="font-ibm uppercase text-[11px] tracking-[0.15em] text-[var(--text-muted)] block mb-2">
                        Project Brief*
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        value={values.message}
                        onChange={(ev) => setValues((v) => ({ ...v, message: ev.target.value }))}
                        className="bg-[rgba(0,212,255,0.03)] border border-[var(--border-subtle)] rounded-[6px] text-[var(--text-primary)] font-jetbrains text-[14px] p-[12px_16px] w-full placeholder:text-[var(--text-muted)] focus:border-[var(--accent-cyan)] focus:shadow-[0_0_0_3_rgba(0,212,255,0.08)] outline-none transition-all duration-200"
                        placeholder="Describe your project. What do you need scraped? How many keywords? What's the output format? The more detail, the better."
                      />
                      {fieldErrors.message && (
                        <div className="mt-1 font-ibm text-[11px] text-[var(--error-red)]" aria-live="polite">
                          {fieldErrors.message}
                        </div>
                      )}
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full bg-[var(--accent-cyan)] text-[var(--bg-primary)] font-ibm uppercase font-bold tracking-[0.1em] text-[13px] h-[52px] rounded-[6px] shadow-[var(--glow-cyan)] transition-transform duration-200 hover:scale-[1.01] active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {status === "loading" ? (
                          <div className="flex items-center justify-center gap-3">
                            <div className="w-[18px] h-[18px] border-[2px] border-[rgba(0,212,255,0.3)] border-t-[var(--bg-primary)] rounded-full animate-spin" />
                            <span>Sending...</span>
                          </div>
                        ) : (
                          "→ Send Project Brief"
                        )}
                      </button>
                    </div>

                    <div aria-live="polite" className="min-h-[18px]">
                      {status === "error" && (
                        <div className="mt-3 font-ibm text-[14px] text-[var(--error-red)]">
                          ❌ Something went wrong. Please email: hello@kamranashraf.com
                        </div>
                      )}
                    </div>
                    {formError && (
                      <div className="sr-only" aria-live="polite">
                        {formError}
                      </div>
                    )}
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center justify-center text-center min-h-[220px]"
                  >
                    <div className="font-mono text-[18px] text-[var(--accent-green)]">
                      ✅ Message received. I'll respond within 24 hours.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

