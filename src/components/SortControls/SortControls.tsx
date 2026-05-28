import styled from "styled-components";
import { SortMode } from "../../types/pet";

type SortControlsProps = {
  value: SortMode;
  onChange: (value: SortMode) => void;
};

const SORT_OPTIONS: Array<{ label: string; value: SortMode }> = [
  { label: "Name A-Z", value: "name-asc" },
  { label: "Name Z-A", value: "name-desc" },
  { label: "Date (Newest First)", value: "date-newest" },
  { label: "Date (Oldest First)", value: "date-oldest" },
];

const Field = styled.label`
  display: grid;
  gap: 0.45rem;
`;

const Label = styled.span`
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.muted};
`;

const Select = styled.select`
  width: 100%;
  padding: 0.95rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(255, 255, 255, 0.72);
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 4px rgba(198, 92, 57, 0.12);
  }
`;

export function SortControls({ value, onChange }: SortControlsProps) {
  return (
    <Field>
      <Label htmlFor="pet-sort">Sort</Label>
      <Select
        id="pet-sort"
        value={value}
        onChange={(event) => onChange(event.target.value as SortMode)}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Field>
  );
}
