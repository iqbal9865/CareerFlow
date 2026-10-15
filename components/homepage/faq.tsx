import { Container, SectionHeading } from "@/components/homepage/container";

const FAQS = [
  {
    q: "Is CareerFlow free?",
    a: "Yes. Create an account and start tracking your applications at no cost.",
  },
  {
    q: "What can I track for each application?",
    a: "Company, position, location, salary range, job posting link, where you found it, notes, the date you applied, a follow-up date and the current status.",
  },
  {
    q: "Which statuses does the pipeline support?",
    a: "Every application moves through Pending, Interview, Accepted or Rejected, and your dashboard shows a live count for each.",
  },
  {
    q: "Who can see my data?",
    a: "Only you. Every request is authenticated, and applications are scoped to your account.",
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-16 pb-section">
      <Container className="max-w-3xl">
        <SectionHeading id="faq-heading" eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-12 divide-y divide-zinc-200 rounded-2xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          {FAQS.map((item) => (
            <details key={item.q} className="group px-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-left font-medium text-zinc-900 dark:text-white">
                {item.q}
                <span aria-hidden="true" className="text-xl text-muted-foreground transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-5 text-sm leading-6 text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
