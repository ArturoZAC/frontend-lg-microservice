import { clientesApi } from "@/admin/clientes/api/clientesApi"

import type {  ClientesResponse } from "../interfaces/cliente.interface"
import type { ClientesParams } from "../interfaces/clienteParams.interface";

export const listaClientesAction = async(params: ClientesParams = {}): Promise<ClientesResponse> => {

  const { data } = await clientesApi.get<ClientesResponse>('/clientes', 
    {
      params
    }
  )

  return data;
}
