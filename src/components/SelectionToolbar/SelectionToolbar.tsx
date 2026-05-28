import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useSelection } from "../../context/SelectionContext";
import { Pet } from "../../types/pet";
import { downloadPets } from "../../utils/downloadPets";
import { estimateFileSize, formatBytes } from "../../utils/estimateFileSize";

type SelectionToolbarProps = {
  pets: Pet[];
  filteredPets: Pet[];
};

type SizeState = Record<string, number | null>;

const Bar = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.48), transparent),
    rgba(255, 250, 242, 0.9);
  backdrop-filter: blur(18px);
  box-shadow: 0 18px 36px ${({ theme }) => theme.colors.shadow};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 0.35rem;
    background: linear-gradient(
      180deg,
      rgba(198, 92, 57, 0.75),
      rgba(43, 122, 75, 0.45)
    );
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
`;

const Summary = styled.div`
  display: grid;
  gap: 0.28rem;
`;

const Eyebrow = styled.span`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

const Count = styled.strong`
  font-size: 1.18rem;
  line-height: 1.15;
`;

const Meta = styled.span`
  color: ${({ theme }) => theme.colors.muted};
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: flex-start;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    justify-content: flex-end;
  }
`;

const Button = styled.button<{ $accent?: boolean }>`
  padding: 0.8rem 1rem;
  min-height: 3rem;
  border: 1px solid
    ${({ theme, $accent }) =>
      $accent ? theme.colors.accent : theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $accent }) =>
    $accent ? theme.colors.accent : "rgba(255, 255, 255, 0.72)"};
  color: ${({ theme, $accent }) =>
    $accent ? theme.colors.surfaceStrong : theme.colors.text};
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 160ms ease,
    background 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 10px 18px rgba(61, 42, 26, 0.06);
  }

  &:focus-visible {
    outline: 3px solid rgba(198, 92, 57, 0.28);
    outline-offset: 3px;
  }
`;

const Status = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.muted};
`;

export function SelectionToolbar({
  pets,
  filteredPets,
}: SelectionToolbarProps) {
  const {
    selectedIds,
    selectedCount,
    selectMany,
    clearSelection,
  } = useSelection();
  const [sizeById, setSizeById] = useState<SizeState>({});
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null);

  const selectedPets = useMemo(
    () => pets.filter((pet) => selectedIds.includes(pet.id)),
    [pets, selectedIds],
  );

  useEffect(() => {
    const uncachedPets = selectedPets.filter((pet) => !(pet.id in sizeById));

    if (uncachedPets.length === 0) {
      return;
    }

    let cancelled = false;

    void Promise.all(
      uncachedPets.map(async (pet) => ({
        id: pet.id,
        size: await estimateFileSize(pet.imageUrl),
      })),
    ).then((results) => {
      if (cancelled) {
        return;
      }

      setSizeById((current) => {
        const next = { ...current };
        results.forEach(({ id, size }) => {
          next[id] = size;
        });
        return next;
      });
    });

    return () => {
      cancelled = true;
    };
  }, [selectedPets, sizeById]);

  const sizeLabel = useMemo(() => {
    if (selectedPets.length === 0) {
      return "Choose pets to estimate file size.";
    }

    const sizes = selectedPets.map((pet) => sizeById[pet.id]);

    if (sizes.some((size) => size === undefined)) {
      return "Estimating total file size...";
    }

    if (sizes.some((size) => size === null)) {
      return "Estimated total size: Size unavailable";
    }

    const total = sizes.reduce((sum, size) => sum + (size ?? 0), 0);
    return `Estimated total size: ${formatBytes(total)}`;
  }, [selectedPets, sizeById]);

  const handleDownload = async () => {
    if (selectedPets.length === 0) {
      return;
    }

    setIsDownloading(true);
    setDownloadMessage(null);

    try {
      const result = await downloadPets(selectedPets);
      setDownloadMessage(
        result.failed === 0
          ? `Downloaded ${result.downloaded} image${result.downloaded === 1 ? "" : "s"}.`
          : `Downloaded ${result.downloaded}. ${result.failed} failed due to network or CORS restrictions.`,
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Bar>
      <Summary>
        <Eyebrow>Selection</Eyebrow>
        <Count>{selectedCount} pets selected</Count>
        <Meta>{sizeLabel}</Meta>
        {downloadMessage ? <Status>{downloadMessage}</Status> : null}
      </Summary>
      <Actions>
        <Button
          type="button"
          onClick={() => selectMany(filteredPets.map((pet) => pet.id))}
          disabled={filteredPets.length === 0}
          title="Adds all matching pets to the current selection."
        >
          Select All
        </Button>
        <Button type="button" onClick={clearSelection} disabled={selectedCount === 0}>
          Clear Selection
        </Button>
        <Button
          type="button"
          $accent
          onClick={() => void handleDownload()}
          disabled={selectedPets.length === 0 || isDownloading}
        >
          {isDownloading ? "Downloading..." : "Download Selected"}
        </Button>
      </Actions>
    </Bar>
  );
}
