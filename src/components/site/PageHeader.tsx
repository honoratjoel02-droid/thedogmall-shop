import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
};

/** En-tête commun aux pages intérieures, pour garder le même rythme. */
export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        {eyebrow && (
          <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            {eyebrow}
          </p>
        )}

        <h1 className="text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl">
          {title}
        </h1>

        {description && (
          <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
            {description}
          </p>
        )}

        {children}
      </div>
    </header>
  );
}
