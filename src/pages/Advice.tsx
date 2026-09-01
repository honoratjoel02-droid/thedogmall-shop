import { Link } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";

import SiteLayout from "../components/site/SiteLayout";
import PageHeader from "../components/site/PageHeader";
import Reveal from "../components/site/Reveal";
import { articles } from "../data/articles";
import { formatArticleDate } from "../lib/format";

export default function Advice() {
  const [lead, ...rest] = articles;

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Conseils & actualités"
        title="Comprendre son chien, choisir ce qui lui convient"
        description="Des repères pratiques écrits à partir des questions qu'on nous pose en boutique."
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
        <Reveal>
          <Link
            to={`/conseils/${lead.id}`}
            className="group flex flex-col gap-4 rounded-3xl bg-card p-6 ring-1 ring-border transition-colors duration-300 hover:bg-accent sm:p-10"
          >
            <span className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
              {lead.category}
            </span>

            <h2 className="max-w-2xl text-2xl font-bold tracking-tight text-balance text-foreground sm:text-3xl">
              {lead.title}
            </h2>

            <p className="max-w-xl text-pretty text-muted-foreground">
              {lead.excerpt}
            </p>

            <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
              Lire l'article
              <ArrowRight
                size={15}
                weight="bold"
                className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1"
              />
            </span>

            <span className="text-xs text-muted-foreground">
              {formatArticleDate(lead.publishedAt)} · {lead.readingMinutes} min
              de lecture
            </span>
          </Link>
        </Reveal>

        <Reveal>
          <ul className="mt-10 grid gap-x-8 gap-y-px overflow-hidden sm:grid-cols-2">
            {rest.map((article) => (
              <li key={article.id} className="border-t border-border">
                <Link
                  to={`/conseils/${article.id}`}
                  className="group flex flex-col gap-2 py-8"
                >
                  <span className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                    {article.category}
                  </span>

                  <h2 className="text-lg font-semibold text-balance text-foreground transition-colors group-hover:text-primary">
                    {article.title}
                  </h2>

                  <p className="text-pretty text-muted-foreground">
                    {article.excerpt}
                  </p>

                  <span className="mt-1 text-xs text-muted-foreground">
                    {formatArticleDate(article.publishedAt)} ·{" "}
                    {article.readingMinutes} min de lecture
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </SiteLayout>
  );
}
