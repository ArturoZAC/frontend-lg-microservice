import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { listaClientesAction } from "../pages/ListaClientes/actions/listaClientes.action";
import type { ClientesParams } from "../pages/ListaClientes/interfaces/clienteParams.interface";
import type { ClienteInterface } from "../pages/ListaClientes/interfaces/cliente.interface";

// Función auxiliar para generar el Excel
function generarExcel(clientes: ClienteInterface[], nombreArchivo: string) {
  if (clientes.length === 0) {
    throw new Error("No hay clientes para exportar");
  }

  // Mapear los datos para el Excel
  const dataParaExcel = clientes.map((cliente) => ({
    ID: cliente.id,
    Nombres: cliente.nombres,
    Apellidos: cliente.apellidos,
    Empresa: cliente.empresa,
    Celular: cliente.celular,
    Edad: cliente.edad,
    Email: cliente.email,
    Sexo: cliente.sexo,
    "Medio Ingreso": cliente.medio_ingreso,
    Registro: cliente.registro,
    "Tipo Documento": cliente.tipo_documento,
    "Numero Documento": cliente.numero_documento,
    "Registro de Usuario": cliente.created_at,
  }));

  // Crear el libro de Excel
  const worksheet = XLSX.utils.json_to_sheet(dataParaExcel);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Clientes");

  // Ajustar ancho de columnas automáticamente
  const maxWidth = dataParaExcel.reduce((acc, row) => {
    Object.keys(row).forEach((key, i) => {
      const value = String(row[key as keyof typeof row]);
      acc[i] = Math.max(acc[i] || 10, value.length + 2);
    });
    return acc;
  }, [] as number[]);

  worksheet["!cols"] = maxWidth.map((w) => ({ wch: Math.min(w, 50) }));

  // Generar el archivo
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Descargar
  saveAs(blob, nombreArchivo);

  return clientes.length;
}

// ACTION 1: Exportar solo la página actual (respeta per_page y page)
export async function exportPaginaActualAction(params: ClientesParams) {
  const response = await listaClientesAction(params);
  const clientes = response.data;

  const fecha = new Date().toISOString().split("T")[0];
  const nombreArchivo = `clientes_pagina_${params.page}_${fecha}.xlsx`;

  return generarExcel(clientes, nombreArchivo);
}

// ACTION 2: Exportar TODO (ignora paginación, respeta solo filtros)
export async function exportTodoAction(params: Omit<ClientesParams, "page" | "per_page">) {
  const response = await listaClientesAction({
    ...params,
    per_page: 999999, // Traer todos
    page: 1,
  });

  const clientes = response.data;

  const fecha = new Date().toISOString().split("T")[0];
  const nombreArchivo = `clientes_completo_${fecha}.xlsx`;

  return generarExcel(clientes, nombreArchivo);
}
