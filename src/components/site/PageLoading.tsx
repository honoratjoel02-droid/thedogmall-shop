import type { PageMeta } from "../../lib/seo";
import SiteLayout from "./SiteLayout";

/**
 * Écran d'attente pendant le téléchargement du code d'une page. L'en-tête,
 * le pied de page et la barre d'onglets sont déjà là : seule la zone de
 * contenu est remplacée, ce qui évite un écran blanc.
 */
export default function PageLoading({ meta }: { meta?: PageMeta }) {
  return (
    <SiteLayout meta={meta}>
      <div
        aria-busy="true"
        aria-live="polite"
        className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24"
      >
        <span className="sr-only">Chargement de la page…</span>

        <div className="h-9 w-2/3 max-w-sm animate-pulse rounded-2xl bg-muted" />
        <div className="mt-4 h-5 w-full max-w-md animate-pulse rounded-xl bg-muted" />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="aspect-4/5 animate-pulse rounded-3xl bg-muted"
            />
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
