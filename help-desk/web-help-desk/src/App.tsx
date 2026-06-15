import {
  BadgeStatus,
  BadgeTime,
  Button,
  Icon,
  Input,
  Select,
  Text,
} from "@components/ui";
import { AvailabilitySelector } from "@components/features/schedule";
import { AppLayout, MobileHeader } from "./components/layout";
import {
  ArrowLeft,
  BriefcaseBusiness,
  PenLine,
  ClipboardList,
  Users,
  Wrench,
} from "@assets/icons";

export default function App() {
  return (
    <div className="bg-bg-light">
      {/* Text */}
      <div>
        <Text as="h1" weight="bold" textColor="primary">
          Olá, mundo!
        </Text>
        <Text size={"xxs"} textColor={"secondary"}>
          Olá, mundo!
        </Text>
        <Text size={"xs"} textColor={"tertiary"}>
          Olá, mundo!
        </Text>
        <Text size={"md"} textColor={"inverted"}>
          Olá, mundo!
        </Text>
        <Text size={"lg"} textColor={"blueBase"}>
          Olá, mundo!
        </Text>
        <Text size={"xl"} textColor={"blueDark"}>
          Olá, mundo!
        </Text>
        <Text size={"xl"} textColor={"blueLight"}>
          Olá, mundo!
        </Text>
      </div>

      {/* Icon */}
      <div>
        <Icon svg={ArrowLeft} size={"xs"} />
        <Icon svg={ArrowLeft} size={"sm"} />
        <Icon svg={ArrowLeft} size={"md"} />
        <Icon svg={ArrowLeft} size={"lg"} className="fill-feedback-danger" />
      </div>

      {/* Button */}
      <div>
        <Button variant={"primary"}>
          <Icon svg={PenLine} /> Label
        </Button>
        <Button variant={"secondary"}>
          <Icon svg={PenLine} /> Label
        </Button>
        <Button variant={"link"}>
          <Icon svg={PenLine} /> Label
        </Button>

        <Button variant={"primary"} size={"xs"}>
          <Icon svg={PenLine} />
        </Button>

        <Button variant={"secondary"} size={"xs"}>
          <Icon svg={PenLine} />
        </Button>

        <Button variant={"link"} size={"xs"}>
          <Icon svg={PenLine} />
        </Button>

        <div className="flex flex-col gap-4 w-100 border p-4">
          <Button>Entrar</Button>
          <Button variant={"secondary"}>Criar conta</Button>
        </div>
      </div>

      {/* Input */}
      <div className="flex flex-col gap-4 p-10 max-w-sm">
        {/* Exemplo 1: Input simples */}
        <Input label="Label" type="email" placeholder="Placeholder" />

        {/* Exemplo 2: Input com Erro (vai ficar vermelho automaticamente) */}
        <Input
          label="Label"
          type="text"
          placeholder="Placeholder"
          error="Label"
        />
      </div>

      <div className="flex flex-col gap-4 p-10 max-w-sm">
        <Input label="E-mail" type="email" placeholder="exemplo@mail.com" />

        <Input label="Senha" type="password" placeholder="Digite sua senha" />
      </div>

      {/* Select */}
      <div className="flex flex-col gap-4 p-10 max-w-sm">
        <Select label="Categoria" defaultValue="">
          <option value="" disabled>
            Escolha uma opção
          </option>
          <option value="1">Item 1</option>
          <option value="2">Item 2</option>
        </Select>

        <Select label="Categoria" defaultValue="" error="Campo obrigatório">
          <option value="" disabled>
            Escolha uma opção
          </option>
          <option value="1">Item 1</option>
          <option value="2">Item 2</option>
        </Select>
      </div>

      {/* BadgeStatus */}
      <div className="flex flex-col gap-4 p-10 max-w-sm">
        <div>
          <BadgeStatus variant={"open"}>Label</BadgeStatus>
          <BadgeStatus variant={"progress"}>Label</BadgeStatus>
          <BadgeStatus variant={"done"}>Label</BadgeStatus>
          <BadgeStatus variant={"danger"}>Label</BadgeStatus>
        </div>

        <div>
          <BadgeStatus variant={"open"}></BadgeStatus>
          <BadgeStatus variant={"progress"}></BadgeStatus>
          <BadgeStatus variant={"done"}></BadgeStatus>
          <BadgeStatus variant={"danger"}></BadgeStatus>
        </div>
      </div>

      {/* BadgeTime */}
      <div className="flex flex-row gap-2 p-10 max-w-sm">
        <BadgeTime>07:00</BadgeTime>
        <BadgeTime>08:00</BadgeTime>
        <BadgeTime>09:00</BadgeTime>
        <BadgeTime>10:00</BadgeTime>
        <BadgeTime>11:00</BadgeTime>
        <BadgeTime>12:00</BadgeTime>
        <BadgeTime variant={"disabled"}>13:00</BadgeTime>
      </div>

      <div className="flex flex-row p-10 max-w-sm">
        <AvailabilitySelector />
      </div>

      {/* MobileHeader */}
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

      {/* AppLayout */}
      <AppLayout
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
      >
        <div className="bg-bg-light h-full p-12 rounded-tl-3xl">
          <h1 className="text-blue-base">Dashboard</h1>
          <p>Conteúdo da página aqui</p>
        </div>
      </AppLayout>
    </div>
  );
}
