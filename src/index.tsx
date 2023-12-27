import React, { StrictMode } from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./components/app";
import { BrowserRouter } from "react-router-dom";

const domNode = document.getElementById("root") as HTMLDivElement;
const root = createRoot(domNode);

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
