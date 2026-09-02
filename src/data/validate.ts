/**
 * Contrôle des fichiers de `content/`.
 *
 * Ces fichiers sont faits pour être modifiés à la main, y compris depuis
 * l'interface de GitHub. Le contrôle tourne au moment du build (le
 * générateur de pages les importe) : une entrée mal formée arrête la
 * compilation avec un message qui dit quoi corriger, au lieu de passer en
 * ligne et de casser une page.
 */

type Where = { file: string; index: number; id?: string };

function fail(where: Where, message: string): never {
  const entry = where.id
    ? `entrée ${where.index + 1} (« ${where.id} »)`
    : `entrée ${where.index + 1}`;

  throw new Error(`${where.file} → ${entry} : ${message}`);
}

function record(value: unknown, where: Where): Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    fail(where, "l'entrée doit être un objet entre accolades.");
  }

  return value as Record<string, unknown>;
}

function text(
  source: Record<string, unknown>,
  field: string,
  where: Where
): string {
  const value = source[field];

  if (typeof value !== "string" || !value.trim()) {
    fail(where, `le champ « ${field} » doit être un texte non vide.`);
  }

  return value;
}

function optionalText(
  source: Record<string, unknown>,
  field: string,
  where: Where
): string | undefined {
  return source[field] === undefined ? undefined : text(source, field, where);
}

function wholeNumber(
  source: Record<string, unknown>,
  field: string,
  where: Where
): number {
  const value = source[field];

  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
    fail(
      where,
      `le champ « ${field} » doit être un nombre entier positif, sans espace ni « FCFA ».`
    );
  }

  return value;
}

function among<T extends string>(
  source: Record<string, unknown>,
  field: string,
  allowed: readonly T[],
  where: Where
): T {
  const value = source[field];

  if (typeof value !== "string" || !allowed.includes(value as T)) {
    fail(
      where,
      `le champ « ${field} » doit valoir ${allowed.map((item) => `« ${item} »`).join(", ")}.`
    );
  }

  return value as T;
}

function optionalAmong<T extends string>(
  source: Record<string, unknown>,
  field: string,
  allowed: readonly T[],
  where: Where
): T | undefined {
  return source[field] === undefined
    ? undefined
    : among(source, field, allowed, where);
}

function textList(
  source: Record<string, unknown>,
  field: string,
  where: Where
): string[] {
  const value = source[field];

  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    value.some((item) => typeof item !== "string" || !item.trim())
  ) {
    fail(
      where,
      `le champ « ${field} » doit être une liste de textes, entre crochets.`
    );
  }

  return value as string[];
}

function optionalTextList(
  source: Record<string, unknown>,
  field: string,
  where: Where
): string[] | undefined {
  return source[field] === undefined
    ? undefined
    : textList(source, field, where);
}

function flag(
  source: Record<string, unknown>,
  field: string,
  where: Where
): boolean | undefined {
  const value = source[field];

  if (value === undefined) return undefined;

  if (typeof value !== "boolean") {
    fail(where, `le champ « ${field} » doit valoir true ou false.`);
  }

  return value;
}

function isoDate(
  source: Record<string, unknown>,
  field: string,
  where: Where
): string {
  const value = text(source, field, where);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value))) {
    fail(where, `le champ « ${field} » doit être une date au format 2026-08-19.`);
  }

  return value;
}

function list(value: unknown, file: string): unknown[] {
  if (!Array.isArray(value)) {
    throw new Error(`${file} → le fichier doit contenir une liste entre crochets.`);
  }

  if (value.length === 0) {
    throw new Error(`${file} → le fichier est vide.`);
  }

  return value;
}

function requireUniqueIds(ids: string[], file: string) {
  const seen = new Set<string>();

  for (const id of ids) {
    if (seen.has(id)) {
      throw new Error(
        `${file} → l'identifiant « ${id} » apparaît deux fois. Chaque entrée doit avoir le sien : il sert d'adresse de page.`
      );
    }

    seen.add(id);
  }
}

function requireSlug(id: string, where: Where) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id)) {
    fail(
      where,
      `l'identifiant « ${id} » doit être en minuscules sans accent, les mots séparés par des tirets (exemple : « chow-chow-roy »). Il sert d'adresse de page.`
    );
  }
}

/** Parcourt une liste en produisant un message d'erreur situé. */
function parseAll<T extends { id: string }>(
  value: unknown,
  file: string,
  parseOne: (source: Record<string, unknown>, where: Where) => T
): T[] {
  const entries = list(value, file).map((entry, index) => {
    const where: Where = { file, index };
    const source = record(entry, where);
    const id = text(source, "id", where);

    where.id = id;
    requireSlug(id, where);

    return parseOne(source, where);
  });

  requireUniqueIds(
    entries.map((entry) => entry.id),
    file
  );

  return entries;
}

export { among, flag, isoDate, optionalAmong, optionalText, optionalTextList, parseAll, record, text, textList, wholeNumber };
export type { Where };
