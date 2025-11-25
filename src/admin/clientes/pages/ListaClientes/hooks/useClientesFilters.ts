import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useClientesFilters(tiempoDebounce: number) {
  const [searchParams, setSearchParams] = useSearchParams();

  // --- Estado local reactivo para re-render ---
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [registroFilter, setRegistroFilter] = useState<string | null>(
    searchParams.get("registro") || null
  );
  const [medioFilter, setMedioFilter] = useState<string | null>(
    searchParams.get("medio_ingreso") || null
  );
  const [tipoDocumentoFilter, setTipoDocumentoFilter] = useState<string | null>(
    searchParams.get("tipo_documento") || null
  );
  const [currentPage, setCurrentPage] = useState<number>(Number(searchParams.get("page") || 1));
  const [perPage, setPerPage] = useState<number>(Number(searchParams.get("per_page") || 10));

  // --- Debounce para search ---
  const [debounceSearch, setDebounceSearch] = useState(searchTerm);
  useEffect(() => {
    const handler = setTimeout(() => setDebounceSearch(searchTerm), tiempoDebounce);
    return () => clearTimeout(handler);
  }, [searchTerm, tiempoDebounce]);

  // --- Cada vez que cambie estado local, actualizar URL ---
  useEffect(() => {
    const params: Record<string, string> = {};

    if (searchTerm) params.search = searchTerm;
    if (registroFilter) params.registro = registroFilter;
    if (medioFilter) params.medio_ingreso = medioFilter;
    if (tipoDocumentoFilter) params.tipo_documento = tipoDocumentoFilter;
    if (currentPage) params.page = String(currentPage);
    if (perPage) params.per_page = String(perPage);

    setSearchParams(params);
  }, [
    searchTerm,
    registroFilter,
    medioFilter,
    tipoDocumentoFilter,
    currentPage,
    perPage,
    setSearchParams,
  ]);

  // --- Acciones para cambiar filtros y resetear página ---
  const resetToFirstPage = () => setCurrentPage(1);

  const setPerPageParam = (val: number) => {
    setPerPage(val);
    resetToFirstPage();
  };

  const setRegistroParam = (val: string | null) => {
    setRegistroFilter(val);
    resetToFirstPage();
  };

  const setMedioParam = (val: string | null) => {
    setMedioFilter(val);
    resetToFirstPage();
  };

  const setTipoDocumentoParam = (val: string | null) => {
    setTipoDocumentoFilter(val);
    resetToFirstPage();
  };

  // --- Params listos para React Query ---
  const params = useMemo(
    () => ({
      page: currentPage,
      per_page: perPage,
      search: debounceSearch || undefined,
      registro: registroFilter || undefined,
      medio_ingreso: medioFilter || undefined,
      tipo_documento: tipoDocumentoFilter || undefined,
    }),
    [currentPage, perPage, debounceSearch, registroFilter, medioFilter, tipoDocumentoFilter]
  );

  return {
    searchTerm,
    debounceSearch,
    setSearchTerm,

    currentPage,
    setCurrentPage,

    perPage,
    setPerPage: setPerPageParam,

    registroFilter,
    setRegistroFilter: setRegistroParam,

    medioFilter,
    setMedioFilter: setMedioParam,

    tipoDocumentoFilter,
    setTipoDocumentoFilter: setTipoDocumentoParam,

    resetToFirstPage,
    params,
  };
}
