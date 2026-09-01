import { cn } from "../../lib/utils";

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <img
      src="/logo.png"
      alt="THE DOG MALL"
      width={870}
      height={670}
      className={cn("h-16 w-auto", className)}
    />
  );
}
