import { useEffect, useState, type FormEvent } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingCart, X } from "lucide-react";

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
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
      <header
        className={cn(
          "sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur transition-shadow",
          scrolled && "shadow-sm"
        )}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
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
                  className="flex items-center overflow-hidden rounded-full border border-input bg-background pl-3 transition-all"
                >
                  <Search
                    size={16}
                    className="shrink-0 text-muted-foreground"
                  />
                  <input
                    autoFocus
                    type="text"
                    value={searchTerm}
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
                  <Search size={20} />
                </button>
              )}
            </div>

            <button
              type="button"
              aria-label="Voir le panier"
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
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Fermer le menu"
            className="absolute inset-0 bg-black/20"
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
              className="flex items-center gap-2 border-b border-border p-4"
            >
              <Search size={16} className="shrink-0 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Rechercher..."
                className="h-9 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </form>

            <nav className="flex flex-col gap-1 p-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
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
