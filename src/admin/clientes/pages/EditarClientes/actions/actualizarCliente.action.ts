import { clientesApi } from "@/admin/clientes/api/clientesApi";
import type { ClienteInterface } from "../../ListaClientes/interfaces/cliente.interface";

export const actualizarCliente = async (
  id: number,
  data: Partial<Omit<ClienteInterface, "id" | "created_at" | "registro">>
): Promise<ClienteInterface> => {
  try {
    const response = await clientesApi.put<ClienteInterface>(`/clientes/${id}`, data);
    return response.data;
  } catch /* (error) */ {
    // console.error("Error al actualizar cliente:", error);
    throw new Error("No se pudo actualizar el cliente");
  }
};
