import styled from "styled-components";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

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

const Input = styled.input`
  width: 100%;
  padding: 0.95rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: rgba(255, 255, 255, 0.72);
  color: ${({ theme }) => theme.colors.text};
  transition:
    border-color 160ms ease,
    transform 160ms ease,
    box-shadow 160ms ease;

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 4px rgba(198, 92, 57, 0.12);
    transform: translateY(-1px);
  }
`;

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Field>
      <Label htmlFor="pet-search">Search</Label>
      <Input
        id="pet-search"
        type="search"
        placeholder="Search by name or personality..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </Field>
  );
}
