"use client";

import { Button, Card, CardBody, Chip, Link } from "@heroui/react";
import Image from "next/image";
import { useRef } from "react";
import type { EventLineupMember, EventVibeCard } from "@/lib/eventsData";

type EventLineupSectionProps = {
  members: EventLineupMember[];
  vibeCard?: EventVibeCard;
  sectionClassName?: string;
  cardClassName?: string;
  theme?: "default" | "venus";
};

const getLineupInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("") || "ZY";

const getLineupTone = (role: string) => {
  const key = role.toLowerCase();

  if (key === "host") {
    return "from-amber-200 via-rose-200 to-fuchsia-300 text-slate-900";
  }

  if (key === "mc") {
    return "from-cyan-200 via-sky-200 to-indigo-300 text-slate-900";
  }

  return "from-violet-200 via-fuchsia-200 to-pink-300 text-slate-900";
};

const getRoleLabel = (role: string) => {
  const key = role.toLowerCase();

  if (key === "host") {
    return "Host";
  }

  if (key === "mc") {
    return "MC";
  }

  return "DJ";
};

const getRoleChipClass = (role: string) => {
  const key = role.toLowerCase();

  if (key === "host") {
    return "border border-amber-200/80 bg-amber-300/92 text-slate-950";
  }

  if (key === "mc") {
    return "border border-sky-200/80 bg-sky-300/92 text-slate-950";
  }

  return "border border-fuchsia-200/70 bg-fuchsia-500/88 text-white";
};

const sortLineupMembers = (members: EventLineupMember[]) =>
  members
    .map((member, index) => ({ member, index }))
    .sort((left, right) => {
      const imageDiff = Number(Boolean(right.member.image)) - Number(Boolean(left.member.image));
      if (imageDiff !== 0) {
        return imageDiff;
      }

      return left.index - right.index;
    })
    .map(({ member }) => member);

function RailArrow({
  direction,
  onPress,
  theme = "default",
}: {
  direction: "left" | "right";
  onPress: () => void;
  theme?: "default" | "venus";
}) {
  return (
    <Button
      isIconOnly
      radius="full"
      size="sm"
      variant="flat"
      aria-label={direction === "left" ? "see previous lineup card" : "see next lineup card"}
      className={theme === "venus"
        ? "border border-[#e7c782]/45 bg-[#e7c782]/12 text-[#f5db9b]"
        : "border border-slate-300/85 bg-white/95 text-slate-950 shadow-[0_10px_24px_rgba(15,23,42,0.08)] dark:border-slate-700/70 dark:bg-slate-900/78 dark:text-slate-100"}
      onPress={onPress}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        {direction === "left" ? (
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        )}
      </svg>
    </Button>
  );
}

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-none">
      <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" className="stroke-current" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" className="stroke-current" strokeWidth="2" />
      <circle cx="17.2" cy="6.8" r="1.2" className="fill-current stroke-none" />
    </svg>
  );
}

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.17 1.6 5.99L0 24l6.28-1.73a11.8 11.8 0 0 0 5.74 1.47h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.17-1.24-6.14-3.4-8.36Zm-8.49 18.2h-.01a9.85 9.85 0 0 1-5.03-1.38l-.36-.21-3.73 1.03 1-3.84-.23-.39a9.85 9.85 0 0 1-1.53-5.26c0-5.45 4.43-9.89 9.9-9.89 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.89 6.99c0 5.45-4.44 9.9-9.88 9.9Zm5.43-7.43c-.3-.15-1.8-.89-2.08-.99-.28-.1-.49-.15-.7.15-.2.3-.8.99-.98 1.2-.18.2-.36.23-.67.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.68-2.1-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.7-1.7-.96-2.33-.26-.63-.52-.54-.7-.55h-.6c-.2 0-.53.08-.8.38-.28.3-1.06 1.03-1.06 2.52 0 1.49 1.08 2.93 1.24 3.13.15.2 2.13 3.25 5.15 4.56.72.3 1.28.48 1.72.62.72.23 1.37.2 1.88.12.57-.08 1.8-.74 2.05-1.46.25-.72.25-1.34.17-1.47-.08-.13-.28-.2-.58-.35Z" />
    </svg>
  );
}

function HostSocialGlyph({ platform }: { platform: string }) {
  if (platform === "TikTok") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    );
  }

  if (platform === "Snapchat") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z" />
      </svg>
    );
  }

  return <span className="text-xs font-bold">{platform}</span>;
}

function SocialActionButton({
  platform,
  href,
  label,
}: {
  platform: "instagram" | "whatsapp";
  href: string;
  label: string;
}) {
  const platformClassName =
    platform === "instagram"
      ? "border-white/24 bg-white/16 text-white hover:border-fuchsia-300/80 hover:bg-fuchsia-500/28"
      : "border-white/24 bg-white/16 text-white hover:border-emerald-300/80 hover:bg-emerald-500/28";

  return (
    <Button
      isIconOnly
      as={Link}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      radius="full"
      aria-label={label}
      className={`h-9 w-9 min-w-9 border backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 ${platformClassName}`}
    >
      {platform === "instagram" ? <InstagramGlyph /> : <WhatsAppGlyph />}
    </Button>
  );
}

export function EventLineupSection({
  members,
  vibeCard,
  sectionClassName = "mt-8",
  cardClassName = "",
  theme = "default",
}: EventLineupSectionProps) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const isVenus = theme === "venus";

  if (members.length === 0 && !vibeCard) {
    return null;
  }

  const sortedMembers = sortLineupMembers(members);

  const scrollRail = (direction: "left" | "right") => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    rail.scrollBy({
      left: direction === "left" ? -rail.clientWidth * 0.82 : rail.clientWidth * 0.82,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="lineup-reel"
      className={`${sectionClassName} [contain-intrinsic-size:auto_680px] [content-visibility:auto]`}
    >
      <Card className={`overflow-hidden border border-slate-200/80 bg-white/82 shadow-[0_20px_52px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-700/55 dark:bg-slate-950/58 ${cardClassName}`}>
        <CardBody className="gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className={`text-[11px] uppercase tracking-[0.18em] ${isVenus ? "text-[#e7c782]" : "text-slate-500 dark:text-slate-400"}`}>
                lineup
              </p>
              <h2 className={isVenus
                ? "font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-[#f8f0df]"
                : "font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-slate-900 dark:text-slate-100"}>
                featured
              </h2>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <RailArrow direction="left" onPress={() => scrollRail("left")} theme={theme} />
              <RailArrow direction="right" onPress={() => scrollRail("right")} theme={theme} />
            </div>
          </div>

          <div className="relative">
            <div className={`pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-10 bg-gradient-to-r to-transparent sm:block ${isVenus ? "from-[#2b0f11]" : "from-white dark:from-slate-950/90"}`} />
            <div className={`pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-12 bg-gradient-to-l to-transparent sm:block ${isVenus ? "from-[#2b0f11]" : "from-white dark:from-slate-950/90"}`} />

            <div
              ref={railRef}
              className="flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto pb-2 pr-5 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {sortedMembers.map((member) => {
                const hasProfile = Boolean(member.socialUrl) && !member.socialLinks?.length;
                const opensInSameTab = member.socialUrl?.includes("snapchat.com") ?? false;
                const railItemClassName =
                  "group flex w-[82%] min-w-[82%] snap-start sm:w-[19rem] sm:min-w-[19rem] lg:w-[21rem] lg:min-w-[21rem]";

                const cardBody = (
                  <Card className={`h-full w-full overflow-hidden transition-shadow duration-300 ${isVenus
                    ? "border border-[#e7c782]/45 bg-[#1d0d0e] shadow-[0_16px_34px_rgba(0,0,0,0.24)] group-hover:shadow-[0_18px_48px_rgba(126,35,31,0.24)]"
                    : "border border-slate-200/85 bg-white/94 shadow-[0_16px_34px_rgba(15,23,42,0.08)] group-hover:shadow-[0_18px_48px_rgba(14,165,233,0.16)] dark:border-slate-700/55 dark:bg-slate-950/70"}`}>
                    <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-slate-900">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(max-width: 640px) 82vw, (max-width: 1024px) 19rem, 21rem"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div
                          className={`flex h-full w-full items-end bg-gradient-to-br ${getLineupTone(member.role)} p-5`}
                        >
                          <p className="font-[family-name:var(--font-space-grotesk)] text-5xl font-bold tracking-tight">
                            {getLineupInitials(member.name)}
                          </p>
                        </div>
                      )}

                      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/94 via-slate-950/68 to-transparent p-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <Chip className={`${isVenus ? "border border-[#f4db9e] bg-[#e7c782] text-[#240c0b]" : getRoleChipClass(member.role)} backdrop-blur-md`}>
                            {getRoleLabel(member.role)}
                          </Chip>
                          {hasProfile || member.socialLinks?.length ? (
                            <Chip className="border border-white/24 bg-white/18 text-white backdrop-blur-md">
                              {hasProfile ? "open profile" : "follow host"}
                            </Chip>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <CardBody className="min-h-[8rem] justify-start p-4">
                      <h3 className={`font-[family-name:var(--font-space-grotesk)] text-lg font-bold ${isVenus ? "text-[#f8f0df]" : "text-slate-900 dark:text-slate-100"}`}>
                        {member.name}
                      </h3>
                      {member.socialLinks?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {member.socialLinks.map((social) => (
                            <Link
                              key={social.url}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open ${member.name} on ${social.label} (opens in a new tab)`}
                              title={`${member.name} on ${social.label}`}
                              className={social.label === "Snapchat"
                                ? "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#fffc00] bg-[#fffc00] text-black transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fffc00]"
                                : "inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e7c782]/55 bg-[#100607] text-white shadow-[2px_2px_0_#ff0050,-2px_-2px_0_#00f2ea] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00f2ea]"}
                            >
                              <HostSocialGlyph platform={social.label} />
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </CardBody>
                  </Card>
                );

                if (!hasProfile) {
                  return (
                    <div key={`${member.role}-${member.name}`} className={railItemClassName}>
                      {cardBody}
                    </div>
                  );
                }

                return (
                  <Link
                    key={`${member.role}-${member.name}`}
                    href={member.socialUrl}
                    target={opensInSameTab ? undefined : "_blank"}
                    rel={opensInSameTab ? undefined : "noopener noreferrer"}
                    className={`${railItemClassName} no-underline`}
                  >
                    {cardBody}
                  </Link>
                );
              })}

              {vibeCard ? (
                <div key={`vibe-${vibeCard.title}`} className="group flex w-[82%] min-w-[82%] snap-start sm:w-[19rem] sm:min-w-[19rem] lg:w-[21rem] lg:min-w-[21rem]">
                  <Card className={`h-full w-full overflow-hidden transition-shadow duration-300 ${isVenus
                    ? "border border-[#e7c782]/45 bg-[#1d0d0e] shadow-[0_16px_34px_rgba(0,0,0,0.24)] group-hover:shadow-[0_18px_48px_rgba(126,35,31,0.24)]"
                    : "border border-cyan-300/70 bg-white/94 shadow-[0_16px_34px_rgba(15,23,42,0.08)] group-hover:shadow-[0_18px_48px_rgba(14,165,233,0.16)] dark:border-cyan-500/35 dark:bg-slate-950/72"}`}>
                    <div className="relative aspect-[4/5] overflow-hidden bg-slate-950">
                      <Image
                        src={vibeCard.poster}
                        alt={vibeCard.title}
                        fill
                        sizes="(max-width: 640px) 82vw, (max-width: 1024px) 19rem, 21rem"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-slate-950/94 via-slate-950/68 to-transparent p-3">
                        <Chip className={isVenus ? "border border-[#f4db9e] bg-[#e7c782] text-[#240c0b]" : "border border-cyan-200/80 bg-cyan-300/92 text-slate-950 backdrop-blur-md"}>
                          {vibeCard.badgeLabel}
                        </Chip>
                        <div className="flex items-center gap-2">
                          {vibeCard.actions.map((action) => (
                            <SocialActionButton
                              key={`${vibeCard.title}-${action.platform}`}
                              platform={action.platform}
                              href={action.url}
                              label={action.label}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <CardBody className="min-h-[8rem] space-y-2 p-4">
                      <h3 className={`font-[family-name:var(--font-space-grotesk)] text-lg font-bold ${isVenus ? "text-[#f8f0df]" : "text-slate-900 dark:text-slate-100"}`}>
                        {vibeCard.title}
                      </h3>
                      {vibeCard.summary ? (
                        <p className={`text-sm leading-6 ${isVenus ? "text-[#c7b6a8]" : "text-slate-600 dark:text-slate-300"}`}>
                          {vibeCard.summary}
                        </p>
                      ) : null}
                    </CardBody>
                  </Card>
                </div>
              ) : null}
            </div>
          </div>
        </CardBody>
      </Card>
    </section>
  );
}
