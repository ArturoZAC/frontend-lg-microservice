import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react"; // ícono de cerrar
import { useNavigate } from "react-router-dom";

interface ClienteFormSkeletonProps {
  loading?: boolean;
}

export function ClienteFormSkeleton({ loading = true }: ClienteFormSkeletonProps) {
  const navigate = useNavigate();
  if (!loading) return null;

  return (
    <div className="mt-10 space-y-4 px-8">
      {/* Cabecera con título y botón cerrar */}
      <div className="flex flex-row justify-between items-center">
        <Skeleton className="h-10 w-64" /> {/* Simula el título */}
        <Button variant={"destructive"} onClick={() => navigate(-1)} className="h-10 w-10 p-0">
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Card con skeletons de formulario */}
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-6 w-48" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Primera fila */}
            <div className="flex flex-row gap-x-6 xl:gap-x-10">
              <div className="max-w-full w-3/4 xl:w-2/4 flex flex-col gap-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              {/* Lado derecho */}
              <div className="max-w-full xl:w-2/4 flex flex-col gap-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>

            {/* Botón */}
            <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
