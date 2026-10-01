"use client";

import { Button, Card, CardBody, Link } from "@heroui/react";
import {
  buildVenusTableWhatsAppUrl,
  formatVenusTablePrice,
  VENUS_TABLE_PACKAGES,
  VENUS_TABLE_SECTION_ID,
} from "@/lib/venusTables";
import styles from "./VenusTablePackages.module.css";

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={styles.icon}>
      <path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.5L3 21l1.7-4.7A8.5 8.5 0 1 1 20.5 11.8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="m8.2 7.6 1.4 2.7-1 1.1c.8 1.5 1.8 2.5 3.3 3.2l1.1-1 2.7 1.4c-.3 1.4-1 1.9-2.2 1.6-3.7-.9-6.1-3.3-7-7-.2-1.1.3-1.7 1.7-2Z" fill="currentColor" />
    </svg>
  );
}

export function VenusTablePackages() {
  return (
    <section id={VENUS_TABLE_SECTION_ID} aria-labelledby="venus-tables-heading" className={styles.section}>
      <div className={styles.headingRow}>
        <p className={styles.eyebrow}>VENUS / TABLE RESERVATIONS</p>
        <h2 id="venus-tables-heading" className={styles.heading}>
          choose your table
        </h2>
      </div>

      <div className={styles.grid}>
        {VENUS_TABLE_PACKAGES.map((table) => (
          <Card key={table.id} as="article" className={styles.card} data-accent={table.accent} data-experience={table.price === 30000 ? undefined : table.id} data-premium={table.id === "pablo-escobar" ? "true" : undefined}>
            <CardBody className={styles.cardBody}>
              <div className={styles.cardHeading}>
                {table.id === "pablo-escobar" ? (
                  <span className={styles.premiumSeal} aria-hidden="true">
                    <svg viewBox="0 0 32 32" fill="none"><path d="m5 10 6 5 5-9 5 9 6-5-3 14H8L5 10Zm3 17h16" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>
                  </span>
                ) : null}
                <h3 className={styles.price}>{formatVenusTablePrice(table.price)}</h3>
              </div>
              <div className={styles.cardAction}>
                <Button as={Link} href={buildVenusTableWhatsAppUrl(table)} target="_blank" rel="noopener noreferrer" className={styles.reserveButton} aria-label={`Reserve the ${formatVenusTablePrice(table.price)} table on WhatsApp (opens in a new tab)`} endContent={<WhatsAppIcon />}>
                  RESERVE THIS TABLE
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <p className={styles.bookingNote}>Table packages are optional and priced in Ghana cedis. Your table is only reserved once our team confirms the booking on WhatsApp.</p>
    </section>
  );
}
