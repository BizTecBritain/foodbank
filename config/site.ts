export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
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
