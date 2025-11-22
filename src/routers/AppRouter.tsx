import { ListaClientesPage } from "@/admin/clientes/pages/ListaClientesPage";
import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
