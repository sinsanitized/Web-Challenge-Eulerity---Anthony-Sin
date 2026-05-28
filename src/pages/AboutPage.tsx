import styled from "styled-components";

const Page = styled.section`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.34), transparent),
    ${({ theme }) => theme.colors.surface};
  box-shadow: 0 20px 40px ${({ theme }) => theme.colors.shadow};
`;

const Title = styled.h1`
  margin: 0;
  font-family: "Iowan Old Style", "Palatino Linotype", serif;
  font-size: clamp(2rem, 4vw, 3.25rem);
`;

const Copy = styled.p`
  margin: 0;
  max-width: 46rem;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1.02rem;
  line-height: 1.65;
`;

const List = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.7;
`;

export function AboutPage() {
  return (
    <Page>
      <Title>About Me</Title>
      <Copy>
        This build is intentionally organized around predictable state
        boundaries. Pet data is fetched and normalized once, selection state
        lives in a reducer-backed context, and search, sort, and pagination stay
        local to the gallery route as derived state.
      </Copy>
      <List>
        <li>Pagination is client-side because the dataset is small and static.</li>
        <li>Selection persists across routes without moving gallery controls into global state.</li>
        <li>Image size estimates use HEAD requests and fall back cleanly when unavailable.</li>
        <li>Broken images and invalid routes resolve to explicit UI states instead of silent failures.</li>
      </List>
    </Page>
  );
}
