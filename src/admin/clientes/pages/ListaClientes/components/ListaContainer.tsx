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
import { setWordPascalCase } from "../helpers/setWordPascalCase";
import { medioColors } from "../helpers/colors";
import { medioIcons } from "../helpers/medioIcons";
import { CopyText } from "@/admin/shared/CopyText";
import { getShortName } from "../helpers/getShortName";

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
                  <div className="flex flex-row items-center justify-center">
                    {getShortName(customer.nombres, customer.apellidos)}
                    {/* <CopyText text={`${customer.nombres} ${customer.apellidos}`} /> */}
                    <CopyText text={getShortName(customer.nombres, customer.apellidos)} />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-row items-center justify-center">
                    {customer.empresa}
                    <CopyText text={customer.empresa} />
                  </div>
                </TableCell>
                <TableCell className="font-mono">
                  <div className="flex flex-row items-center justify-center">
                    {customer.celular}
                    <CopyText text={customer.celular} />
                  </div>
                </TableCell>
                <TableCell className="text-xs">
                  {setWordPascalCase(customer.tipo_documento)}
                </TableCell>
                <TableCell className="font-mono">
                  <div className="flex flex-row items-center justify-center">
                    {customer.numero_documento}
                    <CopyText text={customer.numero_documento} />
                  </div>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      medioColors[setWordPascalCase(customer.medio_ingreso)] ||
                      "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {medioIcons[setWordPascalCase(customer.medio_ingreso)]}
                    {setWordPascalCase(customer.medio_ingreso)}
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
                      { label: "Editar", href: `/editar-cliente/${customer.id}` },
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
