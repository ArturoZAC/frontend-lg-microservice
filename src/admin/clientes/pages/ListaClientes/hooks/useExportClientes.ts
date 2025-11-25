import { useState } from "react";
import type { ClientesParams } from "../interfaces/clienteParams.interface";
import {
  exportPaginaActualAction,
  exportTodoAction,
} from "@/admin/clientes/actions/exportClientes.action";

export function useExportClientes() {
  const [isExporting, setIsExporting] = useState(false);

  // Exportar página actual
  const exportarPaginaActual = async (params: ClientesParams) => {
    try {
      setIsExporting(true);
      const totalExportados = await exportPaginaActualAction(params);
      return { success: true, total: totalExportados };
    } catch (error) {
      console.error("Error al exportar:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    } finally {
      setIsExporting(false);
    }
  };

  // Exportar todo
  const exportarTodo = async (params: Omit<ClientesParams, "page" | "per_page">) => {
    try {
      setIsExporting(true);
      const totalExportados = await exportTodoAction(params);
      return { success: true, total: totalExportados };
    } catch (error) {
      console.error("Error al exportar:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      };
    } finally {
      setIsExporting(false);
    }
  };

  return { exportarPaginaActual, exportarTodo, isExporting };
}
