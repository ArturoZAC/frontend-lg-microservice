import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface Option {
  label: string;
  value: string;
}

interface Props {
  label?: string;
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder: string;
  options: Option[];
}

export function SelectFiltro({ label, value, onChange, placeholder, options }: Props) {
  return (
    <div className="flex flex-col gap-1 w-full sm:w-40">
      {label && <span className="text-xs font-medium text-muted-foreground">{label}</span>}

      <Select value={value || "all"} onValueChange={(val) => onChange(val === "all" ? null : val)}>
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
