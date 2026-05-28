import { ReactNode } from "react";
import styled from "styled-components";

type StatusPanelProps = {
  title: string;
  message: string;
  action?: ReactNode;
  tone?: "default" | "empty" | "error";
};

const toneStyles = {
  default: `
    --panel-accent: rgba(198, 92, 57, 0.22);
    --panel-tag: rgba(198, 92, 57, 0.12);
  `,
  empty: `
    --panel-accent: rgba(43, 122, 75, 0.18);
    --panel-tag: rgba(43, 122, 75, 0.12);
  `,
  error: `
    --panel-accent: rgba(176, 70, 54, 0.18);
    --panel-tag: rgba(176, 70, 54, 0.12);
  `,
} as const;

const Panel = styled.section<{ $tone: "default" | "empty" | "error" }>`
  position: relative;
  display: grid;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.3), transparent 100%),
    ${({ theme }) => theme.colors.surface};
  box-shadow: 0 20px 40px ${({ theme }) => theme.colors.shadow};
  text-align: center;
  overflow: hidden;

  ${({ $tone }) => toneStyles[$tone]}

  &::before {
    content: "";
    position: absolute;
    inset: 0 auto 0 0;
    width: 0.35rem;
    background: var(--panel-accent);
  }
`;

const Title = styled.h2`
  margin: 0;
  font-family: "Iowan Old Style", "Palatino Linotype", serif;
  font-size: clamp(1.6rem, 2vw, 2.2rem);
  line-height: 1.05;
`;

const Message = styled.p`
  margin: 0 auto;
  max-width: 38rem;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 1.02rem;
  line-height: 1.65;
`;

const ActionWrap = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};

  button,
  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.85rem 1.05rem;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.pill};
    background: rgba(255, 255, 255, 0.82);
    color: ${({ theme }) => theme.colors.text};
    font-weight: 700;
    cursor: pointer;
    transition:
      transform 160ms ease,
      background 160ms ease,
      border-color 160ms ease;
  }

  button:hover,
  a:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.95);
  }

  button:focus-visible,
  a:focus-visible {
    outline: 3px solid rgba(198, 92, 57, 0.24);
    outline-offset: 3px;
  }
`;

export function StatusPanel({
  title,
  message,
  action,
  tone = "default",
}: StatusPanelProps) {
  return (
    <Panel $tone={tone}>
      <Title>{title}</Title>
      <Message>{message}</Message>
      {action ? <ActionWrap>{action}</ActionWrap> : null}
    </Panel>
  );
}
