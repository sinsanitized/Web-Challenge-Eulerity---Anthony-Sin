import { Link } from "react-router-dom";
import styled from "styled-components";
import { StatusPanel } from "../components/StatusPanel/StatusPanel";

const BackLink = styled(Link)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
`;

export function NotFoundPage() {
  return (
    <StatusPanel
      title="Page not found"
      tone="empty"
      message="That route does not exist in this gallery. Return to the main view or the about page."
      action={<BackLink to="/">Return to gallery</BackLink>}
    />
  );
}
