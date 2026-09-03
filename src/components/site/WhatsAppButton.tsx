import { WhatsappLogo } from "@phosphor-icons/react";

import { buttonVariants } from "../ui/button";
import { whatsAppLink } from "../../lib/whatsapp";
import { cn } from "../../lib/utils";

type WhatsAppButtonProps = {
  /** Texte déjà rédigé, pré-rempli dans la conversation. */
  message: string;
  label?: string;
  variant?: "default" | "outline" | "secondary";
  size?: "default" | "sm" | "lg";
  className?: string;
};

export default function WhatsAppButton({
  message,
  label = "Commander sur WhatsApp",
  variant = "outline",
  size = "default",
  className,
}: WhatsAppButtonProps) {
  return (
    <a
      href={whatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(buttonVariants({ variant, size }), className)}
    >
      <WhatsappLogo size={size === "lg" ? 19 : 17} weight="fill" />
      {label}
    </a>
  );
}
