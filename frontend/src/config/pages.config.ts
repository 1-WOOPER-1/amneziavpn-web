import { Gauge, ShieldCogCorner, UserKey, Wrench } from "lucide-react";

export const PAGES = [
  {
    href: "/",
    name: "Dashboard",
    icon: Gauge,
  },

  {
    href: "/protocols",
    name: "Protocols",
    icon: Wrench,
  },
  {
    href: "/clients",
    name: "Clients",
    icon: UserKey,
  },
  {
    href: "/security",
    name: "DNS & Security",
    icon: ShieldCogCorner,
  },
];
