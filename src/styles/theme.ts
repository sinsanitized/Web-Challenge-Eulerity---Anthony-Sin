export const theme = {
  colors: {
    background: "#f6f0e6",
    surface: "rgba(255, 252, 247, 0.9)",
    surfaceStrong: "#fffaf2",
    border: "rgba(23, 49, 43, 0.12)",
    text: "#17312b",
    muted: "#5b6962",
    accent: "#c65c39",
    accentSoft: "#efd6c7",
    success: "#2b7a4b",
    shadow: "rgba(61, 42, 26, 0.1)",
  },
  radii: {
    sm: "12px",
    md: "20px",
    lg: "28px",
    pill: "999px",
  },
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    xxl: "3rem",
  },
  breakpoints: {
    tablet: "48rem",
    desktop: "72rem",
  },
};

export type AppTheme = typeof theme;
