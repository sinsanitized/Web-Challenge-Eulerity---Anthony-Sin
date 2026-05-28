export type ApiPet = {
  title?: string;
  description?: string;
  url?: string;
  created?: string;
};

export type Pet = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  createdLabel: string;
  createdTimestamp: number;
};

export type SortMode =
  | "name-asc"
  | "name-desc"
  | "date-newest"
  | "date-oldest";
