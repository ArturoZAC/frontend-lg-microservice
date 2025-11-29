// import { useState } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../components/Header";
import { Sidebar } from "../components/SideBar";
import { useUIUXStore } from "../store/uiux.store";

export function AdminLayout(/* { children }: DashboardLayoutProps */) {
  const { isSideBarOpen, toggleSideBar } = useUIUXStore();

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar open={isSideBarOpen} onToggle={toggleSideBar} />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-auto">
          {/* <div className="p-6 mx-auto flex justify-center"> */}
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
