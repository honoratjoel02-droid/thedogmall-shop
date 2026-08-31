import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  List,
  MagnifyingGlass,
  ShoppingCart,
  X,
} from "@phosphor-icons/react";

import { useCart } from "../../hooks/useCart";
import { buttonVariants } from "../ui/button";
import { cn } from "../../lib/utils";
import Logo from "./Logo";

const navItems = [
  { label: "Accueil", path: "/", end: true },
  { label: "Produits", path: "/produits", end: false },
  { label: "À propos", path: "/a-propos", end: false },
  { label: "Contact", path: "/contact", end: false },
];

export default function SiteHeader() {
  const { itemCount, openDrawer } = useCart();
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
        ? `/produits?recherche=${encodeURIComponent(trimmed)}`
        : "/produits"
    );
    setSearchOpen(false);
    setSearchTerm("");
  }

  return (
    <>
      <div ref={sentinel} aria-hidden="true" />

      <header
        className={cn(
          "sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur transition-shadow",
          scrolled && "shadow-sm"
        )}
      >
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-6">
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>

          <nav
            aria-label="Navigation principale"
            className="hidden items-center gap-8 md:flex"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground"
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <div className="hidden items-center md:flex">
              {searchOpen ? (
                <form
                  onSubmit={handleSearchSubmit}
                  role="search"
                  className="flex items-center overflow-hidden rounded-lg border border-input bg-background pl-3"
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
                    onChange={(event) =>
                      setSearchTerm(event.target.value)
                    }
                    onBlur={() =>
                      !searchTerm && setSearchOpen(false)
                    }
                    placeholder="Rechercher un produit..."
                    className="h-9 w-48 bg-transparent px-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
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

              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              type="button"
              aria-label="Ouvrir le menu"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "md:hidden"
              )}
              onClick={() => setMobileOpen(true)}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Fermer le menu"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 flex w-3/4 max-w-xs flex-col bg-card shadow-lg">
            <div className="flex items-center justify-between border-b border-border p-4">
              <span className="font-semibold text-foreground">
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
              className="flex items-center gap-2 border-b border-border p-4"
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

            <nav aria-label="Navigation principale" className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-accent text-primary"
                        : "text-foreground/70 hover:bg-muted hover:text-foreground"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
