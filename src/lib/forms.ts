/**
 * Envoi des formulaires.
 *
 * Le site est hébergé en statique : il n'a pas de serveur pour recevoir
 * un message. `VITE_FORM_ENDPOINT` désigne un service qui s'en charge
 * (Formspree, Web3Forms, une fonction serverless...) et transmet chaque
 * envoi par email. Voir `.env.example`.
 *
 * Tant qu'aucun service n'est configuré, les formulaires basculent sur
 * WhatsApp plutôt que d'annoncer un envoi qui n'a pas lieu.
 */
const endpoint = import.meta.env.VITE_FORM_ENDPOINT?.trim();

export const formsAreConnected = Boolean(endpoint);

export type FormPayload = Record<string, string>;

export async function submitForm(subject: string, payload: FormPayload) {
  if (!endpoint) {
    throw new Error("Aucun service d'envoi n'est configuré.");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ _subject: subject, ...payload }),
  });

  if (!response.ok) {
    throw new Error(
      `Le service d'envoi a répondu ${response.status}. Réessayez ou passez par WhatsApp.`
    );
  }
}
