import { cn } from "../../lib/utils";

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("size-9", className)}
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="14" className="fill-primary" />
      <ellipse
        cx="24"
        cy="31"
        rx="10.5"
        ry="8.5"
        className="fill-primary-foreground"
      />
      <ellipse
        cx="11.5"
        cy="17"
        rx="4.2"
        ry="5.4"
        className="fill-primary-foreground"
      />
      <ellipse
        cx="20.5"
        cy="11"
        rx="4.2"
        ry="5.6"
        className="fill-primary-foreground"
      />
      <ellipse
        cx="29.5"
        cy="11"
        rx="4.2"
        ry="5.6"
        className="fill-primary-foreground"
      />
      <ellipse
        cx="38.5"
        cy="17"
        rx="4.2"
        ry="5.4"
        className="fill-primary-foreground"
      />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
};

export default function Logo({
  className,
  markClassName,
  wordmarkClassName,
}: LogoProps) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LogoMark className={markClassName} />
      <span
        className={cn(
          "text-lg font-bold tracking-tight text-foreground",
          wordmarkClassName
        )}
      >
        TheDogMall
      </span>
    </span>
  );
}
