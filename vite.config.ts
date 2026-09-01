import { createReadStream, existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

import { SITE_NAME, SITE_URL, type PageMeta } from "./src/lib/seo";
import { allPagesMeta } from "./src/lib/seo-pages";

/** Bloc de `index.html` remplacé page par page. */
const SEO_BLOCK = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/;

const FALLBACK_IMAGE = "/logo.png";

function escapeAttribute(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** `</` échappé : sinon un texte pourrait fermer la balise script. */
function serializeJsonLd(block: Record<string, unknown>) {
  return JSON.stringify(block).replace(/<\//g, "<\\/");
}

function resolveImage(image: string, publicDir: string) {
  const file = path.join(publicDir, image.replace(/^\//, ""));

  return existsSync(file) ? image : FALLBACK_IMAGE;
}

function renderHead(page: PageMeta, publicDir: string) {
  const url = `${SITE_URL}${page.path}`;
  const image = `${SITE_URL}${resolveImage(page.image, publicDir)}`;
  const title = escapeAttribute(page.title);
  const description = escapeAttribute(page.description);

  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${page.noindex ? "noindex, follow" : "index, follow"}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="fr_CI" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:type" content="${page.type ?? "website"}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    // `data-seo-jsonld` : c'est ce marqueur que le composant `Seo` retire
    // avant d'écrire les données de la page suivante, sinon les blocs de la
    // page d'entrée resteraient collés au document pendant la navigation.
    ...(page.jsonLd ?? []).map(
      (block) =>
        `<script type="application/ld+json" data-seo-jsonld>${serializeJsonLd(block)}</script>`
    ),
  ];

  return tags.join("\n    ");
}

function renderSitemap(pages: PageMeta[]) {
  const today = new Date().toISOString().slice(0, 10);

  const entries = pages
    .filter((page) => !page.noindex)
    .map((page) =>
      [
        "  <url>",
        `    <loc>${SITE_URL}${page.path}</loc>`,
        `    <lastmod>${page.updatedAt ?? today}</lastmod>`,
        "  </url>",
      ].join("\n")
    );

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries,
    "</urlset>",
    "",
  ].join("\n");
}

function renderRobots(pages: PageMeta[]) {
  const disallowed = pages
    .filter((page) => page.noindex)
    .map((page) => `Disallow: ${page.path}`);

  return [
    "User-agent: *",
    "Allow: /",
    ...disallowed,
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");
}

/**
 * Le site est une application monopage : sans cette étape, toutes les URL
 * partageraient le titre et l'aperçu de la page d'accueil pour les robots
 * qui n'exécutent pas de JavaScript — dont les aperçus de lien WhatsApp.
 *
 * On écrit donc un fichier HTML par page, identique au bundle mais avec
 * ses propres balises `head`, plus le sitemap et le robots.txt.
 */
function seo(): Plugin {
  return {
    name: "thedogmall:seo",

    /**
     * `vite preview` renvoie `index.html` pour toute URL sans extension :
     * les fichiers pré-générés ne seraient jamais servis, et le site testé
     * en local ne correspondrait pas à celui mis en ligne. On regarde donc
     * d'abord si la page existe sur le disque, comme le font Vercel et
     * Netlify avant d'appliquer leur redirection.
     */
    configurePreviewServer(server) {
      const outDir = path.resolve("dist");

      server.middlewares.use((req, res, next) => {
        const pathname = (req.url ?? "/").split("?")[0];

        if (pathname === "/" || path.extname(pathname)) {
          next();
          return;
        }

        const candidate = path.join(outDir, pathname, "index.html");

        if (!candidate.startsWith(outDir) || !existsSync(candidate)) {
          next();
          return;
        }

        res.setHeader("Content-Type", "text/html; charset=utf-8");
        createReadStream(candidate).pipe(res);
      });
    },

    async closeBundle() {
      const outDir = path.resolve("dist");
      const publicDir = path.resolve("public");
      const indexPath = path.join(outDir, "index.html");

      if (!existsSync(indexPath)) return;

      const template = await readFile(indexPath, "utf8");
      const pages = allPagesMeta();

      for (const page of pages) {
        const html = template.replace(SEO_BLOCK, renderHead(page, publicDir));
        const target =
          page.path === "/"
            ? indexPath
            : path.join(outDir, page.path, "index.html");

        await mkdir(path.dirname(target), { recursive: true });
        await writeFile(target, html, "utf8");
      }

      await writeFile(
        path.join(outDir, "sitemap.xml"),
        renderSitemap(pages),
        "utf8"
      );

      await writeFile(
        path.join(outDir, "robots.txt"),
        renderRobots(pages),
        "utf8"
      );

      this.info(`${pages.length} pages pré-générées, sitemap et robots.txt écrits`);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seo()],
});
