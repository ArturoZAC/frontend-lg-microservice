// import { MoreVertical } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ActionDropdown } from "@/admin/shared/ActionDropdown";
import type { ClienteInterface } from "../interfaces/cliente.interface";

interface Customer {
  id: number;
  nombres: string;
  apellidos: string;
  empresa: string;
  celular: string;
  tipo_documento: string;
  numero_documento: string;
  medio_ingreso: string;
  created_at?: string;
}

interface CustomersTableProps {
  customers: Customer[];
  onSelectCustomer: (c: ClienteInterface) => void;
}

export function ListaContainer({ customers, onSelectCustomer }: CustomersTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead>Celular</TableHead>
            <TableHead>Tipo de Documento</TableHead>
            <TableHead>Número de Documento</TableHead>
            <TableHead>Medio de Ingreso</TableHead>
            {/* <TableHead>Fecha de Creación</TableHead> */}
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length > 0 ? (
            customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-mono text-xs">{customer.id}</TableCell>
                <TableCell className="font-medium">
                  {customer.nombres} {customer.apellidos}
                </TableCell>
                <TableCell>{customer.empresa}</TableCell>
                <TableCell>{customer.celular}</TableCell>
                <TableCell className="text-xs">{customer.tipo_documento}</TableCell>
                <TableCell className="font-mono text-xs">{customer.numero_documento}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {customer.medio_ingreso}
                  </span>
                </TableCell>
                {/* <TableCell className="text-xs">{customer.created_at}</TableCell> */}
                <TableCell className="text-center">
                  <ActionDropdown
                    options={[
                      {
                        label: "Ver",
                        onClick: () => onSelectCustomer(customer as ClienteInterface),
                      },
                      { label: "Editar", href: `/clientes/${customer.id}/edit` },
                      // {
                      //   label: "Eliminar",
                      //   destructive: true,
                      //   onClick: () => console.log("Eliminar", customer.id),
                      // },
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center text-muted-foreground py-8">
                No se encontraron clientes
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
