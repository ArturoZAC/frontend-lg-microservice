// actions/listaContactos.action.ts
import { clientesApi } from "@/admin/clientes/api/clientesApi";

export const listaContactosAction = async (clienteId: number) => {
  const response = await clientesApi.get(`/clientes/${clienteId}/contactos`);
  return response.data;
};
