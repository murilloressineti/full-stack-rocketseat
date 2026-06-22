import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { MobileHeader, Sidebar } from "../layout";
import {
  BriefcaseBusiness,
  ClipboardList,
  Plus,
  Users,
  Wrench,
} from "@assets/icons";

export default function AppLayout() {
  const { user, signOut } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  if (!user) {
    return null;
  }

  const adminItems = [
    {
      label: "Chamados",
      icon: ClipboardList,
      href: "/admin/chamados",
    },
    {
      label: "Técnicos",
      icon: Users,
      href: "/admin/tecnicos",
    },
    {
      label: "Clientes",
      icon: BriefcaseBusiness,
      href: "/admin/clientes",
    },
    {
      label: "Serviços",
      icon: Wrench,
      href: "/admin/servicos",
    },
  ];

  const technicianItems = [
    {
      label: "Meus chamados",
      icon: ClipboardList,
      href: "/tecnico/chamados",
    },
  ];

  const clientItems = [
    {
      label: "Meus chamados",
      icon: ClipboardList,
      href: "/cliente/chamados",
    },
    {
      label: "Criar chamado",
      icon: Plus,
      href: "/cliente/novo-chamado",
    },
  ];

  const navigationItems = {
    admin: adminItems,
    technician: technicianItems,
    client: clientItems,
  };

  const currentItems = navigationItems[user?.role];

  function handleNavigate(path: string) {
    navigate(path);
  }

  function handleLogout() {
    signOut();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-bg-default">
      {/* Mobile */}
      <div className="md:hidden flex flex-col min-h-screen">
        <MobileHeader
          role={user?.role}
          activePath={location.pathname}
          user={user}
          items={currentItems}
          onNavigate={handleNavigate}
          onProfile={() => console.log("Perfil")}
          onLogout={handleLogout}
        />

        <main className="flex-1 bg-bg-light px-6 pb-6 pt-7 rounded-t-3xl h-full">
          <Outlet />
        </main>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex">
        <Sidebar
          role={user?.role}
          activePath={location.pathname}
          user={user}
          items={currentItems}
          onNavigate={handleNavigate}
          onProfile={() => console.log("Perfil")}
          onLogout={handleLogout}
        />

        <main className="flex-1 pt-3">
          <div className="bg-bg-light px-12 pb-12 pt-13 rounded-tl-3xl h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
