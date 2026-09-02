import type { ReactNode } from "react";

import { Label } from "./label";
import { cn } from "../../lib/utils";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
};

/**
 * Libellé, champ et message d'erreur. Le champ doit porter les attributs
 * renvoyés par `fieldAria(id, error)` pour être relié à son message.
 */
export function Field({
  id,
  label,
  error,
  hint,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id}>{label}</Label>

      {children}

      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}

      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
