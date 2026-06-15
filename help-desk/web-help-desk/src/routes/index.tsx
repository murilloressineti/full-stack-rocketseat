import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Login,
  AdminDashboard,
  ClientDashboard,
  TechnicianDashboard,
} from "@/pages";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/client" element={<ClientDashboard />} />

        <Route path="/technician" element={<TechnicianDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
