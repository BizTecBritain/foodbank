export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Top-up Table",
      href: "/place-order",
    },
    {
      label: "Stockroom",
      href: "/fulfil-order",
    },
    {
      label: "Toiletries Table",
      href: "/fulfil-toiletries",
    },
    {
      label: "Deliveries",
      href: "/deliveries",
    },
    {
      label: "Admin",
      href: "/admin",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
};
