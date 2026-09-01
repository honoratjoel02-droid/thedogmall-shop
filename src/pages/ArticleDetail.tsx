import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";

import SiteLayout from "../components/site/SiteLayout";
import { articles, findArticle } from "../data/articles";
import { formatArticleDate } from "../lib/format";
import { articleMeta } from "../lib/seo";

export default function ArticleDetail() {
  const { articleId } = useParams();
  const article = findArticle(articleId);

  if (!article) {
    return <Navigate to="/conseils" replace />;
  }

  const otherArticles = articles
    .filter((item) => item.id !== article.id)
    .slice(0, 3);

  return (
    <SiteLayout meta={articleMeta(article)}>
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-16">
        <Link
          to="/conseils"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft
            size={15}
            weight="bold"
            className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-x-1"
          />
          Tous les conseils
        </Link>

        <p className="mt-8 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
          {article.category}
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl">
          {article.title}
        </h1>

        <p className="mt-4 text-lg text-pretty text-muted-foreground">
          {article.excerpt}
        </p>

        <p className="mt-4 text-xs text-muted-foreground">
          Publié le {formatArticleDate(article.publishedAt)} ·{" "}
          {article.readingMinutes} min de lecture
        </p>

        <div className="mt-12 flex flex-col gap-10">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-bold tracking-tight text-balance text-foreground">
                {section.heading}
              </h2>

              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="mt-4 text-pretty text-foreground/80"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </article>

      <aside className="border-t border-border bg-card">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h2 className="text-lg font-semibold text-foreground">
            À lire ensuite
          </h2>

          <ul className="mt-5 flex flex-col divide-y divide-border">
            {otherArticles.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/conseils/${item.id}`}
                  className="flex flex-col gap-1 py-4 transition-colors hover:text-primary"
                >
                  <span className="font-medium text-balance text-foreground">
                    {item.title}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {item.category} · {item.readingMinutes} min
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </SiteLayout>
  );
}
