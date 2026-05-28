import {
  NavLink,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import styled from "styled-components";
import { PetsProvider } from "../context/PetsContext";
import { SelectionProvider } from "../context/SelectionContext";
import { AboutPage } from "../pages/AboutPage";
import { GalleryPage } from "../pages/GalleryPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { PetDetailPage } from "../pages/PetDetailPage";

const Shell = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 20;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: rgba(246, 240, 230, 0.82);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 8px 20px rgba(61, 42, 26, 0.04);
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 84rem;
  margin: 0 auto;
  flex-wrap: wrap;
`;

const Brand = styled(NavLink)`
  font-family: "Iowan Old Style", "Palatino Linotype", serif;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.01em;
`;

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const NavItem = styled(NavLink)`
  padding: 0.72rem 1rem;
  border-radius: ${({ theme }) => theme.radii.pill};
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 700;
  transition:
    background 160ms ease,
    color 160ms ease,
    transform 160ms ease;

  &.active {
    background: rgba(198, 92, 57, 0.12);
    color: ${({ theme }) => theme.colors.text};
  }

  &:hover {
    transform: translateY(-1px);
    color: ${({ theme }) => theme.colors.text};
  }
`;

const Main = styled.main`
  max-width: 84rem;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg}
    ${({ theme }) => theme.spacing.xxl};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.xl}
      ${({ theme }) => theme.spacing.xxl};
  }
`;

function AppLayout() {
  return (
    <Shell>
      <Header>
        <HeaderInner>
          <Brand to="/">Pet Selector</Brand>
          <Nav>
            <NavItem to="/" end>
              Gallery
            </NavItem>
            <NavItem to="/about">About</NavItem>
          </Nav>
        </HeaderInner>
      </Header>
      <Main>
        <Outlet />
      </Main>
    </Shell>
  );
}

export function AppRouter() {
  return (
    <Router>
      <PetsProvider>
        <SelectionProvider>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<GalleryPage />} />
              <Route path="/pets/:id" element={<PetDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </SelectionProvider>
      </PetsProvider>
    </Router>
  );
}
