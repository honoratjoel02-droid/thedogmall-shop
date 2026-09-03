export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  /** Date au format `2026-08-19`. */
  publishedAt: string;
  readingMinutes: number;
  sections: ArticleSection[];
};
