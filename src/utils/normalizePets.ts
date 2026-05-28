import { ApiPet, Pet } from "../types/pet";

const fallbackDate = new Date(0);

function normalizeImageUrl(value: string): string {
  try {
    const url = new URL(value);

    if (url.searchParams.get("format") === "tiny") {
      url.searchParams.delete("format");
    }

    return url.toString();
  } catch {
    return value;
  }
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function hashString(value: string): string {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash.toString(36);
}

export function normalizePets(apiPets: ApiPet[]): Pet[] {
  const duplicateCounts = new Map<string, number>();

  return apiPets.map((pet) => {
    const title = pet.title?.trim() || "Untitled pet";
    const description = pet.description?.trim() || "No description provided.";
    const imageUrl = normalizeImageUrl(pet.url?.trim() || "");
    const createdLabel = pet.created?.trim() || "Unknown date";

    const createdAt = pet.created ? new Date(pet.created) : fallbackDate;
    const safeDate = Number.isNaN(createdAt.getTime()) ? fallbackDate : createdAt;

    const baseId = `${slugify(title)}-${hashString(
      `${title}|${description}|${imageUrl}|${createdLabel}`,
    )}`;
    const occurrence = duplicateCounts.get(baseId) ?? 0;
    duplicateCounts.set(baseId, occurrence + 1);

    return {
      id: occurrence === 0 ? baseId : `${baseId}-${occurrence}`,
      title,
      description,
      imageUrl,
      createdAt: safeDate,
      createdLabel,
      createdTimestamp: safeDate.getTime(),
    };
  });
}
