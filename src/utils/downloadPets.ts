import { Pet } from "../types/pet";

function sanitizeFilename(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export async function downloadPets(
  pets: Pet[],
): Promise<{ downloaded: number; failed: number }> {
  let downloaded = 0;
  let failed = 0;

  await Promise.all(
    pets.map(async (pet) => {
      try {
        const response = await fetch(pet.imageUrl);

        if (!response.ok) {
          failed += 1;
          return;
        }

        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        const anchor = document.createElement("a");

        anchor.href = objectUrl;
        anchor.download = `${sanitizeFilename(pet.title) || pet.id}.jpg`;
        document.body.append(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(objectUrl);
        downloaded += 1;
      } catch {
        failed += 1;
      }
    }),
  );

  return { downloaded, failed };
}
