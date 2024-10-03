import { Link } from "@nextui-org/link";

import { LeftArrowIcon, RightArrowIcon } from "./icons";

export interface PrevNextProps {
  prev?: {
    name: string;
    href?: string;
    onClick?: () => any;
  };
  next?: {
    name: string;
    href?: string;
    onClick?: () => any;
  };
}

export default function PrevNext({ prev, next }: PrevNextProps) {
  return (
    <div className="flex w-full justify-between py-20">
      {prev ? (
        <Link
          className="px-2 py-1 hover:after:opacity-100 after:content-[''] after:inset-0 after:opacity-0 after:w-full after:h-full after:rounded-xl after:transition-background after:absolute hover:after:bg-foreground/10 cursor-pointer flex gap-2"
          color="foreground"
          href={prev.href}
          onClick={prev.onClick}
        >
          <LeftArrowIcon />
          {prev.name}
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          className="px-2 py-1 hover:after:opacity-100 after:content-[''] after:inset-0 after:opacity-0 after:w-full after:h-full after:rounded-xl after:transition-background after:absolute hover:after:bg-foreground/10 cursor-pointer flex gap-2"
          color="foreground"
          href={next.href}
          onClick={next.onClick}
        >
          {next.name}
          <RightArrowIcon />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
