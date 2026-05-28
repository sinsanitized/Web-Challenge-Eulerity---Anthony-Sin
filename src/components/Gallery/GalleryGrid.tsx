import styled from "styled-components";
import { Pet } from "../../types/pet";
import { PetCard } from "../PetCard/PetCard";

type GalleryGridProps = {
  pets: Pet[];
};

const Grid = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export function GalleryGrid({ pets }: GalleryGridProps) {
  return (
    <Grid aria-label="Pet gallery">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </Grid>
  );
}
