import { useState } from "react";
import { Users, FileText, Ticket, ChevronLeft, Menu, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  onToggle: () => void;
}

export function Sidebar({ open, onToggle }: SidebarProps) {
  const [activeItem, setActiveItem] = useState("clientes");

  const menuItems = [
    { id: "clientes", label: "Clientes", icon: Users },
    { id: "cotizaciones", label: "Cotizaciones", icon: FileText },
    { id: "cupones", label: "Cupones", icon: Ticket },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-6 left-4 z-40 md:hidden"
        onClick={onToggle}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:relative top-0 left-0 h-screen bg-primary text-primary-foreground transition-all duration-300 z-30",
          open ? "w-64" : "w-0 md:w-20 overflow-hidden"
        )}
        // className={cn(
        //   "fixed md:relative top-0 left-0 h-screen bg-primary transition-all duration-300 z-30",
        //   open ? "w-64" : "w-0 md:w-20 overflow-hidden"
        // )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-primary-foreground/10">
            {open && <h1 className="text-xl font-bold">CRM</h1>}
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary-foreground/10 hidden md:flex"
              // className="text-primary-foreground hover:bg-primary-foreground/10 hidden md:flex"
              onClick={onToggle}
            >
              {open ? (
                <ChevronLeft className="h-5 w-5 text-white" />
              ) : (
                <ChevronRight className="h-5 w-5 text-white" />
              )}
            </Button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-2 py-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={`#${item.id}`}
                  onClick={() => setActiveItem(item.id)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors whitespace-nowrap",
                    activeItem === item.id
                      ? "bg-primary-foreground/20"
                      : "hover:bg-primary-foreground/10"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {open && <span>{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {open && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={onToggle} />}
    </>
  );
}
