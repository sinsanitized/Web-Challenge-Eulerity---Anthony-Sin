import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    color: ${({ theme }) => theme.colors.text};
    background:
      radial-gradient(circle at top left, rgba(198, 92, 57, 0.14), transparent 30rem),
      radial-gradient(circle at top right, rgba(43, 122, 75, 0.12), transparent 26rem),
      ${({ theme }) => theme.colors.background};
    font-family: "Avenir Next", "Segoe UI", sans-serif;
    line-height: 1.55;
    font-weight: 400;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }

  html {
    min-height: 100%;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    min-height: 100vh;
    color: ${({ theme }) => theme.colors.text};
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.5), transparent 28%),
      ${({ theme }) => theme.colors.background};
  }

  body::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image:
      linear-gradient(rgba(255, 255, 255, 0.16) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.16) 1px, transparent 1px);
    background-size: 4rem 4rem;
    mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.2), transparent 78%);
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button,
  input,
  select {
    font: inherit;
  }

  ::selection {
    background: rgba(198, 92, 57, 0.2);
    color: ${({ theme }) => theme.colors.text};
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  img {
    max-width: 100%;
    display: block;
  }
`;
