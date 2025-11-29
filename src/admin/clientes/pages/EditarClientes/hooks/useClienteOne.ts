import { useQuery /* useQueryClient */ } from "@tanstack/react-query";
import { buscarClientePorId } from "../actions/buscarClientePorId.action";
import type { ClienteInterface } from "../../ListaClientes/interfaces/cliente.interface";

export function useCliente(idCliente: number | undefined) {
  // const queryClient = useQueryClient();

  const clienteQuery = useQuery<ClienteInterface, Error>({
    queryKey: ["cliente", idCliente],
    queryFn: async () => {
      if (!idCliente) throw new Error("ID de cliente no proporcionado");
      return await buscarClientePorId(idCliente);
    },
    enabled: !!idCliente, // solo corre si idCliente existe
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 4, // 4 minutos
  });

  // const prefetchCliente = () => {
  //   if (idCliente) {
  //     queryClient.prefetchQuery({
  //       queryKey: ["cliente", idCliente],
  //       queryFn: () => buscarClientePorId(idCliente),
  //     });
  //   }
  // };

  return { ...clienteQuery /* prefetchCliente */ };
}
