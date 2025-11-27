import { clientesApi } from "@/admin/clientes/api/clientesApi";
import type { ClienteInterface } from "../../ListaClientes/interfaces/cliente.interface";
import type { ClienteFormValues } from "../components/ClienteForm";

export const crearClienteAction = async (data: ClienteFormValues): Promise<ClienteInterface> => {
  const response = await clientesApi.post<ClienteInterface>("/clientes", data);
  // console.log({ data: response.data });
  return response.data;
};
