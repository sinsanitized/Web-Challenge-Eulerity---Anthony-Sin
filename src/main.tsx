import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { AppRouter } from "./router/AppRouter";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";

const container = document.getElementById("app");

if (!container) {
  throw new Error("App root element was not found.");
}

createRoot(container).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppRouter />
    </ThemeProvider>
  </React.StrictMode>,
);
