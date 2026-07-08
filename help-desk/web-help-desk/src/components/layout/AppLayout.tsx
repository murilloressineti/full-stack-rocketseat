import { useState } from "react";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";

import {
  ChangePasswordModal,
  ProfileModal,
} from "@/components/features/userMenu";
import { MobileHeader, Sidebar } from "@/components/layout";

import {
  BriefcaseBusiness,
  ClipboardList,
  Plus,
  Users,
  Wrench,
} from "@/assets/icons";

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

export default function AppLayout() {
  const { user, signOut, updateUser } = useAuth();

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  if (!user) {
    return null;
  }

  const mustChangePassword =
    user.role === "technician" && user.mustChangePassword;

  const currentItems = navigationItems[user.role];

  function handleNavigate(path: string) {
    navigate(path);
  }

  function handleProfile() {
    setIsProfileModalOpen(true);
  }

  function handleLogout() {
    signOut();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-bg-default">
      {/* Mobile */}
      <div className="flex min-h-screen flex-col md:hidden">
        <MobileHeader
          role={user.role}
          activePath={location.pathname}
          user={user}
          items={currentItems}
          onNavigate={handleNavigate}
          onProfile={handleProfile}
          onLogout={handleLogout}
        />

        <main className="h-full flex-1 rounded-t-3xl bg-bg-light px-6 pb-6 pt-7">
          <Outlet />
        </main>
      </div>

      {/* Desktop */}
      <div className="hidden h-screen overflow-hidden md:flex">
        <Sidebar
          role={user.role}
          activePath={location.pathname}
          user={user}
          items={currentItems}
          onNavigate={handleNavigate}
          onProfile={handleProfile}
          onLogout={handleLogout}
        />

        <main className="flex-1 overflow-y-auto pt-3">
          <div className="min-h-full rounded-tl-3xl bg-bg-light px-12 pb-12 pt-13">
            <Outlet />
          </div>
        </main>
      </div>

      <ProfileModal
        open={isProfileModalOpen}
        user={user}
        onClose={() => setIsProfileModalOpen(false)}
        onChangePassword={() => {
          setIsProfileModalOpen(false);
          setIsChangePasswordModalOpen(true);
        }}
        onProfileUpdated={updateUser}
      />

      <ChangePasswordModal
        open={mustChangePassword || isChangePasswordModalOpen}
        userId={user.id}
        required={mustChangePassword}
        onClose={() => setIsChangePasswordModalOpen(false)}
        onBack={() => {
          setIsChangePasswordModalOpen(false);
          setIsProfileModalOpen(true);
        }}
        onSuccess={(updatedUser) => {
          updateUser(updatedUser);
          setIsChangePasswordModalOpen(false);
        }}
      />
    </div>
  );
}
