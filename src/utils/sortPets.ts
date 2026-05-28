import { Pet, SortMode } from "../types/pet";

export function sortPets(pets: Pet[], sortMode: SortMode): Pet[] {
  const sortedPets = [...pets];

  switch (sortMode) {
    case "name-asc":
      sortedPets.sort((left, right) => left.title.localeCompare(right.title));
      break;
    case "name-desc":
      sortedPets.sort((left, right) => right.title.localeCompare(left.title));
      break;
    case "date-newest":
      sortedPets.sort(
        (left, right) => right.createdTimestamp - left.createdTimestamp,
      );
      break;
    case "date-oldest":
      sortedPets.sort(
        (left, right) => left.createdTimestamp - right.createdTimestamp,
      );
      break;
  }

  return sortedPets;
}
