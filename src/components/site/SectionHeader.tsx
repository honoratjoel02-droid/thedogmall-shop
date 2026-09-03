import { Link } from "react-router-dom";
import { ArrowRight, type Icon } from "@phosphor-icons/react";

import { cn } from "../../lib/utils";

type SectionHeaderProps = {
  icon?: Icon;
  eyebrow?: string;
  title: string;
  titleId?: string;
  description?: string;
  link?: { label: string; to: string };
  className?: string;
};

export default function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
  titleId,
  description,
  link,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div>
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            {eyebrow}
          </p>
        )}

        <h2
          id={titleId}
          className="flex items-center gap-2.5 text-2xl font-bold tracking-tight text-balance text-foreground sm:text-3xl"
        >
          {Icon && (
            <Icon
              size={26}
              weight="duotone"
              className="shrink-0 text-primary"
            />
          )}
          {title}
        </h2>

        {description && (
          <p className="mt-2 max-w-xl text-pretty text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {link && (
        <Link
          to={link.to}
          className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary"
        >
          {link.label}
          <ArrowRight
            size={15}
            weight="bold"
            className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
          />
        </Link>
      )}
    </div>
  );
}
