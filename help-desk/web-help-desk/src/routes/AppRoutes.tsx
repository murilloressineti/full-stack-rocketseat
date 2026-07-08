import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AppLayout } from "@/components/layout";

import PrivateRoute from "./PrivateRoutes";

// Auth
import { Login, Register } from "@/pages/Auth";

// Admin
import {
  AdminClientsList,
  AdminServicesList,
  AdminTechnicianCreate,
  AdminTechnicianEdit,
  AdminTechniciansList,
  AdminTicketDetails,
  AdminTicketsList,
} from "@/pages/Admin";

// Client
import {
  ClientNewTicketCreate,
  ClientTicketsDetails,
  ClientTicketsList,
} from "@/pages/Client";

// Technician
import {
  TechnicianTicketDetails,
  TechnicianTicketsList,
} from "@/pages/Technician";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />

        {/* Área do administrador */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="chamados" replace />} />

          {/* Chamados */}
          <Route path="chamados" element={<AdminTicketsList />} />
          <Route path="chamados/:id" element={<AdminTicketDetails />} />

          {/* Técnicos */}
          <Route path="tecnicos" element={<AdminTechniciansList />} />
          <Route path="tecnicos/novo" element={<AdminTechnicianCreate />} />
          <Route path="tecnicos/:id/editar" element={<AdminTechnicianEdit />} />

          {/* Clientes */}
          <Route path="clientes" element={<AdminClientsList />} />

          {/* Serviços */}
          <Route path="servicos" element={<AdminServicesList />} />
        </Route>

        {/* Área do cliente */}
        <Route
          path="/cliente"
          element={
            <PrivateRoute allowedRoles={["client"]}>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="chamados" replace />} />

          {/* Chamados */}
          <Route path="chamados" element={<ClientTicketsList />} />
          <Route path="chamados/:id" element={<ClientTicketsDetails />} />

          {/* Novo chamado */}
          <Route path="novo-chamado" element={<ClientNewTicketCreate />} />
        </Route>

        {/* Área do técnico */}
        <Route
          path="/tecnico"
          element={
            <PrivateRoute allowedRoles={["technician"]}>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="chamados" replace />} />

          {/* Chamados */}
          <Route path="chamados" element={<TechnicianTicketsList />} />
          <Route path="chamados/:id" element={<TechnicianTicketDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
