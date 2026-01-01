import { Provider } from "react-redux";
import { store } from "./state";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // <-- no extension needed with Vite + TS

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
