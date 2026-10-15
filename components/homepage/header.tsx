"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { Container, primaryButton } from "@/components/homepage/container";
import { CloseIcon, MenuIcon } from "@/components/homepage/icons";

export const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-background/80 backdrop-blur-lg dark:border-zinc-800/70">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>
      <Container className="flex h-16 items-center justify-between">
        <Logo />

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm font-medium text-muted-foreground transition hover:text-zinc-900 dark:hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/login" className="inline-flex min-h-11 items-center rounded-lg px-4 text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white">
            Log in
          </Link>
          <Link href="/register" className={primaryButton}>
            Get started
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-zinc-700 hover:bg-muted md:hidden dark:text-zinc-200"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </Container>

      {open && (
        <div id="mobile-menu" className="border-t border-zinc-200 bg-background md:hidden dark:border-zinc-800">
          <Container className="py-4">
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-11 items-center rounded-lg px-3 text-base font-medium text-zinc-800 hover:bg-muted dark:text-zinc-100"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-4 grid gap-2 border-t border-zinc-200 pt-4 dark:border-zinc-800">
              <Link href="/login" className="flex min-h-11 items-center justify-center rounded-lg border border-zinc-300 text-sm font-semibold dark:border-zinc-700">
                Log in
              </Link>
              <Link href="/register" className={primaryButton}>
                Get started
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
