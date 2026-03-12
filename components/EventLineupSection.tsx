"use client";

import { Button, Card, CardBody, Chip, Link } from "@heroui/react";
import Image from "next/image";
import { useRef } from "react";
import type { EventLineupMember } from "@/lib/eventsData";

type EventLineupSectionProps = {
  members: EventLineupMember[];
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

export function EventLineupSection({
  members,
  sectionClassName = "mt-8",
}: EventLineupSectionProps) {
  const railRef = useRef<HTMLDivElement | null>(null);

  if (members.length === 0) {
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
                        <Image src={member.image} alt={member.name} fill sizes="(max-width: 640px) 82vw, (max-width: 1024px) 19rem, 21rem" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
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
            </div>
          </div>


        </CardBody>
      </Card>
    </section>
  );
}





