import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useClientes } from "./hooks/useClientes";
import { ListaContainer } from "./components/ListaContainer";

export function ListaClientesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [registroFilter, setRegistroFilter] = useState<string | null>(null);
  const [medioFilter, setMedioFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useClientes({
    page: currentPage,
    search: searchTerm,
    tipo_documento: registroFilter ?? undefined,
    medio_ingreso: medioFilter ?? undefined,
    per_page: 10,
  });

  // useEffect(() => {
  //   console.log({data: data?.data});
  // }, [])
  
  const clientes = data?.data ?? [];
  const total = data?.total ?? 0;
  const lastPage = data?.last_page ?? 1;

  const resetToFirstPage = () => setCurrentPage(1);

  return (
    <div className="space-y-4">
      {/* Search & filters */}
      <div className="bg-card border rounded-lg p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">

          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cliente..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                resetToFirstPage();
              }}
            />
          </div>

          {/* Registro */}
          <Select
            value={registroFilter || "all"}
            onValueChange={(value) => {
              setRegistroFilter(value === "all" ? null : value);
              resetToFirstPage();
            }}
          >
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Registro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="dni">DNI</SelectItem>
              <SelectItem value="ruc">RUC</SelectItem>
            </SelectContent>
          </Select>

          {/* Medio ingreso */}
          <Select
            value={medioFilter || "all"}
            onValueChange={(value) => {
              setMedioFilter(value === "all" ? null : value);
              resetToFirstPage();
            }}
          >
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Medio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="logos">Logos</SelectItem>
              <SelectItem value="google">Google</SelectItem>
              <SelectItem value="whatsapp">WhatsApp</SelectItem>
            </SelectContent>
          </Select>

          {/* Registrar */}
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Registrar cliente
          </Button>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-card border rounded-lg overflow-hidden">
        {isLoading ? (
          <p className="p-4 text-center">Cargando...</p>
        ) : (
          <ListaContainer customers={clientes} />
        )}

        {/* Footer de paginación */}
        <div className="px-6 py-4 border-t flex justify-between items-center bg-muted/30">
          <p className="text-sm text-muted-foreground">
            Total: {total} Clientes
          </p>

          <div className="flex gap-2 justify-center items-center">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              <ChevronLeft />
            </Button>

            <span className="text-sm">
              Página {currentPage} de {lastPage}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === lastPage}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
