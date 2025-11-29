// hooks/useContactos.ts
import { useQuery /* useQueryClient  */ } from "@tanstack/react-query";
import { listaContactosAction } from "../actions/listaContactos.action";

export function useContactos(clienteId: number) {
  // const queryClient = useQueryClient();

  const contactosQuery = useQuery({
    queryKey: ["contactos", clienteId],
    queryFn: () => listaContactosAction(clienteId),
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60 * 4,
    enabled: !!clienteId,
  });

  // const prefetchContactos = () => {
  //   queryClient.prefetchQuery({
  //     queryKey: ["contactos", clienteId],
  //     queryFn: () => listaContactosAction(clienteId),
  //   });
  // };

  return { contactosQuery /* prefetchContactos */ };
}
