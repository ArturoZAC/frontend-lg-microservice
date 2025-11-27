import { useState } from "react";
import { ClienteForm } from "./components/ClienteForm";
import { ContactosCard } from "./components/ContactosCard";
import { GoogleMapSearch } from "./components/GoogleMapSearch";
import type { ClienteInterface } from "../ListaClientes/interfaces/cliente.interface";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CrearClientesPage() {
  const [cliente, setCliente] = useState<ClienteInterface | null>(null);
  const [contactos, setContactos] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleClienteSubmit = (data: any) => {
    setCliente(data);
  };

  const handleAddContacto = (contacto: any) => {
    setContactos([...contactos, contacto]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
        <div className="flex flex-row justify-between">
          <h1 className="text-3xl font-bold text-foreground">Gestión de Clientes</h1>
          <Button variant={"destructive"} onClick={() => navigate(-1)}>
            <X />
          </Button>
        </div>

        <ClienteForm onSubmit={handleClienteSubmit} />

        {cliente && (
          <ContactosCard
            cliente={cliente}
            contactos={contactos}
            onAddContacto={handleAddContacto}
          />
        )}

        {cliente && (
          <div className="w-full">
            <GoogleMapSearch idCliente={cliente.id} />
          </div>
        )}
      </div>
    </div>
  );
}
