import raw from "../../content/articles.json";
import type { Article, ArticleSection } from "../types/article";
import {
  isoDate,
  parseAll,
  record,
  text,
  textList,
  wholeNumber,
  type Where,
} from "./validate";

function parseSections(value: unknown, where: Where): ArticleSection[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(
      `${where.file} → entrée ${where.index + 1} (« ${where.id} ») : le champ « sections » doit être une liste d'au moins une section.`
    );
  }

  return value.map((section) => {
    const source = record(section, where);

    return {
      heading: text(source, "heading", where),
      paragraphs: textList(source, "paragraphs", where),
    };
  });
}

export const articles: Article[] = parseAll(
  raw,
  "content/articles.json",
  (source, where) => ({
    id: text(source, "id", where),
    title: text(source, "title", where),
    excerpt: text(source, "excerpt", where),
    category: text(source, "category", where),
    publishedAt: isoDate(source, "publishedAt", where),
    readingMinutes: wholeNumber(source, "readingMinutes", where),
    sections: parseSections(source.sections, where),
  })
);

export function findArticle(articleId: string | undefined) {
  return articles.find((article) => article.id === articleId);
}
