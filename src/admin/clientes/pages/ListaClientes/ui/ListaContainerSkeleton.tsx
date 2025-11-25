import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ListaContainerSkeleton() {
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
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 10 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-4 w-8 mx-auto" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-4 w-32 mx-auto" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-4 w-24 mx-auto" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-4 w-20 mx-auto" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-4 w-24 mx-auto" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-4 w-28 mx-auto" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-5 w-24 mx-auto rounded-full" />
              </TableCell>

              <TableCell className="text-center">
                <Skeleton className="h-8 w-8 rounded-md mx-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
