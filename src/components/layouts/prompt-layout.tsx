import { Outlet } from "react-router";
import PromptSidebar from "../prompt-sidebar";

export default function PromptLayout() {
  return (
    <>
      <PromptSidebar />
      <Outlet />
    </>
  );
}
