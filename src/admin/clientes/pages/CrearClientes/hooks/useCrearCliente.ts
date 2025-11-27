// hooks/useCrearCliente.ts
import { useMutation } from "@tanstack/react-query";
import type { ClienteFormValues } from "../components/ClienteForm";
import { crearClienteAction } from "../actions/crearCliente.action";

export const useCrearCliente = () => {
  return useMutation({
    mutationFn: (data: ClienteFormValues) => crearClienteAction(data),
  });
};
