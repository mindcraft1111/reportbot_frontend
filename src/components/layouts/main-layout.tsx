import { Outlet } from "react-router";
import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "../sidebar";
import Header from "../header";

export default function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <section className="flex-1">
        <Header />
        <Outlet />
      </section>
    </SidebarProvider>
  );
}
