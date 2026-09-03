/**
 * Envoi des formulaires.
 *
 * Le site est hébergé en statique : il n'a pas de serveur pour recevoir
 * un message. `VITE_FORM_ENDPOINT` désigne un service qui s'en charge et
 * transmet chaque envoi par email. Certains services (Web3Forms) veulent
 * en plus une clé dans le corps de la requête : `VITE_FORM_ACCESS_KEY`.
 * Voir `.env.example`.
 *
 * Tant qu'aucun service n'est configuré, les formulaires basculent sur
 * WhatsApp plutôt que d'annoncer un envoi qui n'a pas lieu.
 */
const endpoint = import.meta.env.VITE_FORM_ENDPOINT?.trim();
const accessKey = import.meta.env.VITE_FORM_ACCESS_KEY?.trim();

export const formsAreConnected = Boolean(endpoint);

export type FormPayload = Record<string, string>;

export async function submitForm(subject: string, payload: FormPayload) {
  if (!endpoint) {
    throw new Error("Aucun service d'envoi n'est configuré.");
  }

  let response: Response;

  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        // Champs attendus par les services courants : `_subject` sert
        // d'objet chez Formspree, `access_key` identifie le formulaire
        // chez Web3Forms.
        _subject: subject,
        subject,
        ...(accessKey ? { access_key: accessKey } : {}),
        ...payload,
      }),
    });
  } catch {
    // Coupure réseau, DNS, service injoignable : `fetch` rejette sans
    // réponse, il n'y a pas de code d'état à montrer.
    throw new Error(
      "Impossible de joindre le service d'envoi. Vérifiez votre connexion, ou passez par WhatsApp."
    );
  }

  if (!response.ok) {
    throw new Error(
      `Le service d'envoi a répondu ${response.status}. Réessayez, ou passez par WhatsApp.`
    );
  }
}
