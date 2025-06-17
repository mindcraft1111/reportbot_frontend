import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("hi?")
  if (context === undefined) {
    throw new Error("useAuth must be within an AuthProvider");
  }
  return context;
}
