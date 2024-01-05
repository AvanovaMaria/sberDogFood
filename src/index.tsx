import React, { StrictMode } from "react";
import "./index.css";
import { createRoot } from "react-dom/client";
import App from "./components/app";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./services/store";

const domNode = document.getElementById("root") as HTMLDivElement;
const root = createRoot(domNode);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
