import { IconCopy } from "@tabler/icons-react";
import { toast } from "sonner";

interface CopyTextProps {
  text: string;
}

export function CopyText({ text }: CopyTextProps) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Texto copiado", {
        description: `"${text}" se copió correctamente.`,
      });
    } catch {
      toast.error("Error al copiar");
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1 hover:bg-accent rounded transition-colors"
      title="Copiar"
    >
      <IconCopy className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}
