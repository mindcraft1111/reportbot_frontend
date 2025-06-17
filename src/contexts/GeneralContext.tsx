import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

type GeneralContext = {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
};

const GeneralContext = createContext<GeneralContext | null>(null);

export default function GeneralContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");

    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsSidebarOpen(false);
      }
    };

    // Add listener
    mediaQuery.addEventListener("change", handleMediaChange);

    // Clean up
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return (
    <GeneralContext.Provider value={{ toggleSidebar, isSidebarOpen }}>
      {children}
    </GeneralContext.Provider>
  );
}

export const useGeneralContext = () => {
  const context = useContext(GeneralContext);

  if (!context) {
    toast.error("컨텍스트는 프로바이더 내부에서만 사용할 수 있습니다.");
    throw new Error(
      "GeneralContext must be used within GeneralContextProvider"
    );
  }

  return context;
};
