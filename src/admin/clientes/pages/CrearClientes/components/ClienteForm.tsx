import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useCrearCliente } from "../hooks/useCrearCliente";
import { toast } from "sonner";
import type { ClienteInterface } from "../../ListaClientes/interfaces/cliente.interface";

// Schema Zod
const clienteSchema = z.object({
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

interface ClienteFormProps {
  onSubmit: (data: ClienteInterface) => void;
}

export function ClienteForm({ onSubmit }: ClienteFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ClienteFormValues>({
    resolver: zodResolver(clienteSchema),
    defaultValues: {
      nombres: "",
      apellidos: "",
      empresa: "",
      tipo_documento: "",
      numero_documento: "",
      email: "",
      celular: "",
      sexo: "",
      medio_ingreso: "",
      edad: "",
    },
  });

  const crearClienteMutation = useCrearCliente();

  const onFormSubmit = (data: ClienteFormValues) => {
    crearClienteMutation.mutate(data, {
      onSuccess: (clienteCreado) => {
        toast.success("Cliente creado correctamente");
        onSubmit(clienteCreado);
      },
      onError: () => {
        toast.error("El Correo debe ser unico");
      },
    });

    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear Cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Primera fila */}
          <div className="flex flex-row gap-x-6 xl:gap-x-10">
            <div className="max-w-full w-3/4 xl:w-2/4 flex flex-col gap-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombres">Nombres *</Label>
                  <Input id="nombres" placeholder="Ej: Juan" {...register("nombres")} />
                  {errors.nombres && (
                    <span className="text-red-500 text-sm">{errors.nombres.message}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apellidos">Apellidos *</Label>
                  <Input id="apellidos" placeholder="Ej: Pérez" {...register("apellidos")} />
                  {errors.apellidos && (
                    <span className="text-red-500 text-sm">{errors.apellidos.message}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="empresa">Empresa*</Label>
                  <Input id="empresa" placeholder="Ej: Tech Solutions" {...register("empresa")} />
                  {errors.empresa && (
                    <span className="text-red-500 text-sm">{errors.empresa.message}</span>
                  )}
                </div>
              </div>

              {/* Segunda fila */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Ej: juan@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-red-500 text-sm">{errors.email.message}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="celular">Celular*</Label>
                  <Input id="celular" placeholder="Ej: 987654321" {...register("celular")} />
                  {errors.celular && (
                    <span className="text-red-500 text-sm">{errors.celular.message}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edad">Edad*</Label>
                  <Input id="edad" type="number" placeholder="Ej: 30" {...register("edad")} />
                  {errors.edad && (
                    <span className="text-red-500 text-sm">{errors.edad.message}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Lado derecho */}
            <div className="max-w-full xl:w-2/4 flex flex-col gap-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sexo">Sexo *</Label>
                  <Controller
                    name="sexo"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar sexo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="masculino">Masculino</SelectItem>
                          <SelectItem value="femenino">Femenino</SelectItem>
                          <SelectItem value="otro">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.sexo && (
                    <span className="text-red-500 text-sm">{errors.sexo.message}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medio_ingreso">Medio Ingreso *</Label>
                  <Controller
                    name="medio_ingreso"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar medio" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                          <SelectItem value="google">Google</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="post_venta">Post Venta</SelectItem>
                          <SelectItem value="recomendacion">Recomendación</SelectItem>
                          <SelectItem value="logos">Logos</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.medio_ingreso && (
                    <span className="text-red-500 text-sm">{errors.medio_ingreso.message}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo_documento">Tipo de Documento *</Label>
                  <Controller
                    name="tipo_documento"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar Documento" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dni">DNI</SelectItem>
                          <SelectItem value="ruc">RUC</SelectItem>
                          <SelectItem value="dni_extranjeria">DNI Extranjería</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.tipo_documento && (
                    <span className="text-red-500 text-sm">{errors.tipo_documento.message}</span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numero_documento">Nº de Documento *</Label>
                  <Input
                    id="numero_documento"
                    placeholder="Ej: 12345678"
                    {...register("numero_documento")}
                  />
                  {errors.numero_documento && (
                    <span className="text-red-500 text-sm">{errors.numero_documento.message}</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Crear Cliente
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
