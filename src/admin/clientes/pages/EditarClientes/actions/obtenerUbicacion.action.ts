// actions/obtenerUbicacion.action.ts
import { clientesApi } from "@/admin/clientes/api/clientesApi";

interface UbicacionInterface {
  id: number;
  cliente_id: number;
  latitud: string;
  longitud: string;
  pais: string;
  departamento: string;
  distrito: string;
}

export const obtenerUbicacionAction = async (
  idCliente: number
): Promise<UbicacionInterface | null> => {
  try {
    const { data } = await clientesApi.get<UbicacionInterface[]>(
      // `/clientes/ubicaciones/${idCliente}`
      `/clientes/${idCliente}/ubicaciones`
    );
    return data?.[0] ?? null;
  } catch {
    throw new Error("No se pudo obtener la ubicación del cliente");
  }
};
