import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuthContext } from "@/contexts/AuthContext";

export const useRequireLogin = (): boolean => {
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth/login", {
        replace: true,
        state: { from: location },
      });
    }
  }, [isLoggedIn, navigate, location]);

  return isLoggedIn;
};
