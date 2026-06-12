import { MobileHeader, Sidebar } from "../layout";
import type { AppUser, UserRole, NavigationItem } from "@/types";
import { BriefcaseBusiness, ClipboardList, Users, Wrench } from "@assets/icons";

interface AppLayoutProps {
  role: UserRole;
  user: AppUser;
  items: NavigationItem[];

  activePath: string;

  children: React.ReactNode;

  onNavigate?: (path: string) => void;

  onProfile?: () => void;
  onLogout: () => void;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-bg-default">
      {/* Mobile */}
      <div className="md:hidden">
        <MobileHeader
          role="admin"
          activePath="/tickets"
          user={{
            name: "Murillo Silva",
            email: "murillo@email.com",
          }}
          items={[
            {
              label: "Chamados",
              icon: ClipboardList,
              href: "/tickets",
            },
            {
              label: "Técnicos",
              icon: Users,
              href: "/technicians",
            },
            {
              label: "Clientes",
              icon: BriefcaseBusiness,
              href: "/technicians",
            },
            {
              label: "Serviços",
              icon: Wrench,
              href: "/services",
            },
          ]}
          onNavigate={(path: string) => console.log("Navegar:", path)}
          onProfile={() => console.log("Perfil")}
          onLogout={() => console.log("Logout")}
        />

        <main className="p-6">{children}</main>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex">
        <Sidebar
          role="admin"
          activePath="/tickets"
          user={{
            name: "Murillo Silva",
            email: "murillo@email.com",
          }}
          items={[
            {
              label: "Chamados",
              icon: ClipboardList,
              href: "/tickets",
            },
            {
              label: "Técnicos",
              icon: Users,
              href: "/technicians",
            },
            {
              label: "Clientes",
              icon: BriefcaseBusiness,
              href: "/technicians",
            },
            {
              label: "Serviços",
              icon: Wrench,
              href: "/services",
            },
          ]}
          onNavigate={(path: string) => console.log(path)}
          onProfile={() => console.log("Perfil")}
          onLogout={() => console.log("Logout")}
        />

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
