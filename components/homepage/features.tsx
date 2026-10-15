import type { ComponentType } from "react";
import { Container, SectionHeading } from "@/components/homepage/container";
import { BellIcon, BriefcaseIcon, NoteIcon, PipelineIcon, ShieldIcon, UserIcon } from "@/components/homepage/icons";

// Each feature maps to something the product actually does today
const FEATURES: { title: string; description: string; icon: ComponentType<{ className?: string }> }[] = [
  {
    title: "Track applications",
    description: "Log company, role, salary range, location, source and the job link in seconds. Every opportunity, one place.",
    icon: BriefcaseIcon,
  },
  {
    title: "Manage your pipeline",
    description: "Move applications from Pending to Interview to Accepted, and see at a glance how your search is going.",
    icon: PipelineIcon,
  },
  {
    title: "Stay on top of interviews",
    description: "Set follow-up dates for every application so no recruiter email or thank-you note slips through the cracks.",
    icon: BellIcon,
  },
  {
    title: "Keep notes in context",
    description: "Capture interviewer names, prep notes and impressions right next to the application they belong to.",
    icon: NoteIcon,
  },
  {
    title: "Build your profile",
    description: "Keep your bio, portfolio, LinkedIn and GitHub links together, ready whenever an application asks for them.",
    icon: UserIcon,
  },
  {
    title: "Private by default",
    description: "Your search is yours. Secure, token-based sign-in and data only you can see.",
    icon: ShieldIcon,
  },
];

export function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="scroll-mt-16 py-section">
      <Container>
        <SectionHeading
          id="features-heading"
          eyebrow="Features"
          title="Everything your job search needs"
          description="Replace scattered spreadsheets, sticky notes and inbox searches with a single tool built for job seekers."
        />
        <ul className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ title, description, icon: Icon }) => (
            <li
              key={title}
              className="group rounded-2xl border border-zinc-200 bg-background p-6 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 dark:border-zinc-800"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary-text transition group-hover:bg-primary group-hover:text-white">
                <Icon />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-zinc-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
