import { /* useEffect,  */ useState } from "react";
import { ClienteForm } from "./components/ClienteForm";
import { ContactosCard } from "./components/ContactosCard";
// import { MapaMock } from "./components/MapaMock";

export default function CrearClientesPage() {
  const [cliente, setCliente] = useState(null);
  const [contactos, setContactos] = useState([]);

  // useEffect(() => {
  //   console.log({ cliente });
  // }, [cliente]);

  const handleClienteSubmit = (data: any) => {
    setCliente(data);
  };

  const handleAddContacto = (contacto: any) => {
    setContactos([...contactos, contacto]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Clientes</h1>
        </div>

        <div className="w-full">
          <ClienteForm onSubmit={handleClienteSubmit} />
        </div>

        {cliente && (
          <div className="w-full">
            <ContactosCard
              cliente={cliente}
              contactos={contactos}
              onAddContacto={handleAddContacto}
            />
          </div>
        )}

        {/* <div className="w-full">
          <MapaMock />
        </div> */}
      </div>
    </div>
  );
}
