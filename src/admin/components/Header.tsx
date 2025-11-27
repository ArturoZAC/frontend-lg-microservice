import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUiuxStore } from "@/store/uiux.store";

export function Header() {
  // const { title } = useUiuxStore();

  return (
    <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Listado de clientes</h2>
      </div>

      {/* User Profile Section */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-foreground">Arturo Araujo</p>
          <p className="text-xs text-muted-foreground">Administrador</p>
        </div>

        {/* User Avatar with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/diverse-user-avatars.png" />
                <AvatarFallback>AA</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="cursor-pointer">Perfil</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Configuración</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive cursor-pointer">
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
