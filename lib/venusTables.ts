export const VENUS_TABLE_SECTION_ID = "table-reservation";
export const VENUS_TABLE_PACKAGES_HREF = `/events/venus#${VENUS_TABLE_SECTION_ID}`;
export const VENUS_TABLE_WHATSAPP_NUMBER = "233540903201";

export type VenusTablePackage = {
  id: string;
  price: number;
  accent: "yellow" | "blue" | "pink";
};

export const VENUS_TABLE_PACKAGES: VenusTablePackage[] = [
  {
    id: "frank-lucas",
    price: 2000,
    accent: "yellow",
  },
  {
    id: "griselda-blanco",
    price: 3000,
    accent: "blue",
  },
  {
    id: "carrillo-fuentes",
    price: 5000,
    accent: "pink",
  },
  {
    id: "el-chapo",
    price: 10000,
    accent: "pink",
  },
  {
    id: "el-mayo",
    price: 15000,
    accent: "blue",
  },
  {
    id: "carlos-lehder",
    price: 20000,
    accent: "yellow",
  },
  {
    id: "pablo-escobar",
    price: 30000,
    accent: "pink",
  },
];

export function formatVenusTablePrice(price: number) {
  return `GHS ${price.toLocaleString("en-GH")}`;
}

export function buildVenusTableWhatsAppUrl(table?: VenusTablePackage) {
  const packageDescription = table
    ? `the ${formatVenusTablePrice(table.price)} table`
    : "a table";
  const message = `Hi, I'd like to reserve ${packageDescription} for VENUS at Jet BBlack Lounge on 23 October 2026 at 9pm. Please confirm availability and what's needed to secure the booking.`;
  return `https://wa.me/${VENUS_TABLE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const VENUS_TABLE_ENQUIRY_URL = buildVenusTableWhatsAppUrl();
