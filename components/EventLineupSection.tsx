"use client";

import { Button, Card, CardBody, Chip, Link } from "@heroui/react";
import Image from "next/image";
import { useRef } from "react";
import type { EventLineupMember, EventVibeCard } from "@/lib/eventsData";

type EventLineupSectionProps = {
  members: EventLineupMember[];
  vibeCard?: EventVibeCard;
  sectionClassName?: string;
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
}: {
  direction: "left" | "right";
  onPress: () => void;
}) {
  return (
    <Button
      isIconOnly
      radius="full"
      size="sm"
      variant="flat"
      aria-label={direction === "left" ? "see previous lineup card" : "see next lineup card"}
      className="border border-slate-300/85 bg-white/95 text-slate-950 shadow-[0_10px_24px_rgba(15,23,42,0.08)] dark:border-slate-700/70 dark:bg-slate-900/78 dark:text-slate-100"
      onPress={onPress}
    >
      <span className="text-lg leading-none">{direction === "left" ? "\u2039" : "\u203a"}</span>
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
}: EventLineupSectionProps) {
  const railRef = useRef<HTMLDivElement | null>(null);

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
    <section id="lineup-reel" className={sectionClassName}>
      <Card className="overflow-hidden border border-slate-200/80 bg-white/82 shadow-[0_20px_52px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-700/55 dark:bg-slate-950/58">
        <CardBody className="gap-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                lineup
              </p>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-slate-900 dark:text-slate-100">
                featured
              </h2>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <RailArrow direction="left" onPress={() => scrollRail("left")} />
              <RailArrow direction="right" onPress={() => scrollRail("right")} />
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-10 bg-gradient-to-r from-white to-transparent dark:from-slate-950/90 sm:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-12 bg-gradient-to-l from-white to-transparent dark:from-slate-950/90 sm:block" />

            <div
              ref={railRef}
              className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 pr-5 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {sortedMembers.map((member) => {
                const hasProfile = Boolean(member.socialUrl);
                const railItemClassName = "group min-w-[82%] snap-start sm:min-w-[19rem] lg:min-w-[21rem]";

                const cardBody = (
                  <Card className="min-h-full overflow-hidden border border-slate-200/85 bg-white/94 shadow-[0_16px_34px_rgba(15,23,42,0.08)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:border-cyan-300 group-hover:shadow-[0_18px_48px_rgba(14,165,233,0.16)] dark:border-slate-700/55 dark:bg-slate-950/70 dark:group-hover:border-cyan-500/45">
                    <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-slate-900">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(max-width: 640px) 82vw, (max-width: 1024px) 19rem, 21rem"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
                          <Chip className={`${getRoleChipClass(member.role)} backdrop-blur-md`}>
                            {getRoleLabel(member.role)}
                          </Chip>
                          {hasProfile ? (
                            <Chip className="border border-white/24 bg-white/18 text-white backdrop-blur-md">
                              open profile
                            </Chip>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <CardBody className="p-4">
                      <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-slate-900 dark:text-slate-100">
                        {member.name}
                      </h3>
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
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${railItemClassName} no-underline`}
                  >
                    {cardBody}
                  </Link>
                );
              })}

              {vibeCard ? (
                <div key={`vibe-${vibeCard.title}`} className="group min-w-[82%] snap-start sm:min-w-[19rem] lg:min-w-[21rem]">
                  <Card className="min-h-full overflow-hidden border border-cyan-300/70 bg-white/94 shadow-[0_16px_34px_rgba(15,23,42,0.08)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:border-cyan-400 group-hover:shadow-[0_18px_48px_rgba(14,165,233,0.16)] dark:border-cyan-500/35 dark:bg-slate-950/72 dark:group-hover:border-cyan-400/55">
                    <div className="relative aspect-[4/5] overflow-hidden bg-slate-950">
                      <Image
                        src={vibeCard.poster}
                        alt={vibeCard.title}
                        fill
                        sizes="(max-width: 640px) 82vw, (max-width: 1024px) 19rem, 21rem"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-slate-950/94 via-slate-950/68 to-transparent p-3">
                        <Chip className="border border-cyan-200/80 bg-cyan-300/92 text-slate-950 backdrop-blur-md">
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
                    <CardBody className="space-y-2 p-4">
                      <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-slate-900 dark:text-slate-100">
                        {vibeCard.title}
                      </h3>
                      <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {vibeCard.summary}
                      </p>
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
