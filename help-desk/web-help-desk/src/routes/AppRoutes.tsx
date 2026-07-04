import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

import { AppLayout } from "@/components/layout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas: Auth */}
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />

        {/* Privadas: Admin */}
        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AppLayout />
            </PrivateRoute>
          }
        >
          {/* redireciona /admin -> /admin/chamados */}
          <Route index element={<Navigate to="chamados" replace />} />

          {/* Clients */}
          <Route path="clientes" element={<AdminClientsList />} />

          {/* Services */}
          <Route path="servicos" element={<AdminServicesList />} />

          {/* Technicians */}
          <Route path="tecnicos" element={<AdminTechniciansList />} />
          <Route path="tecnicos/:id/editar" element={<AdminTechnicianEdit />} />
          <Route path="tecnicos/novo" element={<AdminTechnicianCreate />} />

          {/* Tickets */}
          <Route path="chamados" element={<AdminTicketsList />} />
          <Route path="chamados/:id" element={<AdminTicketDetails />} />
        </Route>

        {/* Privadas: Client */}
        <Route
          path="/cliente"
          element={
            <PrivateRoute allowedRoles={["client"]}>
              <AppLayout />
            </PrivateRoute>
          }
        >
          {/* redireciona /cliente -> /admin/chamados */}
          <Route index element={<Navigate to="chamados" replace />} />

          {/* New Ticket */}
          <Route path="novo-chamado" element={<ClientNewTicketCreate />} />

          {/* Tickets */}
          <Route path="chamados" element={<ClientTicketsList />} />
          <Route path="chamados/:id" element={<ClientTicketsDetails />} />
        </Route>

        {/* Privadas: Technician */}
        <Route
          path="/tecnico"
          element={
            <PrivateRoute allowedRoles={["technician"]}>
              <AppLayout />
            </PrivateRoute>
          }
        >
          {/* redireciona /tecnico -> /tecnico/chamados */}
          <Route index element={<Navigate to="chamados" replace />} />

          {/* Tickets */}
          <Route path="chamados" element={<TechnicianTicketsList />} />
          <Route path="chamados/:id" element={<TechnicianTicketDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
