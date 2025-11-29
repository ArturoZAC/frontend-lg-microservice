import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { ListaClientesPage } from "@/admin/clientes/pages/ListaClientes/ListaClientesPage";
import { AdminLayout } from "@/admin/layouts/AdminLayout";
// import EditarClientesPage from "@/admin/clientes/pages/EditarClientes/EditarClientesPage";
// import {CrearClientesPage} from "@/admin/clientes/pages/CrearClientes/CrearClientesPage";
// import { EditarClientesPage } from "@/admin/clientes/pages/EditarClientes/EditarClientesPage";

// Lazy load
const CrearClientesPage = lazy(
  () => import("@/admin/clientes/pages/CrearClientes/CrearClientesPage")
);
const EditarClientesPage = lazy(
  () => import("@/admin/clientes/pages/EditarClientes/EditarClientesPage")
);

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<ListaClientesPage />} />

          <Route path="/agregar-cliente" element={<CrearClientesPage />} />
          <Route path="/editar-cliente/:idCliente" element={<EditarClientesPage />} />

          <Route path="*" element={<Navigate to={"/"} />} />
        </Route>
      </Routes>

      <Toaster richColors position="top-right" />
    </BrowserRouter>
  );
};
