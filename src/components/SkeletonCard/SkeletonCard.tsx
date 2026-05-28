import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
`;

const Card = styled.div`
  position: relative;
  min-height: 22rem;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 16px 30px ${({ theme }) => theme.colors.shadow};
`;

const Block = styled.div<{ $height: string; $width?: string }>`
  position: relative;
  overflow: hidden;
  width: ${({ $width }) => $width ?? "100%"};
  height: ${({ $height }) => $height};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: rgba(23, 49, 43, 0.08);

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.52), transparent);
    animation: ${shimmer} 1.8s infinite;
  }
`;

const Content = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
`;

export function SkeletonCard() {
  return (
    <Card aria-hidden="true">
      <Block $height="15rem" />
      <Content>
        <Block $height="1.4rem" $width="70%" />
        <Block $height="0.95rem" />
        <Block $height="0.95rem" $width="85%" />
        <Block $height="2.5rem" $width="45%" />
      </Content>
    </Card>
  );
}
