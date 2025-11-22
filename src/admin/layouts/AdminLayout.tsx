import { useState } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/SideBar";
import { Outlet } from "react-router-dom";

// interface DashboardLayoutProps {
//   children: React.ReactNode;
// }

export function AdminLayout(/* { children }: DashboardLayoutProps */) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
