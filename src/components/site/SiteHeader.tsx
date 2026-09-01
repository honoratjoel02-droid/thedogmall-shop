import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Heart,
  List,
  MagnifyingGlass,
  ShoppingCart,
  UserCircle,
  X,
} from "@phosphor-icons/react";

import { useCart } from "../../hooks/useCart";
import { useFavorites } from "../../hooks/useFavorites";
import { buttonVariants } from "../ui/button";
import { cn } from "../../lib/utils";
import { mainNav } from "../../lib/navigation";
import Logo from "./Logo";

export default function SiteHeader() {
  const { itemCount, openDrawer } = useCart();
  const { favoriteCount } = useFavorites();
  const navigate = useNavigate();
  const sentinel = useRef<HTMLDivElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const node = sentinel.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function handleSearchSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = searchTerm.trim();
    navigate(
      trimmed
        ? `/boutique?recherche=${encodeURIComponent(trimmed)}`
        : "/boutique"
    );
    setSearchOpen(false);
    setSearchTerm("");
  }

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative py-1 text-sm font-medium transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.32,0.72,0,1)] hover:after:scale-x-100",
      isActive
        ? "text-primary after:scale-x-100"
        : "text-foreground/70 hover:text-foreground"
    );

  return (
    <>
      <div ref={sentinel} aria-hidden="true" />

      <header
        className={cn(
          "sticky top-0 z-30 border-b border-border bg-card/95 backdrop-blur transition-shadow duration-500",
          scrolled && "shadow-[0_10px_30px_-24px_var(--foreground)]"
        )}
      >
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20">
          <Link to="/" aria-label="THE DOG MALL, accueil" className="shrink-0">
            <Logo className="h-11 lg:h-13" />
          </Link>

          <nav
            aria-label="Navigation principale"
            className="hidden items-center gap-7 lg:flex"
          >
            {mainNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={navLinkClasses}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-0.5">
            <div className="hidden items-center md:flex">
              {searchOpen ? (
                <form
                  onSubmit={handleSearchSubmit}
                  role="search"
                  className="flex items-center overflow-hidden rounded-full border border-input bg-background pl-3.5"
                >
                  <MagnifyingGlass
                    size={16}
                    className="shrink-0 text-muted-foreground"
                  />
                  <input
                    autoFocus
                    type="search"
                    value={searchTerm}
                    aria-label="Rechercher un produit"
                    onChange={(event) => setSearchTerm(event.target.value)}
                    onBlur={() => !searchTerm && setSearchOpen(false)}
                    placeholder="Rechercher un produit..."
                    className="h-9 w-44 bg-transparent px-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                  />
                </form>
              ) : (
                <button
                  type="button"
                  aria-label="Rechercher"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  })}
                  onClick={() => setSearchOpen(true)}
                >
                  <MagnifyingGlass size={20} />
                </button>
              )}
            </div>

            <Link
              to="/favoris"
              aria-label={
                favoriteCount > 0
                  ? `Voir mes favoris, ${favoriteCount} élément${favoriteCount > 1 ? "s" : ""}`
                  : "Voir mes favoris"
              }
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "relative hidden sm:inline-flex"
              )}
            >
              <Heart size={20} />
              {favoriteCount > 0 && <CountBadge value={favoriteCount} />}
            </Link>

            <button
              type="button"
              aria-label={
                itemCount > 0
                  ? `Voir le panier, ${itemCount} article${itemCount > 1 ? "s" : ""}`
                  : "Voir le panier"
              }
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "relative"
              )}
              onClick={openDrawer}
            >
              <ShoppingCart size={20} />
              {itemCount > 0 && <CountBadge value={itemCount} />}
            </button>

            <Link
              to="/compte"
              aria-label="Mon compte"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "hidden lg:inline-flex"
              )}
            >
              <UserCircle size={20} />
            </Link>

            <button
              type="button"
              aria-label="Ouvrir le menu"
              aria-expanded={mobileOpen}
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "lg:hidden"
              )}
              onClick={() => setMobileOpen(true)}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Fermer le menu"
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setMobileOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 flex w-4/5 max-w-xs flex-col bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-3.5">
              <span className="text-sm font-semibold tracking-wide text-foreground uppercase">
                Menu
              </span>

              <button
                type="button"
                aria-label="Fermer le menu"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })}
                onClick={() => setMobileOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={(event) => {
                handleSearchSubmit(event);
                setMobileOpen(false);
              }}
              role="search"
              className="flex items-center gap-2 border-b border-border px-4 py-3"
            >
              <MagnifyingGlass
                size={16}
                className="shrink-0 text-muted-foreground"
              />
              <input
                type="search"
                value={searchTerm}
                aria-label="Rechercher un produit"
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Rechercher..."
                className="h-9 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </form>

            <nav
              aria-label="Navigation principale"
              className="flex flex-col gap-0.5 overflow-y-auto p-3"
            >
              {mainNav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-foreground/70 hover:bg-muted hover:text-foreground"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-0.5 border-t border-border p-3">
              <Link
                to="/favoris"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
              >
                <Heart size={18} />
                Mes favoris
                {favoriteCount > 0 && (
                  <span className="ml-auto text-xs font-semibold text-primary">
                    {favoriteCount}
                  </span>
                )}
              </Link>

              <Link
                to="/compte"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
              >
                <UserCircle size={18} />
                Mon compte
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function CountBadge({ value }: { value: number }) {
  return (
    <span className="absolute -top-0.5 -right-0.5 flex size-4.5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground tabular-nums">
      {value > 9 ? "9+" : value}
    </span>
  );
}
