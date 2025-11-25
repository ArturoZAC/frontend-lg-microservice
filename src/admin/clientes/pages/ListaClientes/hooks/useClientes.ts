import { useQuery, useQueryClient } from "@tanstack/react-query";

import { listaClientesAction } from "../actions/listaClientes.action";
import type { ClientesParams } from "../interfaces/clienteParams.interface";

export function useClientes(params: ClientesParams) {
  const queryClient = useQueryClient();

  const clientesQuery = useQuery({
    queryKey: ["clientes", params],
    queryFn: () => listaClientesAction(params),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 4,
  });

  const prefetchNextPage = () => {
    const nextPage = (params.page ?? 1) + 1;
    queryClient.prefetchQuery({
      queryKey: ["clientes", { ...params, page: nextPage }],
      queryFn: () => listaClientesAction({ ...params, page: nextPage }),
    });
  };

  return { clientesQuery, prefetchNextPage };
}
