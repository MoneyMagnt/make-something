export const VENUS_TABLE_SECTION_ID = "table-reservation";
export const VENUS_TABLE_PACKAGES_HREF = `/events/venus#${VENUS_TABLE_SECTION_ID}`;
export const VENUS_TABLE_WHATSAPP_NUMBER = "233540903201";

export type VenusTablePackage = {
  id: string;
  name: string;
  price: number;
  drinks: string[];
  extras: string[];
  accent: "yellow" | "blue" | "pink";
};

export const VENUS_TABLE_PACKAGES: VenusTablePackage[] = [
  {
    id: "frank-lucas",
    name: "Frank Lucas",
    price: 2000,
    drinks: ["Jameson", "Malibu"],
    extras: ["1 shisha", "Coca-Cola", "Sprite", "Bottled water"],
    accent: "yellow",
  },
  {
    id: "griselda-blanco",
    name: "Griselda Blanco",
    price: 3000,
    drinks: ["Jameson", "Malibu"],
    extras: ["1 shisha", "Coca-Cola", "Sprite", "Schweppes", "Bottled water"],
    accent: "blue",
  },
  {
    id: "carrillo-fuentes",
    name: "Carrillo Fuentes",
    price: 5000,
    drinks: ["Hennessy VS", "Martell VS", "Malibu"],
    extras: ["1 shisha", "Coca-Cola", "Sprite", "Schweppes", "Assorted juices", "Bottled water", "Finger foods"],
    accent: "pink",
  },
  {
    id: "el-chapo",
    name: "El Chapo",
    price: 10000,
    drinks: ["Martell XO", "Smirnoff Cherry Vodka", "Canti Prosecco"],
    extras: ["2 shishas", "Coca-Cola", "Sprite", "Schweppes", "Assorted juices", "Bottled water", "Finger foods"],
    accent: "pink",
  },
  {
    id: "el-mayo",
    name: "El Mayo",
    price: 15000,
    drinks: ["Jack Daniel's No. 7", "Martell VSOP", "Martell XO", "Prosecco selection"],
    extras: ["2 shishas", "Premium mixers", "Bottled water", "Finger foods"],
    accent: "blue",
  },
  {
    id: "carlos-lehder",
    name: "Carlos Lehder",
    price: 20000,
    drinks: ["Jack Daniel's No. 7", "Azul Plata", "Martell VSOP", "Prosecco"],
    extras: ["3 shishas", "Premium mixers", "Bottled water", "Premium finger foods"],
    accent: "yellow",
  },
  {
    id: "pablo-escobar",
    name: "Pablo Escobar",
    price: 30000,
    drinks: ["Don Julio Blanco", "Azul Reposado", "Hennessy XO", "Prosecco selection"],
    extras: ["4 shishas", "Coca-Cola", "Sprite", "Schweppes", "Assorted juices", "Energy drinks", "Bottled water", "Premium finger foods", "VIP table service"],
    accent: "pink",
  },
];

export function formatVenusTablePrice(price: number) {
  return `GHS ${price.toLocaleString("en-GH")}`;
}

export function buildVenusTableWhatsAppUrl(table?: VenusTablePackage) {
  const packageDescription = table
    ? `the ${table.name} table package (${formatVenusTablePrice(table.price)} per table)`
    : "a table";
  const message = `Hi, I'd like to reserve ${packageDescription} for VENUS at Jet BBlack Lounge on 11 September 2026 at 9pm. Please confirm availability and what's needed to secure the booking.`;
  return `https://wa.me/${VENUS_TABLE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const VENUS_TABLE_ENQUIRY_URL = buildVenusTableWhatsAppUrl();
