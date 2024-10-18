export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Foodbank",
  description: "Simple toolkit for efficient, paperless foodbank management",
  navItems: [
    {
      label: "Top-up Table",
      href: "/place-order",
      requires: ["login"],
    },
    {
      label: "Stockroom",
      href: "/fulfil-order",
      requires: ["login"],
    },
    {
      label: "Toiletries Table",
      href: "/fulfil-toiletries",
      requires: ["login"],
    },
    {
      label: "Deliveries",
      href: "/deliveries",
      requires: ["login"],
    },
    {
      label: "Admin",
      href: "/admin",
      requires: ["login", "admin"],
    },
  ],
};
