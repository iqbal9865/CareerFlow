import Link from "next/link";
import { Logo } from "@/components/logo";
import { Container } from "@/components/homepage/container";

// Company/legal pages don't exist yet; "#" links are placeholders until they do
const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "#features", label: "Features" },
      { href: "#how-it-works", label: "How it works" },
      { href: "#faq", label: "FAQ" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/register", label: "Create account" },
      { href: "/login", label: "Log in" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "#", label: "About" },
      { href: "#", label: "Contact" },
      { href: "#", label: "Privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-muted dark:border-zinc-800">
      <Container className="grid gap-12 py-16 md:grid-cols-5">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
            The simple, organized way to manage your job search from first application to signed offer.
          </p>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-white">{col.title}</h2>
            <ul className="mt-4 space-y-1">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="inline-flex min-h-9 items-center text-sm text-muted-foreground hover:text-zinc-900 dark:hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <div className="border-t border-zinc-200 dark:border-zinc-800">
        <Container className="flex flex-col items-center justify-between gap-4 py-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} CareerFlow. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-white">
              Terms of Service
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
