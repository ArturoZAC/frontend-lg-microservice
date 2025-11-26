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
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder: string;
  options: Option[];
}

export function SelectFiltro({ value, onChange, placeholder, options }: Props) {
  return (
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
  );
}
