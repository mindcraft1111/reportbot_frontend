import { useAuthContext } from "@/contexts/AuthContext";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuthContext();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />;
  }

  return children;
}
