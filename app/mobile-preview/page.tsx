"use client";

import { Button, Card, CardBody } from "@heroui/react";
import { useMemo, useState } from "react";

const PREVIEW_PATHS = [
  { label: "home", value: "/" },
  { label: "events", value: "/events" },
  { label: "services", value: "/services" },
];

const DEVICE_FRAMES = [
  {
    id: "iphone-17-pro-max",
    label: "iphone 17 pro max (ios)",
    subLabel: "440 x 956",
    width: 440,
    height: 956,
    shellClass:
      "relative overflow-hidden rounded-[42px] border-8 border-slate-900 bg-black shadow-[0_28px_70px_rgba(0,0,0,0.6)]",
    notch: (
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 px-4 pt-2">
        <div className="relative">
          <div className="flex items-center justify-between px-1 text-[11px] font-semibold text-white">
            <span>9:41</span>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span>5G</span>
              <span className="h-2 w-2 rounded-[2px] border border-white/90" />
              <span className="h-2.5 w-5 rounded-sm border border-white/90 px-[1px] py-[1px]">
                <span className="block h-full w-[72%] rounded-[2px] bg-white" />
              </span>
            </div>
          </div>
          <div className="absolute left-1/2 top-[1px] h-7 w-28 -translate-x-1/2 rounded-full border border-slate-700/70 bg-black shadow-[0_6px_16px_rgba(0,0,0,0.6)]" />
        </div>
      </div>
    ),
  },
  {
    id: "android-latest",
    label: "android (latest)",
    subLabel: "412 x 915",
    width: 412,
    height: 915,
    shellClass:
      "relative overflow-hidden rounded-[32px] border-[10px] border-slate-900 bg-black shadow-[0_28px_70px_rgba(0,0,0,0.6)]",
    notch: (
      <div className="pointer-events-none absolute left-1/2 top-2 z-20 h-3 w-3 -translate-x-1/2 rounded-full bg-slate-800 ring-2 ring-slate-700" />
    ),
  },
];

export default function MobilePreviewPage() {
  const [path, setPath] = useState<string>("/");
  const src = useMemo(() => `${path}${path.includes("?") ? "&" : "?"}mobile_preview=1`, [path]);

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <Card className="border border-slate-700/70 bg-slate-900/80">
          <CardBody className="gap-3">
            <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-slate-100">
              mobile layout preview
            </p>
            <p className="text-sm text-slate-300">
              this renders your site inside a phone-sized screen so you can review the mobile experience from your pc.
            </p>
            <div className="flex flex-wrap gap-2">
              {PREVIEW_PATHS.map((item) => (
                <Button
                  key={item.value}
                  size="sm"
                  onPress={() => setPath(item.value)}
                  className={
                    path === item.value
                      ? "bg-cyan-500 text-slate-950"
                      : "border border-slate-600 bg-slate-800 text-slate-100"
                  }
                  variant={path === item.value ? "solid" : "flat"}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </CardBody>
        </Card>

        <div className="grid gap-6 overflow-x-auto pb-2 md:grid-cols-2">
          {DEVICE_FRAMES.map((device) => (
            <div key={device.id} className="mx-auto">
              <div className="mb-2 text-center">
                <p className="font-[family-name:var(--font-space-grotesk)] text-sm font-semibold text-slate-100">
                  {device.label}
                </p>
                <p className="text-xs text-slate-400">{device.subLabel}</p>
              </div>
              <div
                className={device.shellClass}
                style={{ width: `${device.width}px`, height: `${device.height}px` }}
              >
                {device.notch}
                <iframe
                  title={`${device.label} preview frame`}
                  src={src}
                  className="h-full w-full border-0 bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
