// 1. Librerías externas
import { useState } from "react";
import { Download, FileDown, Plus, Search } from "lucide-react";
import { IconFileTypeXls } from "@tabler/icons-react";
import { toast } from "sonner";

// 2. Componentes globales de UI
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// 3. Componentes compartidos del admin
import { SelectFiltro } from "@/admin/shared/SelectFiltro";
import { PaginationFooter } from "@/admin/shared/PaginationFooter";

// 4. Hooks personalizados
import { useClientes } from "./hooks/useClientes";
import { useClientesFilters } from "./hooks/useClientesFilters";
import { useExportClientes } from "./hooks/useExportClientes";

// 5. Componentes locales
import { ListaContainer } from "./components/ListaContainer";
import { ListaContainerSkeleton } from "./ui/ListaContainerSkeleton";
import { ClienteDetailModal } from "./components/ClienteDetailModal";
import { type ClienteInterface } from "./interfaces/cliente.interface";
import { useNavigate } from "react-router-dom";
import { clientes } from "./mock/cliente.mock";

const registroOptions = [
  { label: "Todos", value: "all" },
  { label: "Sistema", value: "sistema" },
  { label: "Página web", value: "pagina_web" },
];

const medioOptions = [
  { label: "Todos", value: "all" },
  { label: "Facebook", value: "facebook" },
  { label: "WhatsApp", value: "whatsapp" },
  { label: "Google", value: "google" },
  { label: "Instagram", value: "instagram" },
  { label: "Post venta", value: "post_venta" },
  { label: "Recomendación", value: "recomendacion" },
  { label: "Logos", value: "logos" },
];

const tipoDocumentoOptions = [
  { label: "Todos", value: "all" },
  { label: "DNI", value: "dni" },
  { label: "RUC", value: "ruc" },
  { label: "DNI Extranjero", value: "dni_extranjeria" },
];

export function ListaClientesPage() {
  const [selectedClient, setSelectedClient] = useState<ClienteInterface | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    currentPage,
    searchTerm,
    debounceSearch,
    tipoDocumentoFilter,
    medioFilter,
    perPage,
    registroFilter,
    setCurrentPage,
    setSearchTerm,
    setMedioFilter,
    setRegistroFilter,
    setTipoDocumentoFilter,
    setPerPage,
    resetToFirstPage,
  } = useClientesFilters(300);

  const { clientesQuery, prefetchNextPage } = useClientes({
    page: currentPage,
    search: debounceSearch,
    registro: registroFilter ?? undefined,
    tipo_documento: tipoDocumentoFilter ?? undefined,
    medio_ingreso: medioFilter ?? undefined,
    per_page: perPage ?? 10,
  });

  const { exportarPaginaActual, exportarTodo, isExporting } = useExportClientes();

  const { data, isLoading } = clientesQuery;

  // const clientes = data?.data ?? [];
  const total = data?.total ?? 0;
  const lastPage = data?.last_page ?? 1;

  const handleExportarPaginaActual = async () => {
    const result = await exportarPaginaActual({
      page: currentPage,
      per_page: perPage,
      search: debounceSearch || undefined,
      registro: registroFilter === "all" ? undefined : registroFilter || undefined,
      medio_ingreso: medioFilter === "all" ? undefined : medioFilter || undefined,
      tipo_documento: tipoDocumentoFilter === "all" ? undefined : tipoDocumentoFilter || undefined,
    });

    if (result.success) {
      toast.success(`${result.total} clientes de la página actual exportados`);
    } else {
      toast.error(result.error || "Error al exportar");
    }
  };

  const handleExportarTodo = async () => {
    const result = await exportarTodo({
      search: debounceSearch || undefined,
      registro: registroFilter === "all" ? undefined : registroFilter || undefined,
      medio_ingreso: medioFilter === "all" ? undefined : medioFilter || undefined,
      tipo_documento: tipoDocumentoFilter === "all" ? undefined : tipoDocumentoFilter || undefined,
    });

    if (result.success) {
      toast.success(`${result.total} clientes exportados exitosamente`);
    } else {
      toast.error(result.error || "Error al exportar");
    }
  };

  return (
    <>
      <ClienteDetailModal
        cliente={selectedClient}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />

      <div className="space-y-4">
        {/* Search & filters */}
        <div className="bg-card  space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-end">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              {/* <Label>Buscador</Label> */}
              <Input
                placeholder="Buscar Cliente, Empresa, Celular, Nro Documento..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  resetToFirstPage();
                }}
              />
            </div>

            {/* Registro */}
            <SelectFiltro
              label="Registro"
              value={registroFilter}
              onChange={(val) => {
                setRegistroFilter(val);
                resetToFirstPage();
              }}
              placeholder="Registro"
              options={registroOptions}
            />

            {/* Medio ingreso */}
            <SelectFiltro
              label="Medio Ingreso"
              value={medioFilter}
              onChange={(val) => {
                setMedioFilter(val);
                resetToFirstPage();
              }}
              placeholder="Medio"
              options={medioOptions}
            />

            {/* Tipo de documento */}
            <SelectFiltro
              label="Tipo de documento"
              value={tipoDocumentoFilter}
              onChange={(val) => {
                setTipoDocumentoFilter(val);
                resetToFirstPage();
              }}
              placeholder="Tipo de documento"
              options={tipoDocumentoOptions}
            />

            <DropdownMenu>
              <DropdownMenuTrigger
                asChild
                // className="bg-secondary/90 text-white hover:bg-secondary hover:text-white"
              >
                <Button variant="secondary" className="gap-2" disabled={isExporting || total === 0}>
                  <IconFileTypeXls className="h-4 w-4" />
                  {isExporting ? "Exportando..." : "Exportar"}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleExportarPaginaActual} className="text-xs">
                  <FileDown className="h-4 w-4 mr-2" />
                  Página actual ({clientes.length} registros)
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleExportarTodo} className="text-xs">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar todo ({total} registros)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Registrar */}
            <Button className="gap-2" onClick={() => navigate("/agregar-cliente")}>
              <Plus className="h-4 w-4" />
              Registrar cliente
            </Button>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-card border rounded-lg overflow-hidden">
          {isLoading ? (
            <ListaContainerSkeleton />
          ) : (
            <ListaContainer
              customers={clientes}
              onSelectCustomer={(cliente) => {
                setSelectedClient(cliente);
                setIsModalOpen(true);
              }}
            />
          )}
          {/* {isLoading ? <ListaContainer customers={clientes} /> : <ListaContainerSkeleton />} */}

          <PaginationFooter
            wordPage="Clientes"
            total={total}
            perPage={perPage}
            currentPage={currentPage}
            lastPage={lastPage}
            onChangePage={setCurrentPage}
            onChangePerPage={(num) => {
              setPerPage(num);
              resetToFirstPage();
            }}
            perPageOptions={[10, 20, 50, 100]}
            onPrefetchNext={prefetchNextPage}
          />
        </div>
      </div>
    </>
  );
}
