import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { ReactNode } from "react";

interface ReusableModalProps {
  title: string; // Título del modal
  description?: string; // Descripción opcional
  children: ReactNode; // Contenido del modal
  isOpen: boolean; // Control de apertura
  onOpenChange: (open: boolean) => void;
  width?: string; // Ej: "max-w-2xl", "w-full", etc.
  height?: string; // Ej: "h-[500px]"
}

export function ReusableModal({
  title,
  description,
  children,
  isOpen,
  onOpenChange,
  width = "max-w-2xl",
  height = "auto",
}: ReusableModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className={`${width} p-0 overflow-hidden`} style={{ height }}>
        <div className="p-6 border-b">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-secondary">{title}</DialogTitle>
            {description && (
              <DialogDescription className="text-xs text-slate-500 mt-1">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        </div>

        <div className="p-6">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
