import type { EventName } from "@/lib/eventsData";

export const EVENT_TRACK_SESSION_KEY = "zyra_event_track_session_v1";

export type EventFeatureKey =
  | "event_detail_open"
  | "event_detail_view"
  | "event_switch"
  | "events_page_view"
  | "fan_cam_upload_open"
  | "ticket_click";

export type EventControl = {
  passesEnabled: boolean;
  passLimit: number;
  liveTicketCount: number;
};

export type EventPublicSnapshot = {
  controls: Record<EventName, EventControl>;
  passesUsedByEvent: Record<EventName, number>;
};

export const EVENT_CONTROL_DEFAULTS: Record<EventName, EventControl> = {
  VENUS: {
    passesEnabled: false,
    passLimit: 200,
    liveTicketCount: 1,
  },
  "We Outside": {
    passesEnabled: false,
    passLimit: 0,
    liveTicketCount: 0,
  },
};