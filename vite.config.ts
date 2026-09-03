import { createReadStream, existsSync } from "node:fs";
import path from "node:path";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

/**
 * `vite preview` renvoie `index.html` pour toute URL sans extension : les
 * pages écrites par `scripts/prerender.mjs` ne seraient jamais servies, et
 * le site testé en local ne correspondrait pas à celui mis en ligne. On
 * regarde donc d'abord si la page existe sur le disque, comme le font
 * Vercel et Netlify avant d'appliquer leur redirection.
 */
function servePrerenderedPages(): Plugin {
  return {
    name: "thedogmall:prerendered-preview",

    configurePreviewServer(server) {
      const outDir = path.resolve("dist");

      server.middlewares.use((req, res, next) => {
        const pathname = (req.url ?? "/").split("?")[0];

        if (pathname === "/" || path.extname(pathname)) {
          next();
          return;
        }

        const candidate = path.join(outDir, pathname, "index.html");
        const inside = candidate.startsWith(outDir);
        const notFound = path.join(outDir, "404.html");

        // Page connue, sinon la coquille vide : c'est ce que sert
        // l'hébergeur, dont la redirection de secours vise `404.html`.
        const file = inside && existsSync(candidate) ? candidate : notFound;

        if (!existsSync(file)) {
          next();
          return;
        }

        res.statusCode = file === notFound ? 404 : 200;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        createReadStream(file).pipe(res);
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), servePrerenderedPages()],
});
