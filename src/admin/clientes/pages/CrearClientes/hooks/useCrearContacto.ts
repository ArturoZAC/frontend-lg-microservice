import { useMutation } from "@tanstack/react-query";
import { crearContactoAction, type CrearContactoDto } from "../actions/crearClienteContacto.action";

export const useCrearContacto = () => {
  return useMutation({
    mutationFn: (data: CrearContactoDto) => crearContactoAction(data),
  });
};
