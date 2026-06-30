import { useLocation, useNavigate } from "react-router-dom";

import { AvatarCircle, BadgeStatus, Button, Icon, Text } from "@/components/ui";
import { ArrowLeft } from "@/assets/icons";

type TicketStatus = "open" | "in_progress" | "closed";

type TicketDetailsData = {
  id: string;
  code: string;
  title: string;
  description?: string | null;
  serviceName: string;
  totalPrice: string | number;
  technicianName: string;
  technicianEmail?: string;
  technicianAvatar?: string | null;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  services?: {
    id: string;
    priceAtTime: string | number;
    quantity: number;
    service: {
      id: string;
      name: string;
      price: string | number;
    };
  }[];
};

type LocationState = {
  ticket?: TicketDetailsData;
};

const statusLabel: Record<TicketStatus, string> = {
  open: "Aberto",
  in_progress: "Em atendimento",
  closed: "Encerrado",
};

const statusVariant: Record<TicketStatus, "open" | "progress" | "done"> = {
  open: "open",
  in_progress: "progress",
  closed: "done",
};

function formatCurrency(value: string | number) {
  const numberValue = Number(value);

  if (Number.isNaN(numberValue)) {
    return "R$ 0,00";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numberValue);
}

export default function ClientTicketDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;
  const ticket = state?.ticket;

  if (!ticket) {
    return (
      <div className="flex min-h-75 flex-col items-center justify-center gap-3">
        <Text textColor="secondary">
          Não foi possível carregar os dados do chamado.
        </Text>

        <Button
          variant="secondary"
          onClick={() => navigate("/cliente/chamados")}
        >
          Voltar para chamados
        </Button>
      </div>
    );
  }

  const baseService = ticket.services?.[0];
  const additionalServices = ticket.services?.slice(1) ?? [];

  return (
    <div className="flex flex-col gap-4 md:gap-6 md:px-30">
      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={() => navigate("/cliente/chamados")}
          className="flex items-center gap-2 transition-all duration-200 cursor-pointer group"
        >
          <Icon
            svg={ArrowLeft}
            size="sm"
            className="fill-gray-400 group-hover:fill-gray-300 transition-all duration-200"
          />

          <Text
            size="sm"
            weight="bold"
            className="text-gray-400 group-hover:text-gray-300 transition-all duration-200"
          >
            Voltar
          </Text>
        </button>

        <Text as="h1" size="xl" weight="bold" textColor="blueDark">
          Chamado detalhado
        </Text>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-[1fr_360px] xl:items-start">
        <section className="rounded-xl border border-gray-200 p-5 md:p-6">
          <div className="mb-5 flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <Text textColor="quaternary" weight="bold">
                {ticket.code}
              </Text>

              <Text as="h2" size="md" weight="bold">
                {ticket.title}
              </Text>
            </div>

            <BadgeStatus variant={statusVariant[ticket.status]}>
              {statusLabel[ticket.status]}
            </BadgeStatus>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <Text size="sm" weight="bold" textColor="tertiary">
                Descrição
              </Text>

              <Text>{ticket.description || "Sem descrição."}</Text>
            </div>

            <div>
              <Text size="sm" weight="bold" textColor="tertiary">
                Categoria
              </Text>

              <Text>
                {baseService?.service.name ??
                  ticket.serviceName ??
                  "Sem serviço"}
              </Text>
            </div>

            <div className="grid grid-cols-2">
              <div>
                <Text size="sm" weight="bold" textColor="tertiary">
                  Criado em
                </Text>

                <Text>{ticket.createdAt}</Text>
              </div>

              <div>
                <Text size="sm" weight="bold" textColor="tertiary">
                  Atualizado em
                </Text>

                <Text>{ticket.updatedAt}</Text>
              </div>
            </div>
          </div>
        </section>

        <aside className="rounded-xl border border-gray-200 p-5 md:p-6">
          <div className="mb-8">
            <Text size="sm" weight="bold" textColor="tertiary">
              Técnico responsável
            </Text>

            <div className="mt-3 flex items-center gap-2">
              <AvatarCircle
                name={ticket.technicianName}
                avatar={ticket.technicianAvatar}
                size="md"
                variant="blueDark"
              />

              <div>
                <Text>{ticket.technicianName}</Text>

                {ticket.technicianEmail && (
                  <Text size="sm" textColor="quaternary">
                    {ticket.technicianEmail}
                  </Text>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Text size="sm" weight="bold" textColor="tertiary">
                Valores
              </Text>

              <div className="flex justify-between">
                <Text>Preço base</Text>
                <Text>
                  {formatCurrency(
                    baseService?.priceAtTime ?? ticket.totalPrice,
                  )}
                </Text>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Text size="sm" weight="bold" textColor="tertiary">
                Adicionais
              </Text>

              {additionalServices.length > 0 ? (
                additionalServices.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <Text>{item.service.name}</Text>
                    <Text>{formatCurrency(item.priceAtTime)}</Text>
                  </div>
                ))
              ) : (
                <Text textColor="secondary">Sem adicionais.</Text>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <Text weight="bold">Total</Text>
                <Text weight="bold">{formatCurrency(ticket.totalPrice)}</Text>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
