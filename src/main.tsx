import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/reset.css";
import "./index.css";
import { BrowserRouter } from "react-router";
import { Routes } from "react-router";
import { Route } from "react-router";
import LandingPage from "./components/pages/landing-page";
import AboutPage from "./components/pages/about-page";
import LoginPage from "./components/pages/login-page";
import Register from "./components/pages/register-page";
import CommLayout from "./components/layouts/comm-layout";
import MainLayout from "./components/layouts/main-layout";
import ReportPage from "./components/pages/report-page";
import TestPage from "./components/pages/test-page";
import { Toaster } from "sonner";

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
        <Route path="/test" element={<TestPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
