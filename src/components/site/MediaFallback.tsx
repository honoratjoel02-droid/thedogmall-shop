import type { Icon } from "@phosphor-icons/react";

import { cn } from "../../lib/utils";

type MediaFallbackProps = {
  icon: Icon;
  /** Décrit ce que la photo montrerait, pour les lecteurs d'écran. */
  label: string;
  className?: string;
  iconSize?: number;
};

/** Aplat de marque affiché à la place d'une photo encore absente. */
export default function MediaFallback({
  icon: Icon,
  label,
  className,
  iconSize = 48,
}: MediaFallbackProps) {
  return (
    <div
      role="img"
      aria-label={`${label}, photo à venir`}
      className={cn(
        "media-fallback flex items-center justify-center text-primary/50",
        className
      )}
    >
      <Icon size={iconSize} weight="duotone" />
    </div>
  );
}
