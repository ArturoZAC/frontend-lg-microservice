import { clientesApi } from "@/admin/clientes/api/clientesApi";
import type { ClienteInterface } from "../../ListaClientes/interfaces/cliente.interface";

export const buscarClientePorId = async (id: number): Promise<ClienteInterface> => {
  try {
    const { data } = await clientesApi.get<ClienteInterface>(`/clientes/${id}`);
    return data;
  } catch /* (error) */ {
    // console.error("Error al obtener cliente:", error);
    throw new Error("No se pudo obtener el cliente");
  }
};
