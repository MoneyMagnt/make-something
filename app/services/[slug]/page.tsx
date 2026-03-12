import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ZyraSiteNav } from "@/components/ZyraSiteNav";
import { ZyraBrandMark } from "@/components/ZyraBrandMark";
import { ZyraSiteFooter } from "@/components/ZyraSiteFooter";
import {
  LOCATION_SERVICE_PAGES,
  getLocationServicePageBySlug,
} from "@/lib/locationServicePages";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type ServiceLocationPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return LOCATION_SERVICE_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: ServiceLocationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLocationServicePageBySlug(slug);

  if (!page) {
    return {
      title: `service page not found | ${SITE_NAME}`,
      description: "the service page you requested does not exist.",
    };
  }

  const title = `${page.pageTitle} | ${SITE_NAME}`;
  const description = page.metaDescription;
  const url = `${SITE_URL}/services/${page.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: SITE_NAME,
      images: [{ url: `${SITE_URL}/opengraph-image` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/opengraph-image`],
    },
  };
}

export default async function ServiceLocationPage({
  params,
}: ServiceLocationPageProps) {
  const { slug } = await params;
  const page = getLocationServicePageBySlug(slug);

  if (!page) {
    notFound();
  }

  const pageUrl = `${SITE_URL}/services/${page.slug}`;
  const relatedPages = LOCATION_SERVICE_PAGES.filter(
    (item) => item.slug !== page.slug && item.serviceType === page.serviceType
  );

  const pageSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: page.pageTitle,
      serviceType: page.serviceType,
      areaServed: page.areaServed,
      provider: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      url: pageUrl,
      description: page.metaDescription,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "services",
          item: `${SITE_URL}/services`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: page.pageTitle,
          item: pageUrl,
        },
      ],
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-clip bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchemas) }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1100px_650px_at_12%_-12%,rgba(14,165,233,0.22),transparent),radial-gradient(980px_560px_at_92%_8%,rgba(59,130,246,0.16),transparent)] dark:bg-[radial-gradient(1240px_740px_at_8%_-14%,rgba(6,182,212,0.24),transparent_58%),radial-gradient(1120px_680px_at_92%_10%,rgba(59,130,246,0.27),transparent_60%),radial-gradient(940px_560px_at_50%_115%,rgba(8,145,178,0.22),transparent_64%),linear-gradient(180deg,rgba(2,6,23,0.96)_0%,rgba(3,15,34,0.9)_45%,rgba(8,20,45,0.95)_100%)]" />

      <ZyraSiteNav active="services" brand={<ZyraBrandMark />} />

      <main className="relative mx-auto max-w-5xl px-5 pb-24 pt-10 sm:px-6">
        <section className="rounded-3xl border border-slate-200/70 bg-white/88 p-5 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-700 dark:text-cyan-300">
            local growth service
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-bricolage)] text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl dark:text-slate-100">
            {page.headline}
          </h1>
          <p className="mt-3 max-w-3xl text-base text-slate-700 sm:text-lg dark:text-slate-300">
            {page.subheading}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-cyan-200 bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.13em] text-cyan-900 dark:border-cyan-700/70 dark:bg-cyan-900/35 dark:text-cyan-200">
              {page.serviceType}
            </span>
            <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.13em] text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              {page.areaServed}
            </span>
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-2">
          <article className="rounded-3xl border border-slate-200/70 bg-white/88 p-5 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75 sm:p-6">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-slate-900 dark:text-slate-100">
              what this helps you achieve
            </h2>
            <ul className="mt-4 grid gap-3">
              {page.benefits.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 text-sm text-slate-700 dark:border-slate-700/70 dark:bg-slate-950/70 dark:text-slate-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-slate-200/70 bg-white/88 p-5 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75 sm:p-6">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-slate-900 dark:text-slate-100">
              core deliverables
            </h2>
            <ul className="mt-4 grid gap-3">
              {page.deliverables.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 text-sm text-slate-700 dark:border-slate-700/70 dark:bg-slate-950/70 dark:text-slate-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200/70 bg-white/88 p-5 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75 sm:p-6">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-slate-900 dark:text-slate-100">
            why zyra for this market
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <article className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 text-sm text-slate-700 dark:border-slate-700/70 dark:bg-slate-950/70 dark:text-slate-300">
              local market context shapes every campaign decision.
            </article>
            <article className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 text-sm text-slate-700 dark:border-slate-700/70 dark:bg-slate-950/70 dark:text-slate-300">
              execution stays fast because strategy and delivery run in one team.
            </article>
            <article className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 text-sm text-slate-700 dark:border-slate-700/70 dark:bg-slate-950/70 dark:text-slate-300">
              weekly reporting keeps decisions clear and growth compounding.
            </article>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200/70 bg-white/88 p-5 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75 sm:p-6">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-slate-900 dark:text-slate-100">
            frequently asked questions
          </h2>
          <div className="mt-4 grid gap-3">
            {page.faqs.map((item) => (
              <article
                key={item.question}
                className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 dark:border-slate-700/70 dark:bg-slate-950/70"
              >
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {item.question}
                </h3>
                <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
                  {item.answer}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-cyan-200/80 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 p-5 text-white shadow-[0_16px_42px_rgba(14,165,233,0.32)] dark:border-cyan-200/25 dark:bg-[linear-gradient(118deg,rgba(8,47,73,0.98)_0%,rgba(30,64,175,0.96)_56%,rgba(12,74,110,0.98)_100%)] dark:shadow-[0_22px_62px_rgba(8,145,178,0.34)] sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">
            next step
          </p>
          <h2 className="mt-1 font-[family-name:var(--font-space-grotesk)] text-2xl font-bold">
            book your growth audit for this market.
          </h2>
          <p className="mt-2 text-sm text-cyan-50/95">
            use the whatsapp button and we will map your first 90-day execution sprint.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/services"
              className="rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-cyan-800 transition hover:bg-white"
            >
              back to services
            </Link>
            <Link
              href="/"
              className="rounded-full border border-cyan-100/60 bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500/30"
            >
              visit homepage
            </Link>
          </div>
        </section>

        {relatedPages.length > 0 ? (
          <section className="mt-6 rounded-3xl border border-slate-200/70 bg-white/88 p-5 backdrop-blur dark:border-slate-700/80 dark:bg-slate-900/75 sm:p-6">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-slate-900 dark:text-slate-100">
              related pages
            </h2>
            <div className="mt-3 grid gap-2">
              {relatedPages.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="rounded-2xl border border-slate-200/70 bg-white/80 px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-700/70 dark:bg-slate-950/70 dark:text-slate-200 dark:hover:border-cyan-500/50 dark:hover:text-cyan-300"
                >
                  {item.pageTitle}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <ZyraSiteFooter />
    </div>
  );
}

