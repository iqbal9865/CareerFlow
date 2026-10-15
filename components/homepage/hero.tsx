import Link from "next/link";
import { Container, primaryButton, secondaryButton } from "@/components/homepage/container";
import { ArrowRightIcon, CheckIcon } from "@/components/homepage/icons";
import { ProductPreview } from "@/components/homepage/product-preview";

const HIGHLIGHTS = ["Free to use", "No spreadsheets", "Set up in a minute"];

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[36rem] bg-[radial-gradient(ellipse_at_top,var(--primary-soft),transparent_70%)]"
      />
      <Container className="grid items-center gap-16 py-16 sm:py-24 lg:grid-cols-2 lg:gap-12">
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-background px-3 py-1 text-xs font-medium text-muted-foreground dark:border-zinc-800">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Your job search command center
          </p>
          <h1 id="hero-heading" className="mt-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
            Land your next role with a job search that{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">actually flows</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground lg:mx-0">
            CareerFlow keeps every application, interview and follow-up in one organized pipeline — so you always know
            where you stand and what to do next.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Link href="/register" className={`${primaryButton} gap-2 px-6`}>
              Get started free
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <a href="#features" className={`${secondaryButton} px-6`}>
              Learn more
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground lg:justify-start">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <CheckIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ProductPreview />
      </Container>
    </section>
  );
}
