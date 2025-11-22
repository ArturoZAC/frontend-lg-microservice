"use client";

import { useState, useMemo } from "react";
import { Search, Plus, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MOCK_CUSTOMERS } from "@/lib/mock-data";
import { ListaContainer } from "../components/ListaContainer";

const ITEMS_PER_PAGE = 10;

export function ListaClientesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [registroFilter, setRegistroFilter] = useState<string | null>(null);
  const [medioFilter, setMedioFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter customers
  const filteredCustomers = useMemo(() => {
    return MOCK_CUSTOMERS.filter((customer) => {
      const matchesSearch =
        customer.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.celular.includes(searchTerm);

      const matchesRegistro = !registroFilter || customer.registro === registroFilter;
      const matchesMedio = !medioFilter || customer.medio_ingreso === medioFilter;

      return matchesSearch && matchesRegistro && matchesMedio;
    });
  }, [searchTerm, registroFilter, medioFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / ITEMS_PER_PAGE);
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to first page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters Bar */}
      <div className="bg-card border border-border rounded-lg p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, empresa o celular..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleFilterChange();
              }}
            />
          </div>

          {/* Register Filter */}
          <Select
            value={registroFilter || "all"}
            onValueChange={(value) => {
              setRegistroFilter(value === "all" ? null : value);
              handleFilterChange();
            }}
          >
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Registro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Sistema">Sistema</SelectItem>
              <SelectItem value="Pag Web">Pag Web</SelectItem>
            </SelectContent>
          </Select>

          {/* Medium Filter */}
          <Select
            value={medioFilter || "all"}
            onValueChange={(value) => {
              setMedioFilter(value === "all" ? null : value);
              handleFilterChange();
            }}
          >
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Medio" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="WhatsApp">WhatsApp</SelectItem>
              <SelectItem value="Google">Google</SelectItem>
              <SelectItem value="Facebook">Facebook</SelectItem>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="Referencia">Referencia</SelectItem>
            </SelectContent>
          </Select>

          {/* Register Button */}
          <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Registrar cliente</span>
            <span className="sm:hidden">Registrar</span>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <ListaContainer customers={paginatedCustomers} />

        {/* Pagination and Record Count */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-muted/30">
          <p className="text-sm text-muted-foreground">
            Mostrando {paginatedCustomers.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} -{" "}
            {Math.min(currentPage * ITEMS_PER_PAGE, filteredCustomers.length)} de{" "}
            {filteredCustomers.length} registros
          </p>

          {/* Pagination Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft />
            </Button>

            {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(pageNum)}
                  className={currentPage === pageNum ? "bg-primary text-primary-foreground" : ""}
                >
                  {pageNum}
                </Button>
              );
            })}

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
