import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";

const redirectedPath = window.sessionStorage.getItem("mystreamtimer.redirect-path");

if (redirectedPath) {
  window.sessionStorage.removeItem("mystreamtimer.redirect-path");
  window.history.replaceState(null, "", redirectedPath);
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
