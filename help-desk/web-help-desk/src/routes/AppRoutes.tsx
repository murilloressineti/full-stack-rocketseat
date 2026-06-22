import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";

import { Login, Register } from "@/pages/Auth";
import {
  AdminDashboard,
  AdminTechnicians,
  TechnicianEdit,
  TechnicianNew,
} from "@/pages/Admin";
import { ClientDashboard } from "@/pages/Client";
import { TechnicianDashboard } from "@/pages/Technician";

import { AppLayout } from "@/components/layout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />

          <Route path="tecnicos" element={<AdminTechnicians />} />
          <Route path="tecnicos/:id/editar" element={<TechnicianEdit />} />
          <Route path="tecnicos/criar-tecnico" element={<TechnicianNew />} />
        </Route>

        <Route
          path="/cliente"
          element={
            <PrivateRoute allowedRoles={["client"]}>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<ClientDashboard />} />
        </Route>

        <Route
          path="/tecnico"
          element={
            <PrivateRoute allowedRoles={["technician"]}>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<TechnicianDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
