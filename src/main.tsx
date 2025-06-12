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
import ReportPage from "./pages/report-page";
import LoginPage from "./pages/login-page";
import Register from "./pages/register-page";
import PromptTestPage from "./pages/test-page";
import PromptTestPage2 from "./pages/prompt-test-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<CommLayout />}>
            <Route index element={<LandingPage />} />{" "}
            <Route path="/test" element={<PromptTestPage />} />
            <Route path="report" element={<ReportPage />} />
            <Route
              path="/prompt-test/:category_id"
              element={<PromptTestPage2 />}
            />
          </Route>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<Register />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
