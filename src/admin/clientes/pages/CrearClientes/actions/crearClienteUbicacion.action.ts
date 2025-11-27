import { clientesApi } from "@/admin/clientes/api/clientesApi";

export interface CrearUbicacionDto {
  latitud: string;
  longitud: string;
  pais: string;
  departamento: string;
  distrito: string;
  cliente_id: string;
}

export const crearUbicacionAction = async (data: CrearUbicacionDto) => {
  const { cliente_id, ...payload } = data;

  const response = await clientesApi.post(`/clientes/${cliente_id}/ubicaciones`, payload);

  return response.data;
};
