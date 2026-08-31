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
    <div className="flex min-h-screen flex-col bg-background">
      <PromoBanner />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CartDrawer />
    </div>
  );
}
