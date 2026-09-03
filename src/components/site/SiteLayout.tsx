import type { ReactNode } from "react";

import type { PageMeta } from "../../lib/seo";
import Seo from "./Seo";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import PromoBanner from "./PromoBanner";
import CartDrawer from "./CartDrawer";
import MobileTabBar from "./MobileTabBar";
import ScrollManager from "./ScrollManager";

type SiteLayoutProps = {
  children: ReactNode;
  /** Métadonnées de la page, appliquées à chaque navigation interne. */
  meta?: PageMeta;
};

export default function SiteLayout({ children, meta }: SiteLayoutProps) {
  return (
    // `pb-16` réserve la hauteur de la barre d'onglets mobile, fixée en bas.
    <div className="flex min-h-[100dvh] flex-col bg-background pb-16 lg:pb-0">
      <ScrollManager />
      {meta && <Seo meta={meta} />}

      <a
        href="#contenu"
        className="sr-only rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
      >
        Aller au contenu
      </a>

      <PromoBanner />
      <SiteHeader />

      <main id="contenu" className="flex-1">
        {children}
      </main>

      <SiteFooter />
      <CartDrawer />
      <MobileTabBar />
    </div>
  );
}
