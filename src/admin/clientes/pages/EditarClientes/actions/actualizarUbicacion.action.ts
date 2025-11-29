// actions/actualizarUbicacion.action.ts
import { clientesApi } from "@/admin/clientes/api/clientesApi";

interface UbicacionActualizarPayload {
  id: number; // ID de la ubicación existente
  cliente_id: string;
  latitud: string;
  longitud: string;
  pais?: string;
  departamento?: string;
  distrito?: string;
}

export const actualizarUbicacionAction = async (ubicacion: UbicacionActualizarPayload) => {
  const { data } = await clientesApi.put(`/clientes/ubicaciones/${ubicacion.id}`, ubicacion);
  return data;
};
