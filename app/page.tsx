import { Button } from "@nextui-org/button";
import Link from "next/link";

import { title, subtitle } from "@/components/primitives";
import { getServerAuthSession } from "@/auth";

export default async function Home() {
  const authSession = await getServerAuthSession();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Manage&nbsp;</span>
        <span className={title({ color: "violet" })}>Foodbank&nbsp;</span>
        <br />
        <span className={title()}>resources in an easy to use UI</span>
        <div className={subtitle({ class: "mt-4" })}>
          Simple toolkit for efficient, paperless foodbank management.
        </div>
      </div>

      {authSession?.user ? (
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title({ size: "sm" })}>Welcome&nbsp;</span>
          <span className={title({ size: "sm", color: "cyan" })}>
            {authSession.user.name}&nbsp;
          </span>
          <br />
          <span className={subtitle({ class: "mt-4" })}>
            Browse using the navbar
          </span>
          <Button
            as={Link}
            className="font-medium mt-2 px-8"
            color="primary"
            href="/logout"
          >
            Logout
          </Button>
        </div>
      ) : (
        <Button
          as={Link}
          className="font-medium mt-2 px-8"
          color="primary"
          href="/login"
        >
          Login
        </Button>
      )}
    </section>
  );
}
