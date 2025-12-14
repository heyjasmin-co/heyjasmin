import { ClerkProvider } from "@clerk/clerk-react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App";
import "./index.css";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ClerkProvider
    publishableKey={PUBLISHABLE_KEY}
    afterSignInUrl="/admin/dashboard"
    afterSignUpUrl="/admin/dashboard"
  >
    <App />
    <ToastContainer />
  </ClerkProvider>,
  // </StrictMode>,
);
