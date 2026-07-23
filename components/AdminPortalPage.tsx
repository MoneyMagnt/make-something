"use client";

import {
  Button,
  Card,
  CardBody,
  Chip,
  Input,
  Textarea,
} from "@heroui/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ZyraSiteNav } from "@/components/ZyraSiteNav";
import { ZyraBrandMark } from "@/components/ZyraBrandMark";
import { useThemeMode } from "@/components/ThemeModeProvider";
import { ADMIN_ACCESS_KEY, ADMIN_PASSCODE } from "@/lib/adminAccess";
import {
  DEFAULT_LOCAL_CONTENT,
  readLocalContent,
  resetLocalContent,
  type LocalContentState,
  writeLocalContent,
} from "@/lib/localContentEditor";

const sections = [
  { key: "home", label: "home" },
  { key: "services", label: "services" },
  { key: "events", label: "events" },
] as const;

type SectionKey = (typeof sections)[number]["key"];

export default function AdminPortalPage() {
  const { theme } = useThemeMode();
  const [passcode, setPasscode] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionKey>("events");
  const [draft, setDraft] = useState<LocalContentState>(DEFAULT_LOCAL_CONTENT);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const authed = window.localStorage.getItem(ADMIN_ACCESS_KEY) === "1";
    setIsAuthed(authed);
    setDraft(readLocalContent());
  }, []);

  const themeStyle = useMemo(
    () => ({
      background:
        theme === "dark"
          ? "radial-gradient(1080px 680px at 10% -12%, rgba(34,211,238,0.18), transparent 58%), radial-gradient(980px 620px at 92% 2%, rgba(168,85,247,0.18), transparent 58%), linear-gradient(180deg, #020617 0%, #0b1124 46%, #111827 100%)"
          : "radial-gradient(1080px 620px at 10% -12%, rgba(125,211,252,0.22), transparent 58%), radial-gradient(980px 560px at 94% 4%, rgba(59,130,246,0.12), transparent 58%), linear-gradient(180deg, #f8fbff 0%, #eef4ff 58%, #e8efff 100%)",
    }),
    [theme]
  );

  const saveDraft = () => {
    writeLocalContent(draft);
  };

  const resetDraft = () => {
    resetLocalContent();
    setDraft(DEFAULT_LOCAL_CONTENT);
  };

  const tryAuth = () => {
    const allowed = passcode === ADMIN_PASSCODE;
    setIsAuthed(allowed);
    if (allowed && typeof window !== "undefined") {
      window.localStorage.setItem(ADMIN_ACCESS_KEY, "1");
      setDraft(readLocalContent());
    }
  };

  const logOut = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ADMIN_ACCESS_KEY);
    }
    setIsAuthed(false);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden text-slate-900 dark:text-slate-100" style={themeStyle}>
      <ZyraSiteNav active="admin" brand={<ZyraBrandMark />} />

      {!isAuthed ? (
        <main className="relative z-10 mx-auto flex min-h-[calc(100vh-4.8rem)] max-w-md flex-col items-center justify-center gap-6 px-6 py-10">
          <Card className="w-full border border-slate-200/80 bg-white/88 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/82">
            <CardBody className="gap-4 p-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">local editor</p>
                <h1 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold text-slate-950 dark:text-slate-100">
                  content editing page
                </h1>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  this edits local browser content for home, services, and events so you can preview changes without touching code.
                </p>
              </div>
              <Input
                label="passcode"
                type="password"
                value={passcode}
                onValueChange={setPasscode}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    tryAuth();
                  }
                }}
              />
              <Button className="w-fit bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950" onPress={tryAuth}>
                open editor
              </Button>
            </CardBody>
          </Card>
        </main>
      ) : (
        <main className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-8 sm:px-6">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Button as={Link} href="/" target="_blank" rel="noopener noreferrer" className="bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950">
              preview home
            </Button>
            <Button as={Link} href="/services" target="_blank" rel="noopener noreferrer" variant="flat" className="border border-slate-200/80 bg-white/80 text-slate-800 dark:border-slate-700/80 dark:bg-slate-900/75 dark:text-slate-100">
              preview services
            </Button>
            <Button as={Link} href="/events" target="_blank" rel="noopener noreferrer" variant="flat" className="border border-slate-200/80 bg-white/80 text-slate-800 dark:border-slate-700/80 dark:bg-slate-900/75 dark:text-slate-100">
              preview events
            </Button>
            <Button onPress={saveDraft} className="bg-cyan-600 text-white">
              save local changes
            </Button>
            <Button onPress={resetDraft} variant="flat" className="border border-slate-200/80 bg-white/80 text-slate-800 dark:border-slate-700/80 dark:bg-slate-900/75 dark:text-slate-100">
              reset all
            </Button>
            <Button onPress={logOut} variant="flat" className="border border-slate-200/80 bg-white/80 text-slate-800 dark:border-slate-700/80 dark:bg-slate-900/75 dark:text-slate-100">
              log out
            </Button>
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-2">
            {sections.map((section) => (
              <Button
                key={section.key}
                onPress={() => setActiveSection(section.key)}
                className={activeSection === section.key ? "bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950" : "border border-slate-200/80 bg-white/80 text-slate-800 dark:border-slate-700/80 dark:bg-slate-900/75 dark:text-slate-100"}
                variant={activeSection === section.key ? "solid" : "flat"}
              >
                {section.label}
              </Button>
            ))}
          </div>

          {activeSection === "home" ? (
            <Card className="border border-slate-200/80 bg-white/88 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/82">
              <CardBody className="grid gap-4 p-6 md:grid-cols-2">
                <Input label="chip label" value={draft.home.heroChipLabel} onValueChange={(value) => setDraft((prev) => ({ ...prev, home: { ...prev.home, heroChipLabel: value } }))} />
                <Input label="chip sub label" value={draft.home.heroChipSubLabel} onValueChange={(value) => setDraft((prev) => ({ ...prev, home: { ...prev.home, heroChipSubLabel: value } }))} />
                <Input label="eyebrow" value={draft.home.heroEyebrow} onValueChange={(value) => setDraft((prev) => ({ ...prev, home: { ...prev.home, heroEyebrow: value } }))} />
                <Input label="primary button" value={draft.home.primaryCtaLabel} onValueChange={(value) => setDraft((prev) => ({ ...prev, home: { ...prev.home, primaryCtaLabel: value } }))} />
                <Input label="secondary button" value={draft.home.secondaryCtaLabel} onValueChange={(value) => setDraft((prev) => ({ ...prev, home: { ...prev.home, secondaryCtaLabel: value } }))} />
                <div />
                <Textarea label="headline" value={draft.home.heroTitle} onValueChange={(value) => setDraft((prev) => ({ ...prev, home: { ...prev.home, heroTitle: value } }))} className="md:col-span-2" minRows={3} />
                <Textarea label="support text" value={draft.home.heroBody} onValueChange={(value) => setDraft((prev) => ({ ...prev, home: { ...prev.home, heroBody: value } }))} className="md:col-span-2" minRows={4} />
              </CardBody>
            </Card>
          ) : null}

          {activeSection === "services" ? (
            <Card className="border border-slate-200/80 bg-white/88 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/82">
              <CardBody className="grid gap-4 p-6 md:grid-cols-2">
                <Input label="chip" value={draft.services.heroChip} onValueChange={(value) => setDraft((prev) => ({ ...prev, services: { ...prev.services, heroChip: value } }))} className="md:col-span-2" />
                <Input label="eyebrow" value={draft.services.heroEyebrow} onValueChange={(value) => setDraft((prev) => ({ ...prev, services: { ...prev.services, heroEyebrow: value } }))} />
                <Input label="primary button" value={draft.services.primaryCtaLabel} onValueChange={(value) => setDraft((prev) => ({ ...prev, services: { ...prev.services, primaryCtaLabel: value } }))} />
                <Input label="secondary button" value={draft.services.secondaryCtaLabel} onValueChange={(value) => setDraft((prev) => ({ ...prev, services: { ...prev.services, secondaryCtaLabel: value } }))} />
                <div />
                <Textarea label="headline" value={draft.services.heroTitle} onValueChange={(value) => setDraft((prev) => ({ ...prev, services: { ...prev.services, heroTitle: value } }))} className="md:col-span-2" minRows={3} />
                <Textarea label="support text" value={draft.services.heroBody} onValueChange={(value) => setDraft((prev) => ({ ...prev, services: { ...prev.services, heroBody: value } }))} className="md:col-span-2" minRows={4} />
              </CardBody>
            </Card>
          ) : null}

          {activeSection === "events" ? (
            <Card className="border border-slate-200/80 bg-white/88 backdrop-blur-xl dark:border-slate-700/70 dark:bg-slate-900/82">
              <CardBody className="grid gap-4 p-6 md:grid-cols-2">
                <Input label="eyebrow" value={draft.events.heroEyebrow} onValueChange={(value) => setDraft((prev) => ({ ...prev, events: { ...prev.events, heroEyebrow: value } }))} />
                <Input label="main title" value={draft.events.heroTitle} onValueChange={(value) => setDraft((prev) => ({ ...prev, events: { ...prev.events, heroTitle: value } }))} />
                <Input label="highlight line" value={draft.events.heroHighlight} onValueChange={(value) => setDraft((prev) => ({ ...prev, events: { ...prev.events, heroHighlight: value } }))} className="md:col-span-2" />
                <Input label="status pill" value={draft.events.statusPill} onValueChange={(value) => setDraft((prev) => ({ ...prev, events: { ...prev.events, statusPill: value } }))} />
                <Input label="ticket button" value={draft.events.primaryCtaLabel} onValueChange={(value) => setDraft((prev) => ({ ...prev, events: { ...prev.events, primaryCtaLabel: value } }))} />
                <Input label="community button" value={draft.events.secondaryCtaLabel} onValueChange={(value) => setDraft((prev) => ({ ...prev, events: { ...prev.events, secondaryCtaLabel: value } }))} />
              </CardBody>
            </Card>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Chip className="bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900">local only</Chip>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              this editor saves to your browser on this machine. it is not a full cms yet.
            </p>
          </div>
        </main>
      )}
    </div>
  );
}