import { clientesApi } from "@/admin/clientes/api/clientesApi";

export interface CrearContactoDto {
  nombres: string;
  celular: string;
  correo: string;
  tipo_documento: string;
  numero_documento: string;
  cliente_id: number;
}

export const crearContactoAction = async (data: CrearContactoDto) => {
  const { cliente_id, ...payload } = data;

  const response = await clientesApi.post(
    `/clientes/${cliente_id}/contactos`,
    payload
  );

  return response.data;
};
