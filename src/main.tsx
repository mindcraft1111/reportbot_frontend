import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/reset.css";
import "./index.css";
import { BrowserRouter } from "react-router";
import { Routes } from "react-router";
import { Route } from "react-router";

import CommLayout from "./components/layouts/comm-layout";

import { Toaster } from "sonner";
import LandingPage from "./pages/landing-page";
import LoginPage from "./pages/login-page";
import Register from "./pages/register-page";
import PromptTestPage from "./pages/test-page";
import PromptTestPage2 from "./pages/prompt-test-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AIDataProvider from "./contexts/AiResponseContext";
import { AuthProvider } from "./contexts/AuthContext";
import GeneralContextProvider from "./contexts/GeneralContext";
import TailwindIndicator from "./components/utils/tailwind-indicator";
import DashboardPage from "./pages/dashboard-page";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GeneralContextProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <AIDataProvider>
              <Routes>
                <Route element={<CommLayout />}>
                  <Route index element={<LandingPage />} />{" "}
                  <Route path="/test" element={<PromptTestPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route
                    path="/prompt-test/:project_id"
                    element={<PromptTestPage2 />}
                  />
                </Route>
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<Register />} />
              </Routes>
              <Toaster position="top-right" richColors />
              <TailwindIndicator />
            </AIDataProvider>
          </QueryClientProvider>
        </AuthProvider>
      </GeneralContextProvider>
    </BrowserRouter>
  </StrictMode>
);
