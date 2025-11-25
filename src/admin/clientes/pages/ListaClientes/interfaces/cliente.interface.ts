export interface ClienteInterface {
  id: number;
  nombres: string;
  apellidos: string;
  empresa: string;
  celular: string;
  password: string;
  edad: number;
  email: string;
  sexo: string;
  medio_ingreso: string;
  registro: string;
  tipo_documento: string;
  numero_documento: string;
  estado: number;
  antiguo: number;
  puntuacion: number;
  created_at: string;
}

export interface ClientesResponse {
  data: ClienteInterface[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}
