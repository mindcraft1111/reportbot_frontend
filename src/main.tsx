import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/reset.css";
import "./index.css";
import { BrowserRouter } from "react-router";
import { Routes } from "react-router";
import { Route } from "react-router";

import CommLayout from "./components/layouts/comm-layout";
import MainLayout from "./components/layouts/main-layout";

import { Toaster } from "sonner";
import LandingPage from "./pages/landing-page";
import ReportPage from "./pages/report-page";
import AboutPage from "./pages/about-page";
import LoginPage from "./pages/login-page";
import Register from "./pages/register-page";
import PromptTestPage from "./pages/test-page";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<CommLayout />}>
          <Route index element={<LandingPage />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="report" element={<ReportPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/test" element={<PromptTestPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
