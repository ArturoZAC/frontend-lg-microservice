"use client";

import { useState } from "react";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface ContactosCardProps {
  cliente: any;
  contactos: any[];
  onAddContacto: (contacto: any) => void;
}

export function ContactosCard({ cliente, contactos, onAddContacto }: ContactosCardProps) {
  const [showForm, setShowForm] = useState(false);

  // Zod schema dentro del archivo, usando snake_case
  const contactoSchema = z.object({
    nombres: z.string().min(1, "El nombre es obligatorio"),
    // celular: z.string().optional(),
    celular: z.string().min(1, "El celular es obligatorio"),
    // correo: z.string().email("Email inválido").optional(),
    correo: z.string().email("Email inválido"),
    tipo_documento: z.string().min(1, "Tipo de documento es obligatorio"),
    // numero_documento: z.string().optional(),
    numero_documento: z.string().min(1, "El numero documento es obligatorio"),
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactoSchema),
    defaultValues: {
      nombres: "",
      celular: "",
      correo: "",
      tipo_documento: "",
      numero_documento: "",
    },
  });

  const onSubmit = (data: any) => {
    onAddContacto({ ...data, cliente_id: cliente.id });
    reset();
    setShowForm(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Información de Contactos - {cliente.nombres} {cliente.apellidos}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {showForm && (
          <div className="border-b pb-6">
            <h3 className="text-lg font-semibold mb-4">Añadir Nuevo Contacto</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombres">Nombres *</Label>
                  <Input id="nombres" {...register("nombres")} placeholder="Ej: Carlos" />
                  {errors.nombres && <span className="text-red-500">{errors.nombres.message}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="celular">Celular</Label>
                  <Input id="celular" {...register("celular")} placeholder="Ej: 987654321" />
                  {errors.celular && <span className="text-red-500">{errors.celular.message}</span>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="correo">Correo</Label>
                  <Input
                    id="correo"
                    type="email"
                    {...register("correo")}
                    placeholder="Ej: carlos@example.com"
                  />
                  {errors.correo && <span className="text-red-500">{errors.correo.message}</span>}
                </div>

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
                  <Label htmlFor="numero_documento">Número Documento</Label>
                  <Input
                    id="numero_documento"
                    {...register("numero_documento")}
                    placeholder="Ej: 87654321"
                  />
                  {errors.numero_documento && (
                    <span className="text-red-500">{errors.numero_documento.message}</span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit">Guardar Contacto</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancelar
                </Button>
              </div>
            </form>
          </div>
        )}

        {contactos.length > 0 ? (
          <Accordion type="single" collapsible>
            {contactos.map((contacto, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-base font-semibold">
                  {contacto.nombres}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    <p>Nombre: {contacto.nombres}</p>
                    <p>Celular: {contacto.celular || "No especificado"}</p>
                    <p>Correo: {contacto.correo || "No especificado"}</p>
                    <p>Tipo Documento: {contacto.tipo_documento}</p>
                    <p>Número Documento: {contacto.numero_documento || "No especificado"}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-muted-foreground text-center py-4">
            {showForm ? "" : "No hay contactos registrados"}
          </p>
        )}

        {!showForm && (
          <Button onClick={() => setShowForm(true)} variant="outline" className="w-full">
            Añadir Contacto
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
