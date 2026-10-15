import { Container, SectionHeading } from "@/components/homepage/container";

const STEPS = [
  { title: "Create your free account", description: "Sign up with your email in under a minute. No credit card, no setup." },
  { title: "Add your applications", description: "Log each role as you apply, with links, salary, notes and a follow-up date." },
  { title: "Track progress to an offer", description: "Update statuses as you hear back and focus your energy where it counts." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="scroll-mt-16 border-y border-zinc-200 bg-muted py-section dark:border-zinc-800">
      <Container>
        <SectionHeading id="how-heading" eyebrow="How it works" title="From first application to signed offer" />
        <div className="relative mt-16">
          <div aria-hidden="true" className="absolute left-[16.66%] right-[16.66%] top-6 hidden h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0 md:block" />
          <ol className="grid gap-10 md:grid-cols-3 md:gap-6">
            {STEPS.map((step, i) => (
              <li key={step.title} className="relative text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-white shadow-lg shadow-primary/30 ring-8 ring-muted">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-white">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
