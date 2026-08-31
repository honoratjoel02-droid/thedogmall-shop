import type { ReactNode } from "react";

import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import PromoBanner from "./PromoBanner";
import CartDrawer from "./CartDrawer";

type SiteLayoutProps = {
  children: ReactNode;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <a
        href="#contenu"
        className="sr-only rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
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
    </div>
  );
}
