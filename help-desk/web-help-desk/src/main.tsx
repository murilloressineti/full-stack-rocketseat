import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "sonner";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <Toaster richColors position="bottom-center" />
    </AuthProvider>
  </StrictMode>,
);
