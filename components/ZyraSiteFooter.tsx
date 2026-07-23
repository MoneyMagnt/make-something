"use client";

import { Button, Input, Link } from "@heroui/react";
import NextLink from "next/link";
import { FormEvent, useState } from "react";

const WHATSAPP_BASE_URL = "https://wa.me/233556877954";
const GROWTH_AUDIT_URL = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(
  "hi zyra, i want to talk through the best next move for my brand."
)}`;

const buildNewsletterIntentUrl = (email: string) => {
  const cleanEmail = email.trim().toLowerCase();
  const text = `hi zyra, i want to join the zyra growth brief newsletter.${cleanEmail ? ` my email is ${cleanEmail}.` : ""}`;
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(text)}`;
};

export function ZyraSiteFooter() {
  const [email, setEmail] = useState("");
  const [helperText, setHelperText] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setHelperText("add your email, then we'll open whatsapp to confirm your signup.");
      return;
    }

    const isEmailLike = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail);
    if (!isEmailLike) {
      setHelperText("please enter a valid email address.");
      return;
    }

    setHelperText("opening whatsapp to complete your growth brief signup.");
    window.open(buildNewsletterIntentUrl(cleanEmail), "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="relative border-t border-slate-200/80 bg-white/88 backdrop-blur dark:border-slate-700/80 dark:bg-slate-950/88">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          <section className="space-y-3">
            <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-slate-900 dark:text-slate-100">
              zyra
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              we help growing brands get noticed, look credible online, and turn attention into inquiries, sales, and ticket demand.
            </p>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              permission-based outreach only
            </p>
            <Link
              href={GROWTH_AUDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-cyan-700 hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
            >
              book a quick growth call
            </Link>
          </section>

          <section className="space-y-3">
            <p className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold uppercase tracking-[0.13em] text-slate-700 dark:text-slate-300">
              services
            </p>
            <div className="grid gap-2 text-sm">
              <Link
                as={NextLink}
                href="/services/seo"
                className="text-slate-700 hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-300"
              >
                seo support
              </Link>
              <Link
                as={NextLink}
                href="/services/content"
                className="text-slate-700 hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-300"
              >
                content support
              </Link>
              <Link
                as={NextLink}
                href="/services/influencer"
                className="text-slate-700 hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-300"
              >
                creator campaigns
              </Link>
              <Link
                as={NextLink}
                href="/services/founder-websites"
                className="text-slate-700 hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-300"
              >
                founder website sprint
              </Link>
            </div>
          </section>

          <section className="space-y-3">
            <p className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold uppercase tracking-[0.13em] text-slate-700 dark:text-slate-300">
              proof + resources
            </p>
            <div className="grid gap-2 text-sm">
              <Link
                as={NextLink}
                href="/#proof"
                className="text-slate-700 hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-300"
              >
                proof
              </Link>
              <Link
                as={NextLink}
                href="/#results"
                className="text-slate-700 hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-300"
              >
                case snapshots
              </Link>
              <Link
                as={NextLink}
                href="/#how-we-work"
                className="text-slate-700 hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-300"
              >
                how we work
              </Link>
              <Link
                as={NextLink}
                href="/#faq"
                className="text-slate-700 hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-300"
              >
                quick faq
              </Link>
              <Link
                href={WHATSAPP_BASE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-700 hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-300"
              >
                talk on whatsapp
              </Link>
            </div>
          </section>

          <section className="space-y-3">
            <p className="font-[family-name:var(--font-space-grotesk)] text-sm font-bold uppercase tracking-[0.13em] text-slate-700 dark:text-slate-300">
              zyra notes
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              occasional notes on visibility, trust, websites, and campaigns when they are worth your time.
            </p>
            <form className="grid gap-2" onSubmit={handleSubmit}>
              <Input
                type="email"
                label="Email address"
                value={email}
                onValueChange={setEmail}
                variant="bordered"
                size="sm"
                classNames={{
                  inputWrapper:
                    "border-slate-200 bg-white/90 dark:border-slate-700 dark:bg-slate-900/80",
                }}
              />
              <Button
                type="submit"
                size="sm"
                className="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
              >
                join zyra notes
              </Button>
            </form>
            {helperText ? (
              <p className="text-xs text-slate-500 dark:text-slate-400">{helperText}</p>
            ) : null}
          </section>
        </div>

        <div className="mt-8 border-t border-slate-200/80 pt-4 text-xs text-slate-500 dark:border-slate-700/80 dark:text-slate-400">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p>(c) {new Date().getFullYear()} zyra. built for clearer offers, stronger trust, and cleaner next steps.</p>
            <div className="flex flex-wrap items-center gap-3">
              <Link as={NextLink} href="/privacy" className="text-slate-500 hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-300">
                privacy
              </Link>
              <Link as={NextLink} href="/terms" className="text-slate-500 hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-300">
                terms
              </Link>
              <Link as={NextLink} href="/data-policy" className="text-slate-500 hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-300">
                anti-spam + data policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
