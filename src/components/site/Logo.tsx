import { cn } from "../../lib/utils";

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="TheDogMall"
      width={870}
      height={670}
      className={cn("h-16 w-auto", className)}
    />
  );
}
