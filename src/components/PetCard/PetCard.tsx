import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelection } from "../../context/SelectionContext";
import { Pet } from "../../types/pet";

type PetCardProps = {
  pet: Pet;
};

const Card = styled.article<{ $selected: boolean }>`
  position: relative;
  overflow: hidden;
  min-height: 27rem;
  border: 1px solid
    ${({ theme, $selected }) =>
      $selected ? theme.colors.accent : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow:
    0 16px 32px ${({ theme }) => theme.colors.shadow},
    ${({ $selected }) =>
      $selected ? "0 0 0 4px rgba(198, 92, 57, 0.12)" : "none"};
  transform: translateY(0);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    border-color 180ms ease,
    background 180ms ease;

  &:hover {
    transform: translateY(-3px);
    background: rgba(255, 250, 242, 0.98);
  }

  &:focus-within {
    box-shadow:
      0 16px 32px ${({ theme }) => theme.colors.shadow},
      0 0 0 4px rgba(198, 92, 57, 0.12);
  }
`;

const CardSurface = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
  transition: transform 180ms ease;

  &:focus-visible {
    outline: 3px solid rgba(198, 92, 57, 0.28);
    outline-offset: -3px;
  }
`;

const Media = styled.div`
  position: relative;
  height: 18.75rem;
  background:
    linear-gradient(135deg, rgba(198, 92, 57, 0.22), rgba(23, 49, 43, 0.12)),
    ${({ theme }) => theme.colors.surfaceStrong};

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: 18.25rem;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 35%;
`;

const BrokenState = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
`;

const SelectionBadge = styled.div<{ $selected: boolean }>`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  width: 2.25rem;
  height: 2.25rem;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid
    ${({ theme, $selected }) =>
      $selected ? theme.colors.accent : "rgba(255, 255, 255, 0.72)"};
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.accent : "rgba(255, 251, 245, 0.82)"};
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.surfaceStrong : theme.colors.text};
  box-shadow: 0 8px 16px rgba(23, 49, 43, 0.18);
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: start;
`;

const Title = styled.h3`
  margin: 0;
  font-family: "Iowan Old Style", "Palatino Linotype", serif;
  font-size: 1.25rem;
  line-height: 1.1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const DateLabel = styled.span`
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
  white-space: nowrap;
`;

const Description = styled.p`
  margin: 0;
  flex: 1;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
`;

const ActionLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.7rem 0.95rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  transition:
    background 160ms ease,
    color 160ms ease,
    transform 160ms ease;

  &:hover,
  &:focus-visible {
    background: rgba(198, 92, 57, 0.12);
    color: ${({ theme }) => theme.colors.text};
    transform: translateX(2px);
    outline: none;
  }
`;

export function PetCard({ pet }: PetCardProps) {
  const { isSelected, toggleSelection } = useSelection();
  const [imageBroken, setImageBroken] = useState(false);
  const selected = isSelected(pet.id);

  const handleToggle = () => {
    toggleSelection(pet.id);
  };

  return (
    <Card $selected={selected}>
      <CardSurface
        role="button"
        tabIndex={0}
        aria-pressed={selected}
        aria-label={`${selected ? "Deselect" : "Select"} ${pet.title}`}
        onClick={handleToggle}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleToggle();
          }
        }}
      >
        <Media>
          {imageBroken ? (
            <BrokenState>Image unavailable for {pet.title}.</BrokenState>
          ) : (
            <Image
              src={pet.imageUrl}
              alt={pet.title}
              loading="lazy"
              onError={() => setImageBroken(true)}
            />
          )}
          <SelectionBadge $selected={selected} aria-hidden="true">
            {selected ? "✓" : "+"}
          </SelectionBadge>
        </Media>
        <Content>
          <TopRow>
            <Title>{pet.title}</Title>
            <DateLabel>{pet.createdAt.toLocaleDateString()}</DateLabel>
          </TopRow>
          <Description>{pet.description}</Description>
          <Footer>
            <ActionLink
              to={`/pets/${pet.id}`}
              onClick={(event) => event.stopPropagation()}
            >
              View details →
            </ActionLink>
          </Footer>
        </Content>
      </CardSurface>
    </Card>
  );
}
