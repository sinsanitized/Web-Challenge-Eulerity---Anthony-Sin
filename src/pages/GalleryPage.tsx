import { useDeferredValue, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { GalleryGrid } from "../components/Gallery/GalleryGrid";
import { Pagination } from "../components/Pagination/Pagination";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { SelectionToolbar } from "../components/SelectionToolbar/SelectionToolbar";
import { SkeletonCard } from "../components/SkeletonCard/SkeletonCard";
import { SortControls } from "../components/SortControls/SortControls";
import { StatusPanel } from "../components/StatusPanel/StatusPanel";
import { usePets } from "../hooks/usePets";
import { Pet, SortMode } from "../types/pet";
import { sortPets } from "../utils/sortPets";

const PAGE_SIZE = 8;

const Page = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Controls = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.42), transparent 100%),
    ${({ theme }) => theme.colors.surface};
  box-shadow: 0 16px 30px ${({ theme }) => theme.colors.shadow};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: minmax(0, 1.3fr) minmax(16rem, 0.7fr);
    align-items: end;
  }
`;

const StickyRail = styled.div`
  position: sticky;
  top: 4.9rem;
  z-index: 10;
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ResultsMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.95rem;
`;

const SkeletonGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

function filterPets(pets: Pet[], query: string): Pet[] {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return pets;
  }

  return pets.filter((pet) =>
    [pet.title, pet.description].some((value) =>
      value.toLowerCase().includes(normalizedQuery),
    ),
  );
}

export function GalleryPage() {
  const { pets, isLoading, errorMessage, isEmpty, refetch } = usePets();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("name-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const deferredQuery = useDeferredValue(searchQuery);

  useEffect(() => {
    setCurrentPage(1);
  }, [deferredQuery, sortMode]);

  const filteredPets = useMemo(
    () => filterPets(pets, deferredQuery),
    [deferredQuery, pets],
  );

  const sortedPets = useMemo(
    () => sortPets(filteredPets, sortMode),
    [filteredPets, sortMode],
  );

  const totalPages = Math.max(1, Math.ceil(sortedPets.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedPets = useMemo(() => {
    const startIndex = (safePage - 1) * PAGE_SIZE;
    return sortedPets.slice(startIndex, startIndex + PAGE_SIZE);
  }, [safePage, sortedPets]);

  if (isLoading) {
    return (
      <Page>
        <SelectionToolbar pets={[]} filteredPets={[]} />
        <SkeletonGrid>
          {Array.from({ length: PAGE_SIZE }, (_, index) => (
            <SkeletonCard key={index} />
          ))}
        </SkeletonGrid>
      </Page>
    );
  }

  if (errorMessage) {
    return (
      <StatusPanel
        title="Could not load the pet gallery"
        tone="error"
        message={`${errorMessage} Make sure the /pets endpoint is reachable from the current environment.`}
        action={
          <button type="button" onClick={() => void refetch()}>
            Retry
          </button>
        }
      />
    );
  }

  if (isEmpty) {
    return (
      <StatusPanel
        title="No pets available"
        tone="empty"
        message="The API responded successfully, but there was no pet data to display."
      />
    );
  }

  return (
    <Page>
      <StickyRail>
        <SelectionToolbar pets={pets} filteredPets={filteredPets} />
        <Controls>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <SortControls value={sortMode} onChange={setSortMode} />
        </Controls>
      </StickyRail>

      <ResultsMeta>
        <span>
          Showing {paginatedPets.length} of {sortedPets.length} matching pets
        </span>
        <span>
          Page {safePage} of {totalPages}
        </span>
      </ResultsMeta>

      {sortedPets.length === 0 ? (
        <StatusPanel
          title="No matches for that search"
          tone="empty"
          message="Try another name or personality trait."
        />
      ) : (
        <>
          <GalleryGrid pets={paginatedPets} />
          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </Page>
  );
}
