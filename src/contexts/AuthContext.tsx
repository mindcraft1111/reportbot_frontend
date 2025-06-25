import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  useContext,
} from "react";
import { toast } from "sonner";
import * as apiClient from "../api/client";
import { type AuthResponse } from "../api/client";
import { type UserAndToken } from "../api/client";
import { useNavigate } from "react-router";

interface AuthContextType {
  user: UserAndToken | null;
  isLoggedIn: boolean;
  login: (values: {
    email: string;
    password: string;
  }) => Promise<AuthResponse | undefined>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserAndToken | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("userAndToken");
    if (stored) {
      const parsed: UserAndToken = JSON.parse(stored);
      setUser(parsed);
      setIsLoggedIn(true);
      navigator("/");
    }
  }, []);

  const login = async (values: {
    email: string;
    password: string;
  }): Promise<AuthResponse | undefined> => {
    try {
      const response = await apiClient.login(values);
      console.log(response);

      if (response.error) {
        return response;
      }

      if (response.success && response.data) {
        setUser(response.data);
        setIsLoggedIn(true);
        localStorage.setItem("userAndToken", JSON.stringify(response.data));
        return response;
      }
    } catch (error) {
      toast.error("로그인 실패");
      console.error("Login failed", error);
    }
  };

  const logout = async () => {
    if (!user) {
      console.log("이미 로그아웃 상태입니다.");
      return;
    }

    const response = await apiClient.logout(user.tokens.accessToken);

    if (!response.success) {
      if (response.message) {
        toast.error(response.message);
        return;
      }
      toast.error("서버 에러 : 로그아웃 실패");
    } else {
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem("userAndToken");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }

  return context;
};
