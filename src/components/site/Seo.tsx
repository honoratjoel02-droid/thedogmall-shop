import { useEffect } from "react";

import { SITE_URL, type PageMeta } from "../../lib/seo";

/**
 * Applique les métadonnées de la page courante.
 *
 * Les balises sont déjà présentes dans le HTML pré-généré au build (c'est
 * ce que lisent les robots et les aperçus WhatsApp) : ce composant les met
 * simplement à jour lors des navigations internes, où aucune page n'est
 * rechargée.
 */
export default function Seo({ meta }: { meta: PageMeta }) {
  useEffect(() => {
    const url = `${SITE_URL}${meta.path}`;

    document.title = meta.title;

    setMeta("name", "description", meta.description);
    setMeta("name", "robots", meta.noindex ? "noindex, follow" : "index, follow");
    setMeta("property", "og:title", meta.title);
    setMeta("property", "og:description", meta.description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", meta.type ?? "website");
    setMeta("property", "og:image", `${SITE_URL}${meta.image}`);

    setCanonical(url);
    setJsonLd(meta.jsonLd);
  }, [meta]);

  return null;
}

function setMeta(
  keyName: "name" | "property",
  key: string,
  content: string
) {
  const selector = `meta[${keyName}="${key}"]`;
  let tag = document.head.querySelector<HTMLMetaElement>(selector);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(keyName, key);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function setCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );

  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }

  link.href = url;
}

function setJsonLd(blocks: PageMeta["jsonLd"]) {
  document.head
    .querySelectorAll("script[data-seo-jsonld]")
    .forEach((node) => node.remove());

  if (!blocks?.length) return;

  for (const block of blocks) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seoJsonld = "";
    script.textContent = JSON.stringify(block);
    document.head.appendChild(script);
  }
}
