import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Mail, Phone, Building2 } from "lucide-react";
import type { ClienteInterface } from "../interfaces/cliente.interface";

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
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <Card className="border-none shadow-none">
          {/* HEADER */}
          <CardHeader className="bg-indigo-50 pb-6 border-b">
            <DialogHeader>
              <div className="flex flex-col">
                <DialogTitle className="text-3xl font-bold text-slate-900">
                  {cliente.nombres} {cliente.apellidos}
                </DialogTitle>
                <p className="text-xs text-slate-500 mt-1">
                  ID: {cliente.id.toString().padStart(3, "0")}
                </p>

                <div className="flex items-center gap-3">
                  <Building2 size={16} />
                  <div>
                    <p className="text-xs uppercase text-slate-500">Empresa</p>
                    <p className="font-medium">{cliente.empresa}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <Mail className="text-primary" size={18} />
                  <div>
                    <p className="text-xs uppercase text-slate-500">Email</p>
                    <p className="font-medium">{cliente.email ?? "—"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="text-primary" size={18} />
                  <div>
                    <p className="text-xs uppercase text-slate-500">Celular</p>
                    <p className="font-medium">{cliente.celular}</p>
                  </div>
                </div>
              </div>

              <div></div>
            </DialogHeader>
          </CardHeader>

          {/* BODY */}
          <CardContent className="space-y-6 p-6">
            {/* EMAIL + CELULAR */}

            {/* GRID CAMPOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
              <div>
                <p className="text-xs uppercase text-slate-500">Edad</p>
                <p className="text-lg font-semibold">{cliente.edad} años</p>
              </div>

              <div>
                <p className="text-xs uppercase text-slate-500">Sexo</p>
                <p className="text-lg font-semibold">{cliente.sexo}</p>
              </div>

              <div>
                <p className="text-xs uppercase text-slate-500">Tipo Documento</p>
                <p className="font-medium">{cliente.tipo_documento}</p>
              </div>

              <div>
                <p className="text-xs uppercase text-slate-500">Número Documento</p>
                <p className="font-medium">{cliente.numero_documento}</p>
              </div>

              <div>
                <p className="text-xs uppercase text-slate-500">Medio Ingreso</p>
                <p className="font-medium">{cliente.medio_ingreso}</p>
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
      </DialogContent>
    </Dialog>
  );
}
