"use client";

import { Card, CardBody, Chip } from "@heroui/react";
import { motion } from "framer-motion";

const NODES = [
  { id: "n1", x: 54, y: 62, delay: 0.1 },
  { id: "n2", x: 120, y: 40, delay: 0.25 },
  { id: "n3", x: 192, y: 70, delay: 0.4 },
  { id: "n4", x: 84, y: 140, delay: 0.55 },
  { id: "n5", x: 164, y: 138, delay: 0.7 },
  { id: "n6", x: 238, y: 94, delay: 0.85 },
  { id: "n7", x: 266, y: 166, delay: 1 },
];

const LINKS: Array<[string, string]> = [
  ["n1", "n2"],
  ["n2", "n3"],
  ["n2", "n4"],
  ["n3", "n5"],
  ["n4", "n5"],
  ["n5", "n6"],
  ["n6", "n7"],
  ["n4", "n7"],
];

const nodeMap = Object.fromEntries(NODES.map((node) => [node.id, node]));

export default function SignalMeshGraphic() {
  return (
    <Card className="relative overflow-hidden border border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/70">
      <CardBody className="gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-slate-900 dark:text-slate-100">
            growth signal mesh
          </h2>
          <Chip className="bg-slate-900 text-white dark:bg-slate-700 dark:text-slate-100">
            live map
          </Chip>
        </div>

        <div className="relative h-64 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/70 dark:border-slate-700/80 dark:bg-slate-950/70">
          <motion.div
            className="absolute -left-16 -top-12 h-40 w-40 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(56,189,248,0.48), transparent 70%)" }}
            animate={{ x: [0, 26, 0], y: [0, 10, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-0 right-0 h-44 w-44 rounded-full blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.5), transparent 70%)" }}
            animate={{ x: [0, -22, 0], y: [0, -16, 0], opacity: [0.45, 0.82, 0.45] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <svg viewBox="0 0 320 200" className="relative z-10 h-full w-full p-5 text-slate-500 dark:text-slate-300">
            {LINKS.map(([fromId, toId], index) => {
              const from = nodeMap[fromId];
              const to = nodeMap[toId];
              return (
                <motion.line
                  key={`${fromId}-${toId}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0.2 }}
                  animate={{ pathLength: 1, opacity: [0.2, 0.8, 0.2] }}
                  transition={{
                    duration: 2.5 + index * 0.2,
                    delay: index * 0.05,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              );
            })}

            {NODES.map((node) => (
              <g key={node.id}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="6"
                  fill="rgba(59,130,246,0.26)"
                  animate={{ r: [5, 8, 5], opacity: [0.5, 0.88, 0.5] }}
                  transition={{ duration: 2.3, repeat: Infinity, delay: node.delay }}
                />
                <circle cx={node.x} cy={node.y} r="3.1" fill="rgba(15,23,42,0.88)" />
              </g>
            ))}
          </svg>

          <motion.div
            className="absolute left-1/2 top-1/2 z-20 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-300/60 dark:border-slate-500/50"
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-900 dark:bg-slate-200" />
          </motion.div>
        </div>
      </CardBody>
    </Card>
  );
}
