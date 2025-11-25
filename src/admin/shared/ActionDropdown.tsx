import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export interface ActionOption {
  label: string; // Texto: "Ver", "Editar", "Eliminar"
  onClick?: () => void; // Acción
  href?: string; // Alternativa: redirigir
  destructive?: boolean; // Para estilo rojo en "Eliminar"
}

interface ActionDropdownProps {
  options: ActionOption[];
}

export function ActionDropdown({ options }: ActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-[#001d3d] text-white border border-white/20 rounded-md shadow-md"
      >
        {options.map((item, i) => (
          <DropdownMenuItem
            key={i}
            className={`cursor-pointer text-sm ${
              item.destructive ? "text-red-400 hover:text-red-500" : "text-white"
            }`}
            onClick={() => {
              if (item.href) window.location.href = item.href;
              if (item.onClick) item.onClick();
            }}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
