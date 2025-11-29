import { z } from "zod";

export const clienteSchema = z.object({
  nombres: z.string().min(1, "Nombres es obligatorio"),
  apellidos: z.string().min(1, "Apellidos es obligatorio"),
  empresa: z.string().min(1, "Empresa es obligatorio"),
  tipo_documento: z.string().min(1, "Tipo de documento es obligatorio"),
  numero_documento: z.string().min(1, "Número de documento es obligatorio"),
  email: z.string().email("Email inválido"),
  celular: z
    .string()
    .min(1, "Celular es obligatorio")
    .refine((val) => !val || val.length >= 9, "Celular debe tener al menos 9 dígitos"),
  sexo: z.string().min(1, "Sexo es obligatorio"),
  medio_ingreso: z.string().min(1, "Medio de ingreso es obligatorio"),
  edad: z
    .string()
    .min(1, "Edad es obligatorio")
    .refine((val) => !val || val.length <= 3, "Edad debe tener máximo 3 dígitos"),
});

export type ClienteFormValues = z.infer<typeof clienteSchema>;
