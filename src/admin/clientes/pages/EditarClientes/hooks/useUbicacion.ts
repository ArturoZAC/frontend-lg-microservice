// hooks/useUbicacion.ts
import { useQuery } from "@tanstack/react-query";
import { obtenerUbicacionAction } from "../actions/obtenerUbicacion.action";

export const useUbicacion = (idCliente: number) => {
  return useQuery({
    queryKey: ["ubicacion", idCliente],
    queryFn: () => obtenerUbicacionAction(idCliente),
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!idCliente,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
