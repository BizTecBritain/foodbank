import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import Link from "next/link";

import { title, subtitle } from "@/components/primitives";
import { getServerAuthSession } from "@/auth";
import UserInfo from "@/components/user-info";

export default async function Home() {
  const authSession = await getServerAuthSession();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Make&nbsp;</span>
        <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
        <br />
        <span className={title()}>
          websites regardless of your design experience.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </div>
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div>
      {authSession?.user && <UserInfo user={authSession?.user} />}
      {!authSession?.user && (
        <Link
          className="font-medium mt-2 text-blue-600 hover:underline"
          href="/login"
        >
          Login
        </Link>
      )}
    </section>
  );
}
