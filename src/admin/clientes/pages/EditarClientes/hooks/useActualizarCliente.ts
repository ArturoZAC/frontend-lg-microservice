// hooks/useActualizarCliente.ts
import { useMutation } from "@tanstack/react-query";
import { actualizarCliente } from "../actions/actualizarCliente.action";
import type { ClienteFormValues } from "@/admin/clientes/schemas/cliente.schema";

interface ActualizarClienteParams {
  id: number;
  data: ClienteFormValues;
}

export const useActualizarCliente = () => {
  return useMutation({
    mutationFn: ({ id, data }: ActualizarClienteParams) =>
      actualizarCliente(id, {
        ...data,
        edad: Number(data.edad),
      }),
  });
};
