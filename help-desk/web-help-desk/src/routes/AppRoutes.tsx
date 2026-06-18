import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoutes";

import {
  Login,
  Register,
  AdminDashboard,
  AdminTechnicians,
  ClientDashboard,
  TechnicianDashboard,
} from "@/pages";

import { AppLayout } from "@/components/layout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin"
          element={
            <PrivateRoute allowedRoles={["admin"]}>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />

          <Route path="technicians" element={<AdminTechnicians />} />
        </Route>

        <Route
          path="/client"
          element={
            <PrivateRoute allowedRoles={["client"]}>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<ClientDashboard />} />
        </Route>

        <Route
          path="/technician"
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
