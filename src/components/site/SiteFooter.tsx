import { Link } from "react-router-dom";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react";

import Logo from "./Logo";

const navLinks = [
  { label: "Produits", to: "/produits" },
  { label: "À propos", to: "/a-propos" },
  { label: "Contact", to: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />

          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Alimentation, jouets et accessoires choisis pour le
            bien-être de votre chien.
          </p>
        </div>

        <nav aria-label="Pied de page">
          <h2 className="text-sm font-semibold text-foreground">
            Navigation
          </h2>

          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-foreground">
            Nous joindre
          </h2>

          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              <a
                href="mailto:contact@thedogmall.fr"
                className="flex items-center gap-2 hover:text-foreground"
              >
                <EnvelopeSimple size={16} className="shrink-0" />
                contact@thedogmall.fr
              </a>
            </li>
            <li>
              <a
                href="tel:+33123456789"
                className="flex items-center gap-2 hover:text-foreground"
              >
                <Phone size={16} className="shrink-0" />
                01 23 45 67 89
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="shrink-0" />
              12 rue des Chiots, 75000 Paris
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-6 py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} TheDogMall</p>

          <ul className="flex items-center gap-5">
            <li>
              <Link to="/mentions-legales" className="hover:text-foreground">
                Mentions légales
              </Link>
            </li>
            <li>
              <Link to="/confidentialite" className="hover:text-foreground">
                Confidentialité
              </Link>
            </li>
            <li>
              <Link to="/cgv" className="hover:text-foreground">
                CGV
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
