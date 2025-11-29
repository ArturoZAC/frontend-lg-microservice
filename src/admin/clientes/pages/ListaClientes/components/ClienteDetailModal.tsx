import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Building2 } from "lucide-react";
import type { ClienteInterface } from "../interfaces/cliente.interface";
import { setWordPascalCase } from "../helpers/setWordPascalCase";
import { ReusableModal } from "@/admin/shared/ReusableModal";

export function ClienteDetailModal({
  cliente,
  isOpen,
  onOpenChange,
}: {
  cliente: ClienteInterface | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!cliente) return null;

  return (
    <ReusableModal
      title={`${cliente.nombres} ${cliente.apellidos}`}
      description={`Información detallada del cliente, ID ${cliente.id
        .toString()
        .padStart(3, "0")}`}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      width="max-w-xl"
      height="auto"
    >
      <Card className="border-none shadow-none">
        <CardContent className="space-y-6">
          {/* <CardContent> */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Building2 size={16} />
              <div>
                <p className="text-xs uppercase text-slate-500">Empresa</p>
                <p className="font-medium text-secondary">{cliente.empresa}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-primary" size={18} />
              <div>
                <p className="text-xs uppercase text-slate-500">Email</p>
                <p className="font-medium text-secondary">{cliente.email ?? "—"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="text-primary" size={18} />
              <div>
                <p className="text-xs uppercase text-slate-500">Celular</p>
                <p className="font-medium text-secondary">{cliente.celular}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
            <div>
              <p className="text-xs uppercase text-slate-500">Edad</p>
              <p className="text-lg font-semibold">{cliente.edad} años</p>
            </div>

            <div>
              <p className="text-xs uppercase text-slate-500">Sexo</p>
              <p className="text-lg font-semibold">{setWordPascalCase(cliente.sexo)}</p>
            </div>

            <div>
              <p className="text-xs uppercase text-slate-500">Tipo Documento</p>
              <p className="font-medium">{setWordPascalCase(cliente.tipo_documento)}</p>
            </div>

            <div>
              <p className="text-xs uppercase text-slate-500">Número Documento</p>
              <p className="font-medium">{cliente.numero_documento}</p>
            </div>

            <div>
              <p className="text-xs uppercase text-slate-500">Medio Ingreso</p>
              <p className="font-medium">{setWordPascalCase(cliente.medio_ingreso)}</p>
            </div>

            <div>
              <p className="text-xs uppercase text-slate-500">Registrado</p>
              <p className="font-medium">
                {new Date(cliente.created_at).toLocaleDateString("es-PE")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </ReusableModal>
  );
}
