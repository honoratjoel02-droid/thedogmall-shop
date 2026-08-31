import type { ReactNode } from "react";

import { cn } from "../../lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Scroll-entry animation driven entirely by CSS (`animation-timeline`).
 * Content is visible by default: browsers without scroll-driven animation
 * support, and readers with reduced-motion enabled, simply see it static.
 */
export default function Reveal({ children, className }: RevealProps) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
