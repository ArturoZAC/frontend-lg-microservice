import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ListaClientesPage } from "@/admin/clientes/pages/ListaClientes/ListaClientesPage";
import { AdminLayout } from "@/admin/layouts/AdminLayout";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<ListaClientesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
