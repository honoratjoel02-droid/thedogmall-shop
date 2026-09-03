import { NavLink } from "react-router-dom";

import { useCart } from "../../hooks/useCart";
import { mobileTabs } from "../../lib/navigation";
import { cn } from "../../lib/utils";

/**
 * Barre d'onglets fixe, visible uniquement sur mobile et tablette.
 * `SiteLayout` réserve la hauteur correspondante en bas de page.
 */
export default function MobileTabBar() {
  const { itemCount } = useCart();

  return (
    <nav
      aria-label="Navigation mobile"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
    >
      <ul className="mx-auto flex max-w-md">
        {mobileTabs.map((tab) => {
          const Icon = tab.icon;

          return (
            <li key={tab.to} className="flex-1">
              <NavLink
                to={tab.to}
                end={tab.end}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center gap-1 px-1 py-2.5 text-[11px] font-medium transition-colors duration-300",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative">
                      <Icon
                        size={22}
                        weight={isActive ? "fill" : "regular"}
                      />

                      {tab.to === "/panier" && itemCount > 0 && (
                        <span className="absolute -top-1 -right-2 flex min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] leading-4 font-semibold text-primary-foreground tabular-nums">
                          {itemCount > 9 ? "9+" : itemCount}
                        </span>
                      )}
                    </span>

                    {tab.label}
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
