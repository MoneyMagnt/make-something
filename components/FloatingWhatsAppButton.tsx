"use client";

import { Button, Link, Tooltip } from "@heroui/react";
import { motion } from "framer-motion";

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.17 1.6 5.99L0 24l6.28-1.73a11.8 11.8 0 0 0 5.74 1.47h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.17-1.24-6.14-3.4-8.36Zm-8.49 18.2h-.01a9.85 9.85 0 0 1-5.03-1.38l-.36-.21-3.73 1.03 1-3.84-.23-.39a9.85 9.85 0 0 1-1.53-5.26c0-5.45 4.43-9.89 9.9-9.89 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.89 6.99c0 5.45-4.44 9.9-9.88 9.9Zm5.43-7.43c-.3-.15-1.8-.89-2.08-.99-.28-.1-.49-.15-.7.15-.2.3-.8.99-.98 1.2-.18.2-.36.23-.67.08-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.68-2.1-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.7-1.7-.96-2.33-.26-.63-.52-.54-.7-.55h-.6c-.2 0-.53.08-.8.38-.28.3-1.06 1.03-1.06 2.52 0 1.49 1.08 2.93 1.24 3.13.15.2 2.13 3.25 5.15 4.56.72.3 1.28.48 1.72.62.72.23 1.37.2 1.88.12.57-.08 1.8-.74 2.05-1.46.25-.72.25-1.34.17-1.47-.08-.13-.28-.2-.58-.35Z" />
    </svg>
  );
}

export default function FloatingWhatsAppButton() {
  return (
    <div className="fixed bottom-5 right-5 z-[9996]">
      <Tooltip content="chat on whatsapp" placement="left">
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <Button
            as={Link}
            href="https://wa.me/233556877954"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="chat on whatsapp"
            className="hidden h-12 min-w-0 items-center gap-2 rounded-full border border-emerald-300/60 bg-gradient-to-r from-emerald-500 to-green-600 px-4 text-sm font-semibold text-white shadow-[0_14px_36px_rgba(16,185,129,0.4)] md:inline-flex"
          >
            <WhatsAppGlyph />
            <span>chat on whatsapp</span>
          </Button>

          <Button
            as={Link}
            href="https://wa.me/233556877954"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="tap the whatsapp icon to chat"
            radius="full"
            className="h-14 w-14 min-w-14 border border-emerald-300/60 bg-gradient-to-br from-emerald-500 to-green-600 text-white shadow-[0_14px_36px_rgba(16,185,129,0.4)] md:hidden"
          >
            <WhatsAppGlyph />
          </Button>
        </motion.div>
      </Tooltip>
    </div>
  );
}

