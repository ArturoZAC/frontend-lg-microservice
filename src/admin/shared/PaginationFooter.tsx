import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectFiltro } from "./SelectFiltro";

interface PaginationFooterProps {
  total: number; // total de registros
  perPage: number; // tamaño actual de página
  currentPage: number; // página actual
  lastPage: number; // última página
  wordPage: string;
  onChangePage: (page: number) => void;
  onChangePerPage: (perPage: number) => void;

  // Opcionales → vuelve al componente flexible
  perPageOptions?: number[]; // opciones para mostrar por página
  labelTotal?: string; // texto de total
  showTotal?: boolean; // ocultar total si se desea
  showPerPageSelect?: boolean; // ocultar select de per-page si quieres
  showPageInput?: boolean; // ocultar input de ir a página
  showButtons?: boolean; // ocultar botones de navegación
  onPrefetchNext?: () => void; // opcional: hover para prefetch
}

export const PaginationFooter = ({
  total,
  perPage,
  currentPage,
  lastPage,
  wordPage,
  onChangePage,
  onChangePerPage,

  perPageOptions = [10, 20, 50, 100],
  labelTotal = "Total",
  showTotal = true,
  showPerPageSelect = true,
  showPageInput = true,
  showButtons = true,
  onPrefetchNext,
}: PaginationFooterProps) => {
  return (
    <div className="px-6 py-4 border-t bg-muted/30">
      <div className="flex justify-between items-end">
        {/* TOTAL DE REGISTROS */}
        {showTotal && (
          <p className="text-sm text-muted-foreground">
            {labelTotal}: {total} {wordPage}
          </p>
        )}

        <div className="flex items-end gap-6">
          {/* SELECT: PER PAGE */}
          {showPerPageSelect && (
            <SelectFiltro
              label="Mostrar"
              value={String(perPage)}
              onChange={(v) => onChangePerPage(Number(v))}
              placeholder="Por página"
              options={perPageOptions.map((num) => ({
                label: String(num),
                value: String(num),
              }))}
            />
          )}

          {/* INPUT: GO TO PAGE */}
          {showPageInput && (
            <div className="flex flex-col items-start gap-1">
              <span className="text-xs font-medium text-muted-foreground">Página</span>

              <Input
                type="number"
                min={1}
                max={lastPage}
                value={currentPage}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  let val = Number(e.target.value);
                  if (val < 1) val = 1;
                  if (val > lastPage) val = lastPage;
                  onChangePage(val);
                  e.currentTarget.blur();
                }}
                className="w-16 text-sm pl-5"
              />
            </div>
          )}

          {/* BOTONES DE NAVEGACIÓN */}
          {showButtons && (
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => onChangePage(currentPage - 1)}
              >
                <ChevronLeft />
              </Button>

              <span className="text-sm">
                Página {currentPage} de {lastPage}
              </span>

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === lastPage}
                onClick={() => onChangePage(currentPage + 1)}
                onMouseEnter={onPrefetchNext}
              >
                <ChevronRight />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
