"use client";

import { usePathname } from "next/navigation";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";

export const Navbar = () => {
  const pathname = usePathname();
  const session = useSession();

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">Foodbank</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx({
                  ["pointer-events-none"]: pathname === item.href,
                })}
                color={pathname === item.href ? "primary" : "foreground"}
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
          {session.status == "authenticated" ? (
            <NavbarItem>
              <Link color="danger" onClick={() => signOut()}>
                Logout
              </Link>
            </NavbarItem>
          ) : (
            <NavbarItem>
              <Link color="primary" href="/login">
                Login
              </Link>
            </NavbarItem>
          )}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden lg:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem
              key={`${item}-${index}`}
              isActive={pathname === item.href}
            >
              <Link
                className={clsx({
                  ["pointer-events-none"]: pathname === item.href,
                })}
                color={pathname === item.href ? "primary" : "foreground"}
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          {session.status == "authenticated" ? (
            <NavbarItem>
              <Link color="danger" size="lg" onClick={() => signOut()}>
                Logout
              </Link>
            </NavbarItem>
          ) : (
            <NavbarItem>
              <Link color="primary" href="/login" size="lg">
                Login
              </Link>
            </NavbarItem>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
