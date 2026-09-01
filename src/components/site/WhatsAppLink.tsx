import { WhatsappLogo } from "@phosphor-icons/react";

import { whatsAppLink } from "../../lib/whatsapp";
import { cn } from "../../lib/utils";

type WhatsAppLinkProps = {
  message: string;
  label?: string;
  className?: string;
  iconSize?: number;
};

/** Version discrète, pour les blocs de coordonnées. */
export default function WhatsAppLink({
  message,
  label = "WhatsApp",
  className,
  iconSize = 18,
}: WhatsAppLinkProps) {
  return (
    <a
      href={whatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("flex items-center gap-2 transition-colors", className)}
    >
      <WhatsappLogo size={iconSize} className="shrink-0" />
      {label}
    </a>
  );
}
