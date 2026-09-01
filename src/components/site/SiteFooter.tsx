import { Link } from "react-router-dom";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react";

import { footerNav } from "../../lib/navigation";
import { contactDetails } from "../../lib/contact";
import { generalMessage } from "../../lib/whatsapp";
import WhatsAppLink from "./WhatsAppLink";
import Logo from "./Logo";

const columns = [
  { title: "Navigation", links: footerNav.navigation },
  { title: "Assistance", links: footerNav.assistance },
  { title: "Informations", links: footerNav.informations },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-8 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo className="h-12" />

          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Tout pour votre compagnon, au même endroit.
          </p>
        </div>

        {columns.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="text-sm font-semibold text-foreground">
              {column.title}
            </h2>

            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {column.links.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div>
          <h2 className="text-sm font-semibold text-foreground">Contact</h2>

          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              <a
                href={contactDetails.phoneHref}
                className="flex items-start gap-2 transition-colors hover:text-foreground"
              >
                <Phone size={16} className="mt-0.5 shrink-0" />
                {contactDetails.phone}
              </a>
            </li>

            <li>
              <a
                href={`mailto:${contactDetails.email}`}
                className="flex items-start gap-2 transition-colors hover:text-foreground"
              >
                <EnvelopeSimple size={16} className="mt-0.5 shrink-0" />
                {contactDetails.email}
              </a>
            </li>

            <li>
              <WhatsAppLink
                message={generalMessage}
                className="items-start gap-2 hover:text-foreground [&>svg]:mt-0.5"
                iconSize={16}
              />
            </li>

            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              {contactDetails.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} THE DOG MALL — Abidjan, Côte
          d'Ivoire
        </p>
      </div>
    </footer>
  );
}
