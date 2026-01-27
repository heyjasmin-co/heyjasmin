import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./App.tsx";
import "./index.css";
import { queryClient } from "./lib/react-query.ts";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ClerkProvider
    publishableKey={PUBLISHABLE_KEY}
    afterSignInUrl="/admin/dashboard"
    afterSignUpUrl="/admin/dashboard"
  >
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    <ToastContainer />
  </ClerkProvider>,
  // </StrictMode>,
);
