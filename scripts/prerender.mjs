/**
 * Génère un fichier HTML complet par page.
 *
 * Le site est une application monopage : sans cette étape, chaque URL
 * servirait la même page vide, remplie ensuite par le navigateur. Les
 * robots qui n'exécutent pas de JavaScript — dont les aperçus de lien
 * WhatsApp — n'y verraient rien, et un visiteur en connexion lente
 * regarderait un écran vide le temps du téléchargement.
 *
 * On écrit donc le contenu réel de chaque page, ses balises `head`, ses
 * données structurées, plus le sitemap et le robots.txt.
 */
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const outDir = path.resolve("dist");
const publicDir = path.resolve("public");
const serverEntry = path.resolve("dist-ssr/entry-server.js");

const SEO_BLOCK = /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/;
const ROOT_DIV = '<div id="root"></div>';
const FALLBACK_IMAGE = "/logo.png";

const { allPagesMeta, render, SITE_NAME, SITE_URL } = await import(
  pathToFileURL(serverEntry).href
);

function escapeAttribute(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** `</` échappé : sinon un texte pourrait fermer la balise script. */
function serializeJsonLd(block) {
  return JSON.stringify(block).replace(/<\//g, "<\\/");
}

function resolveImage(image) {
  const file = path.join(publicDir, image.replace(/^\//, ""));

  return existsSync(file) ? image : FALLBACK_IMAGE;
}

function renderHead(page) {
  const url = `${SITE_URL}${page.path}`;
  const image = `${SITE_URL}${resolveImage(page.image)}`;
  const title = escapeAttribute(page.title);
  const description = escapeAttribute(page.description);

  return [
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
    // `data-seo-jsonld` : marqueur que le composant `Seo` retire avant
    // d'écrire les données de la page suivante, sinon les blocs de la page
    // d'entrée resteraient collés au document pendant la navigation.
    ...(page.jsonLd ?? []).map(
      (block) =>
        `<script type="application/ld+json" data-seo-jsonld>${serializeJsonLd(block)}</script>`
    ),
  ].join("\n    ");
}

function renderSitemap(pages) {
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

function renderRobots(pages) {
  return [
    "User-agent: *",
    "Allow: /",
    ...pages
      .filter((page) => page.noindex)
      .map((page) => `Disallow: ${page.path}`),
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");
}

const indexPath = path.join(outDir, "index.html");
const template = await readFile(indexPath, "utf8");

if (!SEO_BLOCK.test(template) || !template.includes(ROOT_DIV)) {
  throw new Error(
    "index.html ne contient plus les repères attendus (<!-- seo:start --> ou <div id=\"root\"></div>)."
  );
}

const pages = allPagesMeta();

for (const page of pages) {
  const body = await render(page.path);

  const html = template
    .replace(SEO_BLOCK, renderHead(page))
    .replace(ROOT_DIV, `<div id="root">${body}</div>`);

  const target =
    page.path === "/"
      ? indexPath
      : path.join(outDir, page.path, "index.html");

  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html, "utf8");
}

/*
 * Coquille vide servie aux adresses qui n'existent pas. Sans elle, la
 * redirection de l'hébergeur renverrait `index.html` — donc le contenu de
 * l'accueil — avant que le navigateur n'affiche la page « introuvable ».
 */
await writeFile(
  path.join(outDir, "404.html"),
  template.replace(
    SEO_BLOCK,
    renderHead({
      path: "/404",
      title: `Page introuvable | ${SITE_NAME}`,
      description:
        "Cette page n'existe pas ou a été déplacée. Retrouvez nos chiens et notre boutique depuis l'accueil.",
      image: FALLBACK_IMAGE,
      noindex: true,
    })
  ),
  "utf8"
);

await writeFile(path.join(outDir, "sitemap.xml"), renderSitemap(pages), "utf8");
await writeFile(path.join(outDir, "robots.txt"), renderRobots(pages), "utf8");

console.log(
  `${pages.length} pages générées avec leur contenu, plus 404.html, sitemap.xml et robots.txt`
);
