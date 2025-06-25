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
import ReportPage from "./pages/report-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AIDataProvider from "./contexts/AiResponseContext";
import { AuthProvider } from "./contexts/AuthContext";
import GeneralContextProvider from "./contexts/GeneralContext";
import DashboardPage from "./pages/dashboard-page";
import RequireAuth from "./components/require-auth";

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
                  <Route index element={<LandingPage />} />

                  <Route
                    path="/test"
                    element={
                      <RequireAuth>
                        <PromptTestPage />
                      </RequireAuth>
                    }
                  />

                  <Route
                    path="/dashboard"
                    element={
                      <RequireAuth>
                        <DashboardPage />
                      </RequireAuth>
                    }
                  />

                  <Route
                    path="/prompt-test/:project_id"
                    element={<PromptTestPage2 />}
                  />
                </Route>
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/register" element={<Register />} />
              </Routes>
              <Toaster position="top-right" richColors />
            </AIDataProvider>
          </QueryClientProvider>
        </AuthProvider>
      </GeneralContextProvider>
    </BrowserRouter>
  </StrictMode>
);
