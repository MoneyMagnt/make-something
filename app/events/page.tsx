"use client";

import { Button, Card, CardBody, Chip, Image, Link } from "@heroui/react";
import MuxPlayer from "@mux/mux-player-react";
import { upload } from "@vercel/blob/client";
import { type ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useThemeMode } from "@/components/ThemeModeProvider";
import { ZyraSiteNav } from "@/components/ZyraSiteNav";
import { ZyraBrandMark } from "@/components/ZyraBrandMark";
import { DEFAULT_EVENT_TICKETS, EVENTS } from "@/lib/eventsData";
import type { EventMeta, EventName } from "@/lib/eventsData";
import {
  EVENT_CONTROL_DEFAULTS,
  EVENT_TRACK_SESSION_KEY,
  type EventControl,
  type EventFeatureKey,
  type EventPublicSnapshot,
} from "@/lib/eventOps";
import { SITE_URL } from "@/lib/site";

const FAN_CAM_REFRESH_MS = 60000;
const MUX_POLL_MS = 3000;
const MUX_MAX_POLL_ATTEMPTS = 80;
const ACTIVE_EVENT_STORAGE_KEY = "zyra_events_active_event_v1";
const isDocumentVisible = () =>
  typeof document === "undefined" || document.visibilityState === "visible";

type FanCamMomentStatus = "ready" | "processing" | "failed";

type FanCamMoment = {
  id: string;
  event: EventName;
  kind: "image" | "video";
  name: string;
  createdAt: number;
  status: FanCamMomentStatus;
  src?: string;
  playbackId?: string;
  muxUploadId?: string;
};

type FanCamListResponse = {
  items?: unknown;
};

type FanCamCreateResponse = {
  item?: unknown;
  editToken?: string;
};

type FanCamS3UploadTargetResponse = {
  uploadUrl?: string;
  publicUrl?: string;
};

type MuxUploadStatusResponse = {
  uploadStatus?: string;
  assetStatus?: string | null;
  playbackId?: string | null;
  errorMessage?: string | null;
};

function EventBrandName({ event }: { event: EventMeta }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Image removeWrapper alt={`${event.name} logo`} src={event.logo} className="h-8 w-auto" />
      <span className="font-[family-name:var(--font-space-grotesk)] text-base font-bold sm:text-lg">
        {event.name}
      </span>
    </span>
  );
}

const getOrCreateTrackingSessionId = () => {
  if (typeof window === "undefined") {
    return "";
  }

  try {
    const existing = localStorage.getItem(EVENT_TRACK_SESSION_KEY);
    if (existing && existing.trim().length > 0) {
      return existing;
    }

    const nextId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    localStorage.setItem(EVENT_TRACK_SESSION_KEY, nextId);
    return nextId;
  } catch {
    return "";
  }
};

const normalizeFanCamMoment = (entry: unknown): FanCamMoment | null => {
  if (!entry || typeof entry !== "object") {
    return null;
  }

  const item = entry as {
    id?: unknown;
    event?: unknown;
    kind?: unknown;
    name?: unknown;
    createdAt?: unknown;
    mediaStatus?: unknown;
    src?: unknown;
    playbackId?: unknown;
    muxUploadId?: unknown;
  };

  const id = typeof item.id === "string" ? item.id : "";
  const event = item.event === "VENUS" || item.event === "We Outside" ? item.event : null;
  const kind = item.kind === "image" || item.kind === "video" ? item.kind : null;
  const name = typeof item.name === "string" ? item.name : "";
  const createdAt = typeof item.createdAt === "number" ? item.createdAt : 0;
  const src = typeof item.src === "string" ? item.src : undefined;
  const playbackId = typeof item.playbackId === "string" ? item.playbackId : undefined;
  const muxUploadId = typeof item.muxUploadId === "string" ? item.muxUploadId : undefined;
  const status: FanCamMomentStatus =
    item.mediaStatus === "processing" || item.mediaStatus === "failed" ? item.mediaStatus : "ready";

  if (!id || !event || !kind || !name || !createdAt) {
    return null;
  }

  if (kind === "image" && !src) {
    return null;
  }

  if (kind === "video" && !src && !playbackId && status === "ready") {
    return null;
  }

  return {
    id,
    event,
    kind,
    name,
    createdAt,
    status,
    src,
    playbackId,
    muxUploadId,
  };
};

const toSafeEventControl = (entry: unknown, fallback: EventControl): EventControl => {
  if (!entry || typeof entry !== "object") {
    return fallback;
  }

  const item = entry as Partial<EventControl>;
  const passLimit =
    typeof item.passLimit === "number" && Number.isFinite(item.passLimit)
      ? Math.max(0, Math.floor(item.passLimit))
      : fallback.passLimit;
  const liveTicketCount =
    typeof item.liveTicketCount === "number" && Number.isFinite(item.liveTicketCount)
      ? Math.max(0, Math.floor(item.liveTicketCount))
      : fallback.liveTicketCount;

  return {
    passesEnabled:
      typeof item.passesEnabled === "boolean" ? item.passesEnabled : fallback.passesEnabled,
    passLimit,
    liveTicketCount,
  };
};

const toSafePassUsage = (entry: unknown): Record<EventName, number> => {
  const fallback = { ...EMPTY_PASS_USAGE };
  if (!entry || typeof entry !== "object") {
    return fallback;
  }

  const item = entry as Record<string, unknown>;
  return {
    VENUS:
      typeof item.VENUS === "number" && Number.isFinite(item.VENUS)
        ? Math.max(0, Math.floor(item.VENUS))
        : 0,
    "We Outside":
      typeof item["We Outside"] === "number" && Number.isFinite(item["We Outside"])
        ? Math.max(0, Math.floor(item["We Outside"]))
        : 0,
  };
};

const makeMomentId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const toPathSegment = (value: string) =>
  value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9.\-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const EMPTY_PASS_USAGE: Record<EventName, number> = {
  VENUS: 0,
  "We Outside": 0,
};

const uploadFileToFanCamStorage = async (input: {
  file: File;
  event: EventName;
  kind: "image" | "video";
  fallbackPath: string;
}) => {
  try {
    const targetResponse = await fetch("/api/fancam/s3-upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        kind: input.kind,
        event: input.event,
        fileName: input.file.name,
        contentType: input.file.type || "application/octet-stream",
        size: input.file.size,
      }),
    });

    if (targetResponse.ok) {
      const target = (await targetResponse.json()) as FanCamS3UploadTargetResponse;
      if (target.uploadUrl && target.publicUrl) {
        const uploadResponse = await fetch(target.uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": input.file.type || "application/octet-stream",
          },
          body: input.file,
        });

        if (uploadResponse.ok) {
          return target.publicUrl;
        }
      }
    }
  } catch {
    // Continue to legacy fallback below.
  }

  const uploaded = await upload(input.fallbackPath, input.file, {
    access: "public",
    handleUploadUrl: "/api/fancam/blob-upload",
    contentType: input.file.type || "application/octet-stream",
    clientPayload: JSON.stringify({
      kind: input.kind,
      event: input.event,
      fileName: input.file.name,
    }),
    multipart: input.file.size > 10 * 1024 * 1024,
  });

  return uploaded.url;
};

export default function EventsPage() {
  const { theme } = useThemeMode();
  const [activeEvent, setActiveEvent] = useState<EventName>("VENUS");
  const [hasLoadedPersistedEvent, setHasLoadedPersistedEvent] = useState(false);
  const [eventControls, setEventControls] =
    useState<Record<EventName, EventControl>>(EVENT_CONTROL_DEFAULTS);
  const [passesUsedByEvent, setPassesUsedByEvent] =
    useState<Record<EventName, number>>(EMPTY_PASS_USAGE);
  const [fanCamMoments, setFanCamMoments] = useState<FanCamMoment[]>([]);
  const [activeMomentIndex, setActiveMomentIndex] = useState(0);
  const [fanCamError, setFanCamError] = useState("");
  const [isUploadingFanCam, setIsUploadingFanCam] = useState(false);
  const [fanCamUploadStatus, setFanCamUploadStatus] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const hasTrackedInitialPageView = useRef(false);
  const fanCamEditTokens = useRef<Record<string, string>>({});

  useEffect(() => {
    if (typeof window === "undefined") {
      setHasLoadedPersistedEvent(true);
      return;
    }

    try {
      const savedEvent = localStorage.getItem(ACTIVE_EVENT_STORAGE_KEY);
      if (savedEvent === "VENUS" || savedEvent === "We Outside") {
        setActiveEvent(savedEvent);
      }
    } finally {
      setHasLoadedPersistedEvent(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedPersistedEvent || typeof window === "undefined") {
      return;
    }

    try {
      localStorage.setItem(ACTIVE_EVENT_STORAGE_KEY, activeEvent);
    } catch {
      // Ignore storage write failures and keep the session working.
    }
  }, [activeEvent, hasLoadedPersistedEvent]);

  useEffect(() => {
    setActiveMomentIndex(0);
  }, [activeEvent]);

  const activeMeta = useMemo(
    () => EVENTS.find((item) => item.name === activeEvent) ?? EVENTS[0],
    [activeEvent]
  );
  const activeMoments = useMemo(() => fanCamMoments, [fanCamMoments]);
  const activeMoment = activeMoments[activeMomentIndex];
  const isVenusEvent = activeMeta.name === "VENUS";
  const activeTickets = DEFAULT_EVENT_TICKETS[activeMeta.name];
  const activeControl = eventControls[activeMeta.name] ?? EVENT_CONTROL_DEFAULTS[activeMeta.name];
  const activePassesUsed = passesUsedByEvent[activeMeta.name] ?? 0;
  const passesLeft = activeControl.passesEnabled
    ? Math.max(0, activeControl.passLimit - activePassesUsed)
    : 0;
  const upcomingEntryPrice =
    activeControl.passesEnabled && passesLeft > 0
      ? "free pass live"
      : activeTickets[0]?.price ?? activeMeta.fallbackPrice;
  const egoticketsPassUrl = useMemo(() => {
    if (!activeMeta.egoticketsEventUrl) {
      return "";
    }

    try {
      const url = new URL(activeMeta.egoticketsEventUrl);
      url.searchParams.set("utm_source", "zyragh");
      url.searchParams.set("utm_medium", "events_page_pass");
      url.searchParams.set("utm_campaign", activeMeta.slug);
      return url.toString();
    } catch {
      return activeMeta.egoticketsEventUrl;
    }
  }, [activeMeta.egoticketsEventUrl, activeMeta.slug]);

  useEffect(() => {
    if (activeMoments.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveMomentIndex((currentIndex) =>
        currentIndex >= activeMoments.length - 1 ? 0 : currentIndex + 1
      );
    }, 3600);

    return () => window.clearInterval(intervalId);
  }, [activeMoments.length]);

  useEffect(() => {
    if (activeMomentIndex < activeMoments.length) {
      return;
    }
    setActiveMomentIndex(0);
  }, [activeMomentIndex, activeMoments.length]);

  const loadPublicEventSnapshot = useCallback(async () => {
    const response = await fetch("/api/events/public", {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("failed to fetch event controls");
    }

    const payload = (await response.json()) as Partial<EventPublicSnapshot>;
    const rawControls = payload.controls ?? {};
    const nextControls: Record<EventName, EventControl> = {
      VENUS: toSafeEventControl((rawControls as Record<string, unknown>).VENUS, EVENT_CONTROL_DEFAULTS.VENUS),
      "We Outside": toSafeEventControl(
        (rawControls as Record<string, unknown>)["We Outside"],
        EVENT_CONTROL_DEFAULTS["We Outside"]
      ),
    };

    setEventControls(nextControls);
    setPassesUsedByEvent(toSafePassUsage(payload.passesUsedByEvent));
  }, []);

  const trackFeature = useCallback(
    (feature: EventFeatureKey, eventName: EventName = activeEvent) => {
      const sessionId = getOrCreateTrackingSessionId();
      if (!sessionId) {
        return;
      }

      void fetch("/api/events/track", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        keepalive: true,
        body: JSON.stringify({
          sessionId,
          event: eventName,
          feature,
        }),
      });
    },
    [activeEvent]
  );

  useEffect(() => {
    if (!hasLoadedPersistedEvent || hasTrackedInitialPageView.current) {
      return;
    }

    hasTrackedInitialPageView.current = true;
    trackFeature("events_page_view", activeEvent);
  }, [activeEvent, hasLoadedPersistedEvent, trackFeature]);

  const loadFanCamMoments = useCallback(async () => {
    const response = await fetch("/api/fancam/items", {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("failed to fetch fan cam moments");
    }

    const payload = (await response.json()) as FanCamListResponse;
    const rawItems = Array.isArray(payload.items) ? payload.items : [];
    const normalized = rawItems
      .map((entry) => normalizeFanCamMoment(entry))
      .filter((item): item is FanCamMoment => item !== null);

    setFanCamMoments(normalized);
    setFanCamError("");
  }, []);

  useEffect(() => {
    let isMounted = true;

    const syncPublicData = async () => {
      if (!isDocumentVisible()) {
        return;
      }

      const [fanCamResult, controlsResult] = await Promise.allSettled([
        loadFanCamMoments(),
        loadPublicEventSnapshot(),
      ]);

      if (!isMounted) {
        return;
      }

      if (fanCamResult.status === "rejected") {
        setFanCamError("could not load fan cam uploads right now.");
      }

      if (controlsResult.status === "rejected") {
        setFanCamError("event controls are syncing. refresh in a sec.");
      }
    };

    void syncPublicData();
    const intervalId = window.setInterval(() => {
      void syncPublicData();
    }, FAN_CAM_REFRESH_MS);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [loadFanCamMoments, loadPublicEventSnapshot]);

  const createFanCamItem = async (body: {
    id: string;
    event: EventName;
    kind: "image" | "video";
    name: string;
    createdAt: number;
    mediaStatus: FanCamMomentStatus;
    src?: string;
    playbackId?: string;
    muxUploadId?: string;
  }) => {
    const response = await fetch("/api/fancam/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("failed to register fan cam upload");
    }

    const payload = (await response.json()) as FanCamCreateResponse;
    if (payload.editToken) {
      fanCamEditTokens.current[body.id] = payload.editToken;
    }
  };

  const patchFanCamItem = async (body: {
    id: string;
    mediaStatus?: FanCamMomentStatus;
    src?: string;
    playbackId?: string;
    muxUploadId?: string;
  }) => {
    const editToken = fanCamEditTokens.current[body.id];
    if (!editToken) {
      throw new Error("missing edit token for upload patch");
    }

    const response = await fetch("/api/fancam/items", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-fancam-edit-token": editToken,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("failed to update fan cam upload");
    }

    if (body.mediaStatus === "ready" || body.mediaStatus === "failed") {
      delete fanCamEditTokens.current[body.id];
    }
  };

  const pollMuxPlaybackId = async (uploadId: string) => {
    for (let attempt = 0; attempt < MUX_MAX_POLL_ATTEMPTS; attempt += 1) {
      await sleep(MUX_POLL_MS);

      const statusResponse = await fetch(`/api/fancam/mux-upload-status?uploadId=${encodeURIComponent(uploadId)}`, {
        method: "GET",
        cache: "no-store",
      });

      if (!statusResponse.ok) {
        continue;
      }

      const statusJson = (await statusResponse.json()) as MuxUploadStatusResponse;
      if (statusJson.playbackId) {
        return statusJson.playbackId;
      }

      const hasFailed =
        statusJson.uploadStatus === "errored" ||
        statusJson.uploadStatus === "cancelled" ||
        statusJson.uploadStatus === "timed_out" ||
        statusJson.assetStatus === "errored";

      if (hasFailed) {
        throw new Error(statusJson.errorMessage ?? "video processing failed");
      }
    }

    return null;
  };

  const openFanCamPicker = () => {
    trackFeature("fan_cam_upload_open", activeEvent);
    fileInputRef.current?.click();
  };

  const onFanCamUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      setFanCamError("upload a clear image or video only.");
      return;
    }

    const now = Date.now();
    const momentId = makeMomentId();
    const safeEvent = toPathSegment(activeEvent);
    const safeFileName = toPathSegment(file.name || "upload");
    const blobPath = `fan-cam/${safeEvent}/${now}-${safeFileName}`;

    setFanCamError("");
    setIsUploadingFanCam(true);

    let uploadRegistered = false;

    try {
      if (file.type.startsWith("image/")) {
        setFanCamUploadStatus("uploading original image...");
        const uploadedImageUrl = await uploadFileToFanCamStorage({
          file,
          event: activeEvent,
          kind: "image",
          fallbackPath: blobPath,
        });

        await createFanCamItem({
          id: momentId,
          event: activeEvent,
          kind: "image",
          name: file.name,
          createdAt: now,
          mediaStatus: "ready",
          src: uploadedImageUrl,
        });

        uploadRegistered = true;
        setFanCamUploadStatus("image uploaded.");
        await loadFanCamMoments();
        setActiveMomentIndex(0);
        return;
      }

      setFanCamUploadStatus("creating secure video upload...");
      const createUploadResponse = await fetch("/api/fancam/mux-upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event: activeEvent,
          fileName: file.name,
          contentType: file.type,
          size: file.size,
        }),
      });

      if (!createUploadResponse.ok) {
        // Fallback path: if Mux is unavailable, store the original video in Blob.
        setFanCamUploadStatus("video stream service unavailable. uploading original video...");
        const uploadedVideoUrl = await uploadFileToFanCamStorage({
          file,
          event: activeEvent,
          kind: "video",
          fallbackPath: blobPath,
        });

        await createFanCamItem({
          id: momentId,
          event: activeEvent,
          kind: "video",
          name: file.name,
          createdAt: now,
          mediaStatus: "ready",
          src: uploadedVideoUrl,
        });
        uploadRegistered = true;
        setFanCamUploadStatus("video uploaded.");
        await loadFanCamMoments();
        return;
      }

      const createUploadJson = (await createUploadResponse.json()) as {
        uploadId?: string;
        uploadUrl?: string;
      };

      if (!createUploadJson.uploadId || !createUploadJson.uploadUrl) {
        throw new Error("mux direct upload response was incomplete");
      }

      await createFanCamItem({
        id: momentId,
        event: activeEvent,
        kind: "video",
        name: file.name,
        createdAt: now,
        mediaStatus: "processing",
        muxUploadId: createUploadJson.uploadId,
      });
      uploadRegistered = true;

      setFanCamUploadStatus("uploading source video...");
      const muxUploadResponse = await fetch(createUploadJson.uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type || "application/octet-stream",
        },
        body: file,
      });

      if (!muxUploadResponse.ok) {
        throw new Error("video upload to mux failed");
      }

      setFanCamUploadStatus("processing video for adaptive playback...");
      const playbackId = await pollMuxPlaybackId(createUploadJson.uploadId);

      if (!playbackId) {
        await patchFanCamItem({
          id: momentId,
          mediaStatus: "failed",
          muxUploadId: createUploadJson.uploadId,
        });
        setFanCamError("video upload finished, but processing is still running. check back in a bit.");
        return;
      }

      await patchFanCamItem({
        id: momentId,
        mediaStatus: "ready",
        playbackId,
        muxUploadId: createUploadJson.uploadId,
      });
      setFanCamUploadStatus("video uploaded.");
      await loadFanCamMoments();
    } catch {
      if (uploadRegistered) {
        try {
          setFanCamUploadStatus("recovering upload via direct video storage...");
          const uploadedVideoUrl = await uploadFileToFanCamStorage({
            file,
            event: activeEvent,
            kind: "video",
            fallbackPath: blobPath,
          });

          await patchFanCamItem({
            id: momentId,
            mediaStatus: "ready",
            src: uploadedVideoUrl,
          });
          setFanCamUploadStatus("video uploaded.");
          await loadFanCamMoments();
          return;
        } catch {
          // Fall through to failed marker below.
        }
      }

      if (uploadRegistered) {
        try {
          await patchFanCamItem({
            id: momentId,
            mediaStatus: "failed",
          });
        } catch {
          // Keep primary upload failure message.
        }
      }
      setFanCamError("upload failed. try one more time.");
    } finally {
      setFanCamUploadStatus("");
      setIsUploadingFanCam(false);
    }
  };

  const navToneClass =
    theme === "dark"
      ? isVenusEvent
        ? "from-indigo-900/82 via-violet-800/70 to-slate-950/85 border-violet-300/25"
        : "from-emerald-900/82 via-cyan-900/70 to-slate-950/85 border-cyan-300/25"
      : isVenusEvent
        ? "from-violet-300/80 via-fuchsia-300/68 to-rose-200/55 border-fuchsia-400/55"
        : "from-emerald-300/82 via-cyan-300/70 to-sky-200/60 border-cyan-400/55";

  const pageStyle = useMemo(
    () => ({
      background:
        theme === "dark"
          ? isVenusEvent
            ? "radial-gradient(1260px 780px at 8% -12%, rgba(129,140,248,0.34), transparent 60%), radial-gradient(1080px 650px at 92% -8%, rgba(217,70,239,0.28), transparent 62%), radial-gradient(980px 640px at 50% 112%, rgba(168,85,247,0.24), transparent 68%), linear-gradient(180deg, #140830 0%, #11183d 46%, #060d28 100%)"
            : "radial-gradient(1260px 780px at 8% -12%, rgba(20,184,166,0.34), transparent 60%), radial-gradient(1080px 650px at 92% -8%, rgba(14,165,233,0.28), transparent 62%), radial-gradient(980px 640px at 50% 112%, rgba(45,212,191,0.24), transparent 68%), linear-gradient(180deg, #0b332b 0%, #0b2e44 46%, #060d28 100%)"
          : isVenusEvent
            ? "radial-gradient(1180px 700px at 10% -14%, rgba(167,139,250,0.52), transparent 64%), radial-gradient(980px 590px at 90% -8%, rgba(244,114,182,0.42), transparent 62%), radial-gradient(1040px 620px at 50% 112%, rgba(129,140,248,0.28), transparent 70%), linear-gradient(180deg, #fcf8ff 0%, #f6eeff 54%, #e7dcff 100%)"
            : "radial-gradient(1180px 700px at 10% -14%, rgba(16,185,129,0.48), transparent 64%), radial-gradient(980px 590px at 90% -8%, rgba(6,182,212,0.44), transparent 62%), radial-gradient(1040px 620px at 50% 112%, rgba(59,130,246,0.28), transparent 70%), linear-gradient(180deg, #f0fffb 0%, #ecfbff 54%, #dbeeff 100%)",
    }),
    [isVenusEvent, theme]
  );

  const eventsJsonLd = useMemo(() => {
    const itemList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "zyra events",
      itemListElement: EVENTS.map((event, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: event.name,
        url: `${SITE_URL}/events/${event.slug}`,
      })),
    };

    const venus = EVENTS.find((event) => event.name === "VENUS");
    const venusSchema =
      venus?.startDateIso
        ? {
            "@context": "https://schema.org",
            "@type": "Event",
            name: venus.name,
            description: venus.description,
            startDate: venus.startDateIso,
            eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
            eventStatus: "https://schema.org/EventScheduled",
            location: {
              "@type": "Place",
              name: venus.venue,
              address: {
                "@type": "PostalAddress",
                addressLocality: venus.city,
                addressCountry: "GH",
              },
            },
            image: [`${SITE_URL}${venus.logo}`],
            organizer: {
              "@type": "Organization",
              name: "zyra",
              url: SITE_URL,
            },
            offers: {
              "@type": "Offer",
              priceCurrency: "GHS",
              price: "50",
              availability: "https://schema.org/InStock",
              url: `${SITE_URL}/events/${venus.slug}`,
            },
          }
        : null;

    return JSON.stringify(venusSchema ? [itemList, venusSchema] : [itemList]);
  }, []);

  return (
    <div
      className="relative min-h-screen overflow-x-clip text-slate-900 transition-colors duration-300 dark:text-slate-100"
      style={pageStyle}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: eventsJsonLd }} />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-white/10 dark:bg-slate-950/28" />
        <div
          className="absolute inset-0 bg-center bg-no-repeat opacity-[0.11] transition-opacity duration-300 dark:opacity-[0.17]"
          style={{
            backgroundImage: `url(${activeMeta.logo})`,
            backgroundSize: "min(52vw, 420px)",
          }}
        />
      </div>

      <ZyraSiteNav
        active="events"
        navbarClassName={`border-b bg-gradient-to-r backdrop-blur-lg ${navToneClass}`}
        brand={<ZyraBrandMark />}
      />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6 sm:pt-10">
        <section className="mb-8 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
          <Card className="border border-white/45 bg-white/50 backdrop-blur-xl dark:border-slate-700/55 dark:bg-slate-950/58">
            <CardBody className="gap-5">
              <Chip className="w-fit border border-cyan-200 bg-cyan-100 text-cyan-900 dark:border-cyan-700/60 dark:bg-cyan-900/35 dark:text-cyan-200">
                legendary moments
              </Chip>
              <div className="relative min-h-[340px] overflow-hidden rounded-3xl border border-white/45 bg-white/48 p-4 backdrop-blur-xl dark:border-slate-700/55 dark:bg-slate-950/58 sm:min-h-[380px] sm:p-5">
                <div className={`absolute inset-0 bg-gradient-to-br ${activeMeta.bannerTone} opacity-20`} />
                <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/30 blur-3xl dark:bg-white/10" />
                <div className="absolute -bottom-10 -left-8 h-28 w-28 rounded-full bg-white/25 blur-2xl dark:bg-white/10" />
                <div className="relative mx-auto w-full max-w-[320px]">
                  <div className="pointer-events-none absolute -inset-2 rounded-[1.9rem] bg-gradient-to-br from-fuchsia-400/35 via-cyan-300/30 to-blue-500/35 blur-xl" />
                  <div className="relative overflow-hidden rounded-[1.7rem] border border-white/55 bg-white/65 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.7)] dark:border-slate-600/70 dark:bg-slate-900/70">
                    <div
                      className={`relative ${
                        activeMoment?.kind === "video" ? "aspect-[9/16]" : "aspect-[3/4]"
                      } w-full bg-gradient-to-br from-white/45 via-white/20 to-slate-200/25 dark:from-slate-900/60 dark:via-slate-900/35 dark:to-slate-950/70`}
                    >
                      {activeMoment ? (
                        activeMoment.kind === "video" ? (
                          activeMoment.playbackId ? (
                            <MuxPlayer
                              playbackId={activeMoment.playbackId}
                              streamType="on-demand"
                              autoPlay
                              muted
                              loop
                              playsInline
                              metadataVideoTitle={activeMoment.name}
                              className="h-full w-full object-cover"
                            />
                          ) : activeMoment.src ? (
                            <video
                              src={activeMoment.src}
                              className="h-full w-full object-cover"
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload="metadata"
                            />
                          ) : (
                            <div className="flex h-full w-full items-end bg-gradient-to-b from-white/50 to-white/20 p-4 dark:from-slate-900/55 dark:to-slate-900/30">
                              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 dark:text-slate-200">
                                fan cam
                              </span>
                            </div>
                          )
                        ) : activeMoment.src ? (
                          <img
                            src={activeMoment.src}
                            alt={`fan cam upload ${activeMoment.name}`}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-end bg-gradient-to-b from-white/50 to-white/20 p-4 dark:from-slate-900/55 dark:to-slate-900/30">
                            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 dark:text-slate-200">
                              fan cam
                            </span>
                          </div>
                        )
                      ) : (
                        <div className="flex h-full w-full items-end bg-gradient-to-b from-white/50 to-white/20 p-4 dark:from-slate-900/55 dark:to-slate-900/30">
                          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-700 dark:text-slate-200">
                            fan cam
                          </span>
                        </div>
                      )}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-transparent p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white">fan cam</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative mt-4 flex flex-wrap items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={onFanCamUpload}
                  />
                  <Button
                    className="border border-cyan-300/70 bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                    onPress={openFanCamPicker}
                    isDisabled={isUploadingFanCam}
                  >
                    {isUploadingFanCam ? "uploading..." : "share your moment with us"}
                  </Button>
                  <Chip className="border border-white/55 bg-white/70 text-slate-700 dark:border-slate-600/75 dark:bg-slate-900/70 dark:text-slate-200">
                    photos + videos
                  </Chip>
                </div>
              </div>
              <Chip className="w-fit border border-slate-300/80 bg-white/72 text-slate-700 dark:border-slate-600/70 dark:bg-slate-900/66 dark:text-slate-200">
                events by +233events under zyra gh
              </Chip>
            </CardBody>
          </Card>

          <Card className="border border-white/45 bg-white/50 backdrop-blur-xl dark:border-slate-700/55 dark:bg-slate-950/58">
            <CardBody className="gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                events
              </p>
              {EVENTS.map((event) => {
                const selected = event.name === activeEvent;
                return (
                  <Button
                    key={event.slug}
                    variant="flat"
                    className={`h-auto justify-between border px-4 py-3 ${
                      selected
                        ? "border-cyan-300/85 bg-cyan-50 text-slate-900 dark:border-cyan-400/50 dark:bg-cyan-900/30 dark:text-slate-100"
                        : "border-white/45 bg-white/58 text-slate-800 dark:border-slate-700/55 dark:bg-slate-950/66 dark:text-slate-200"
                    }`}
                    onPress={() => {
                      if (event.name !== activeEvent) {
                        trackFeature("event_switch", event.name);
                      }
                      setActiveEvent(event.name);
                    }}
                  >
                    <div className="flex flex-col items-start gap-1">
                      <EventBrandName event={event} />
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {event.dateLabel} · {event.timeLabel}
                      </p>
                    </div>
                    <span className="text-xs uppercase tracking-[0.14em]">{selected ? "live" : "open"}</span>
                  </Button>
                );
              })}
            </CardBody>
          </Card>
        </section>

        <section className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-slate-900 dark:text-slate-100">
              upcoming event
            </h2>
          </div>

          <Card className="relative overflow-hidden border border-white/45 bg-white/50 backdrop-blur-xl dark:border-slate-700/55 dark:bg-slate-950/58">
            <CardBody className="relative gap-5 [&>*]:relative [&>*]:z-10">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white/58 via-white/35 to-white/15 dark:from-slate-900/62 dark:via-slate-900/40 dark:to-slate-900/24" />
              </div>

              <div className={`rounded-2xl bg-gradient-to-r ${activeMeta.bannerTone} p-4 text-white`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <EventBrandName event={activeMeta} />
                  <div className="flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-3 py-1 text-xs uppercase tracking-[0.14em]">
                    <span>{activeMeta.month}</span>
                    <span>{activeMeta.day}</span>
                  </div>
                </div>
                <p className="mt-2 text-sm text-white/90">{activeMeta.description}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl border border-white/45 bg-white/62 p-3 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/72">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">date</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">{activeMeta.dateLabel}</p>
                </div>
                <div className="rounded-2xl border border-white/45 bg-white/62 p-3 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/72">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">venue</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">{activeMeta.venue}</p>
                </div>
                <div className="rounded-2xl border border-white/45 bg-white/62 p-3 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/72">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">time</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">{activeMeta.timeLabel}</p>
                </div>
                <div className="rounded-2xl border border-white/45 bg-white/62 p-3 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/72">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">entry</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">{upcomingEntryPrice}</p>
                </div>
              </div>

              {activeControl.passesEnabled ? (
                <div className="rounded-2xl border border-white/45 bg-white/62 p-3 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/72">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">free pass tracker</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {passesLeft} left out of {activeControl.passLimit}
                  </p>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/45 bg-white/62 p-3 backdrop-blur-lg dark:border-slate-700/55 dark:bg-slate-950/72">
                  <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">paid entry</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {activeControl.liveTicketCount} tickets currently live
                  </p>
                </div>
              )}

              {activeControl.passesEnabled && passesLeft > 0 && egoticketsPassUrl ? (
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    as={Link}
                    href={egoticketsPassUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-emerald-300/80 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white"
                    onPress={() => {
                      trackFeature("ticket_click", activeMeta.name);
                    }}
                  >
                    get free pass now
                  </Button>
                  <Button
                    as={Link}
                    href={`/events/${activeMeta.slug}#pass-flow`}
                    className="border border-cyan-300/70 bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                    onPress={() => {
                      trackFeature("event_detail_open", activeMeta.name);
                    }}
                  >
                    see pass steps
                  </Button>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    use the free-pass button first, then go to tickets if the pass window closes.
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    as={Link}
                    href={`/events/${activeMeta.slug}`}
                    className="border border-cyan-300/70 bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                    onPress={() => {
                      trackFeature("event_detail_open", activeMeta.name);
                    }}
                  >
                    join the experience
                  </Button>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    full tickets, passes, and table reservation are on the detail page.
                  </p>
                </div>
              )}
            </CardBody>
          </Card>
        </section>
      </main>
    </div>
  );
}
