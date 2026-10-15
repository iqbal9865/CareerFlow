import Link from "next/link";
import { Container, SectionHeading } from "@/components/homepage/container";

// Product facts rather than invented traction numbers — replace with real metrics once available
const STATS = [
  { value: "4", label: "Pipeline stages to track" },
  { value: "1", label: "Dashboard for every application" },
  { value: "0", label: "Spreadsheets required" },
  { value: "$0", label: "To get started" },
];

// PLACEHOLDER: sample testimonials for layout only. Replace with real, consented quotes before launch.
const TESTIMONIALS = [
  {
    quote: "I was juggling 30+ applications in a spreadsheet. CareerFlow made it obvious who to follow up with and when.",
    name: "Sample User",
    role: "Frontend Developer",
  },
  {
    quote: "Seeing my whole pipeline in one view kept me motivated. Every interview stage was right there.",
    name: "Sample User",
    role: "Product Designer",
  },
  {
    quote: "The follow-up dates alone got me two callbacks I would have otherwise forgotten about.",
    name: "Sample User",
    role: "Data Analyst",
  },
];

export function SocialProof() {
  return (
    <section aria-labelledby="proof-heading" className="py-section">
      <Container>
        <dl className="grid grid-cols-2 gap-6 rounded-3xl border border-zinc-200 bg-muted p-8 sm:p-10 lg:grid-cols-4 dark:border-zinc-800">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse text-center">
              <dt className="mt-2 text-sm text-muted-foreground">{stat.label}</dt>
              <dd className="text-4xl font-bold tracking-tight text-primary-text">{stat.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-24">
          <SectionHeading id="proof-heading" eyebrow="Testimonials" title="Built for real job searches" />
        </div>
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <li key={i}>
              <figure className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-background p-6 dark:border-zinc-800">
                <div aria-hidden="true" className="text-amber-400">★★★★★</div>
                <blockquote className="mt-4 flex-1 text-sm leading-6 text-zinc-700 dark:text-zinc-300">“{t.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary-text">
                    {t.role[0]}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-zinc-900 dark:text-white">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function CallToAction() {
  return (
    <section aria-labelledby="cta-heading" className="pb-section">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center shadow-xl shadow-primary/20 sm:px-16">
          <div aria-hidden="true" className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div aria-hidden="true" className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-accent/30 blur-2xl" />
          <h2 id="cta-heading" className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to take control of your job search?
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-indigo-100">
            Join CareerFlow today and turn applications into offers.
          </p>
          <Link
            href="/register"
            className="relative mt-8 inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-8 py-2.5 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
          >
            Get started — it&apos;s free
          </Link>
        </div>
      </Container>
    </section>
  );
}
