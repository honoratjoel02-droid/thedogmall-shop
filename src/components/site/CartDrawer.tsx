import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash, X } from "@phosphor-icons/react";

import { useCart } from "../../hooks/useCart";
import { buttonVariants } from "../ui/button";
import { cn } from "../../lib/utils";
import ProductImage from "./ProductImage";
import WhatsAppButton from "./WhatsAppButton";
import { formatPrice } from "../../lib/format";
import { cartMessage } from "../../lib/whatsapp";

export default function CartDrawer() {
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
    isDrawerOpen,
    closeDrawer,
  } = useCart();

  useEffect(() => {
    if (!isDrawerOpen) return;

    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeDrawer();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDrawerOpen, closeDrawer]);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Fermer le panier"
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={closeDrawer}
      />

      <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-card shadow-2xl">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <ShoppingBag size={20} />
            Votre panier
          </h2>

          <button
            type="button"
            aria-label="Fermer le panier"
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
            })}
            onClick={closeDrawer}
          >
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
            <ShoppingBag size={48} weight="duotone" className="text-muted-foreground" />
            <p className="font-medium text-foreground">
              Votre panier est vide
            </p>
            <Link
              to="/boutique"
              onClick={closeDrawer}
              className={buttonVariants({ className: "mt-2" })}
            >
              Voir les produits
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-5">
              <ul className="flex flex-col gap-4">
                {items.map((item) => (
                  <li
                    key={item.product.id}
                    className="flex items-center gap-3"
                  >
                    <Link
                      to={`/boutique/${item.product.id}`}
                      onClick={closeDrawer}
                      className="block size-16 shrink-0 overflow-hidden rounded-xl"
                    >
                      <ProductImage
                        product={item.product}
                        className="size-16 rounded-xl"
                        iconSize={24}
                      />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/boutique/${item.product.id}`}
                        onClick={closeDrawer}
                        className="truncate text-sm font-semibold text-foreground hover:text-primary"
                      >
                        {item.product.name}
                      </Link>

                      <p className="text-sm text-muted-foreground">
                        {formatPrice(item.product.price)}
                      </p>

                      <div className="mt-1.5 flex items-center rounded-lg border border-input">
                        <button
                          type="button"
                          aria-label="Diminuer la quantité"
                          className="flex size-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                        >
                          <Minus size={12} />
                        </button>

                        <span className="w-6 text-center text-xs font-medium text-foreground">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          aria-label="Augmenter la quantité"
                          className="flex size-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="text-sm font-semibold text-foreground">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>

                      <button
                        type="button"
                        aria-label="Retirer du panier"
                        className="text-muted-foreground transition-colors hover:text-destructive"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-border p-5">
              <div className="mb-4 flex items-center justify-between text-base font-bold text-foreground">
                <span>Sous-total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  to="/commande"
                  onClick={closeDrawer}
                  className={buttonVariants({
                    size: "lg",
                    className: "h-11 w-full",
                  })}
                >
                  Passer la commande
                </Link>

                <WhatsAppButton
                  size="lg"
                  className="h-11 w-full"
                  message={cartMessage(items, subtotal)}
                />

                <Link
                  to="/panier"
                  onClick={closeDrawer}
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "lg",
                      className: "h-11 w-full border-transparent bg-transparent",
                    })
                  )}
                >
                  Voir le panier
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
