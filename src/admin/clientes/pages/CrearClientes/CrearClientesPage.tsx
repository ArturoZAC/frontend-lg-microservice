import { useState } from "react";
import { ClienteForm } from "./components/ClienteForm";
import { ContactosCard } from "./components/ContactosCard";
import { GoogleMapSearch } from "./components/GoogleMapSearch";
import type { ClienteInterface } from "../ListaClientes/interfaces/cliente.interface";

export default function CrearClientesPage() {
  const [cliente, setCliente] = useState<ClienteInterface>(null);
  const [contactos, setContactos] = useState<any[]>([]);

  const handleClienteSubmit = (data: any) => {
    setCliente(data);
  };

  const handleAddContacto = (contacto: any) => {
    setContactos([...contactos, contacto]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
        <h1 className="text-3xl font-bold text-foreground">Gestión de Clientes</h1>

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
