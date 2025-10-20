// index.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Login from "./views/LoginPage"; 

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Login />
  </StrictMode>
);
