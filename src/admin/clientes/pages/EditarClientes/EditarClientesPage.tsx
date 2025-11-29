import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { ContactosCard } from "../CrearClientes/components/ContactosCard";
import { GoogleMapSearch } from "../CrearClientes/components/GoogleMapSearch";
import { useCliente } from "./hooks/useClienteOne";
import { ClienteForm } from "../../components/ClienteForm";
import { ClienteFormSkeleton } from "../../ui/ClienteFormSkeleton";
import { useContactos } from "./hooks/useContactos";
import { useQueryClient } from "@tanstack/react-query";

export default function EditarClientesPage() {
  const { idCliente } = useParams<{ idCliente: string }>();
  const navigate = useNavigate();
  const { data: cliente, isLoading, error } = useCliente(Number(idCliente));

  const { contactosQuery } = useContactos(Number(idCliente));
  const queryClient = useQueryClient();

  const handleAddContacto = (nuevoContacto: unknown) => {
    // actualizamos la cache de contactos para este cliente
    queryClient.setQueryData(["contactos", idCliente], (oldData: unknown[] | undefined) => [
      ...(oldData ?? []),
      nuevoContacto,
    ]);
  };

  // useEffect(() => {
  //   console.log({ idCliente });
  //   console.log({ cliente });
  // }, [cliente]);

  if (isLoading) return <ClienteFormSkeleton />;
  if (error) return <div className="p-4 text-red-500">Error cargando cliente</div>;
  if (!cliente) return <div className="p-4">Cliente no encontrado</div>;

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 max-w-6xl w-full">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold text-foreground">Editar Cliente</h1>
          <Button variant={"destructive"} size={"icon"} onClick={() => navigate("/")}>
            <X />
          </Button>
        </div>

        <ClienteForm
          defaultValues={cliente ? { ...cliente, edad: String(cliente.edad) } : undefined}
        />

        {/* Contactos siempre listos */}
        <ContactosCard
          cliente={cliente}
          contactos={contactosQuery.data ?? []}
          onAddContacto={handleAddContacto}
        />

        {/* Google Map siempre listo */}
        <div className="w-full">
          <GoogleMapSearch idCliente={cliente.id} />
        </div>
      </div>
    </div>
  );
}
