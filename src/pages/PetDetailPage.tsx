import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { StatusPanel } from "../components/StatusPanel/StatusPanel";
import { useSelection } from "../context/SelectionContext";
import { usePets } from "../hooks/usePets";

const Page = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const BackLink = styled(Link)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  width: fit-content;
  transition: transform 160ms ease;

  &:hover {
    transform: translateX(-2px);
  }

  &:focus-visible {
    outline: 3px solid rgba(198, 92, 57, 0.24);
    outline-offset: 3px;
  }
`;

const DetailCard = styled.article`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.34), transparent),
    ${({ theme }) => theme.colors.surface};
  box-shadow: 0 20px 40px ${({ theme }) => theme.colors.shadow};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    align-items: start;
  }
`;

const Media = styled.div`
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.md};
  background:
    linear-gradient(135deg, rgba(198, 92, 57, 0.24), rgba(23, 49, 43, 0.16)),
    ${({ theme }) => theme.colors.surfaceStrong};
  min-height: 22rem;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  min-height: 22rem;
  object-fit: cover;
  object-position: center;
`;

const BrokenState = styled.div`
  display: grid;
  place-items: center;
  min-height: 22rem;
  padding: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
`;

const Content = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Eyebrow = styled.span`
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.accent};
`;

const Title = styled.h1`
  margin: 0;
  font-family: "Iowan Old Style", "Palatino Linotype", serif;
  font-size: clamp(2rem, 4vw, 3.25rem);
  line-height: 1;
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1.05rem;
  line-height: 1.65;
`;

const Meta = styled.dl`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.4rem 0.8rem;
  margin: 0;
`;

const MetaLabel = styled.dt`
  font-weight: 700;
`;

const MetaValue = styled.dd`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
`;

const Button = styled.button<{ $selected: boolean }>`
  width: fit-content;
  min-height: 3rem;
  padding: 0.85rem 1rem;
  border: 1px solid
    ${({ theme, $selected }) =>
      $selected ? theme.colors.accent : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.accentSoft : "rgba(255, 255, 255, 0.75)"};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    background 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 10px 18px rgba(61, 42, 26, 0.06);
  }

  &:focus-visible {
    outline: 3px solid rgba(198, 92, 57, 0.24);
    outline-offset: 3px;
  }
`;

export function PetDetailPage() {
  const { id } = useParams();
  const { pets, isLoading, errorMessage } = usePets();
  const { isSelected, toggleSelection } = useSelection();
  const [imageBroken, setImageBroken] = useState(false);

  if (isLoading) {
    return (
      <StatusPanel
        title="Loading pet detail"
        message="Fetching the selected pet record and image metadata."
      />
    );
  }

  if (errorMessage) {
    return (
      <StatusPanel
        title="Could not load this pet"
        tone="error"
        message={errorMessage}
        action={<BackLink to="/">Return to gallery</BackLink>}
      />
    );
  }

  const pet = pets.find((candidate) => candidate.id === id);

  if (!pet) {
    return (
      <StatusPanel
        title="Pet not found"
        tone="empty"
        message="That detail route does not map to a current pet record. The gallery state and your selections are still intact."
        action={<BackLink to="/">Return to gallery</BackLink>}
      />
    );
  }

  const selected = isSelected(pet.id);

  return (
    <Page>
      <BackLink to="/">← Back to gallery</BackLink>
      <DetailCard>
        <Media>
          {imageBroken ? (
            <BrokenState>Image unavailable for {pet.title}.</BrokenState>
          ) : (
            <Image
              src={pet.imageUrl}
              alt={pet.title}
              onError={() => setImageBroken(true)}
            />
          )}
        </Media>
        <Content>
          <Eyebrow>Pet Detail</Eyebrow>
          <Title>{pet.title}</Title>
          <Description>{pet.description}</Description>
          <Meta>
            <MetaLabel>Created</MetaLabel>
            <MetaValue>{pet.createdLabel}</MetaValue>
            <MetaLabel>Normalized date</MetaLabel>
            <MetaValue>{pet.createdAt.toLocaleString()}</MetaValue>
            <MetaLabel>Selection state</MetaLabel>
            <MetaValue>{selected ? "Selected globally" : "Not selected"}</MetaValue>
          </Meta>
          <Button
            type="button"
            $selected={selected}
            onClick={() => toggleSelection(pet.id)}
          >
            {selected ? "Remove from selection" : "Add to selection"}
          </Button>
        </Content>
      </DetailCard>
    </Page>
  );
}
