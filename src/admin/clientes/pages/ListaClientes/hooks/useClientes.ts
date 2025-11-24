import { useQuery } from "@tanstack/react-query";

import type { ClientesParams } from "../interfaces/clienteParams.interface";
import { listaClientesAction } from "../actions/listaClientes.action";


export function useClientes(params: ClientesParams) {

  const clientesQuery = useQuery({
    queryKey: ["clientes", params],
    queryFn: () => listaClientesAction(params),
  });

  return clientesQuery;
}