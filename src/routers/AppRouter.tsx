import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import { ListaClientesPage } from "@/admin/clientes/pages/ListaClientes/ListaClientesPage";
import { AdminLayout } from "@/admin/layouts/AdminLayout";
import CrearClientesPage from "@/admin/clientes/pages/CrearClientes/CrearClientesPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<ListaClientesPage />} />

          <Route path="/agregar" element={<CrearClientesPage />} />
        </Route>
      </Routes>

      <Toaster richColors position="top-right" />
    </BrowserRouter>
  );
};
