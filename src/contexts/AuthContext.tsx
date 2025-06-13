import React, {
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // 로그인
  const login = async (email: string, password: string) => {
    try {
      const response = await fakeLoginApi(email, password);
      setToken(response.token);
      setUser(response.user);
      localStorage.setItem("token", response.token);
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  // 로그아웃
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const isLoggedIn = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

interface FakeLoginResponse {
  token: string;
  user: User;
}

const fakeLoginApi = async (
  email: string,
  password: string
): Promise<FakeLoginResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@example.com" && password === "password") {
        resolve({
          token: "fake-token-123456",
          user: { id: "1", name: "Test User", email },
        });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
};
