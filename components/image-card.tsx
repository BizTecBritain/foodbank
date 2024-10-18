import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import clsx from "clsx";
import { ReactNode } from "react";

export interface ImageCardProps {
  src: string;
  alt: string;
  children: ReactNode;
  className?: string;
  onClick?: () => any;
}

export default function ImageCard({
  src,
  alt,
  children,
  className,
  onClick,
}: ImageCardProps) {
  return (
    <Card
      isFooterBlurred
      isPressable
      className={clsx("border-2", className)}
      radius="lg"
      onClick={onClick}
    >
      <Image
        alt={alt}
        className="object-cover pointer-events-none"
        classNames={{ wrapper: "w-full h-full pointer-events-none" }}
        height="100%"
        radius="none"
        src={src}
        width="100%"
      />
      <CardFooter className="backdrop-blur-2xl justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 pointer-events-none">
        {children}
      </CardFooter>
    </Card>
  );
}
