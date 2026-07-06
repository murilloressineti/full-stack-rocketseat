import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { getTicketById, updateTicketStatus } from "@/services";

import { AvatarCircle, BadgeStatus, Button, Icon, Text } from "@/components/ui";
import { ArrowLeft, CircleCheck, CircleHelp, Clock } from "@/assets/icons";

type TicketStatus = "open" | "in_progress" | "closed";

type TicketDetailsData = {
  id: string;
  code: string;
  title: string;
  description?: string | null;
  serviceName: string;
  totalPrice: string | number;
  clientName: string;
  clientAvatar?: string | null;
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

const statusActions = {
  open: [
    { label: "Em atendimento", value: "in_progress", icon: Clock },
    { label: "Encerrado", value: "closed", icon: CircleCheck },
  ],
  in_progress: [
    { label: "Aberto", value: "open", icon: CircleHelp },
    { label: "Encerrado", value: "closed", icon: CircleCheck },
  ],
  closed: [
    { label: "Aberto", value: "open", icon: CircleHelp },
    { label: "Em atendimento", value: "in_progress", icon: Clock },
  ],
} as const;

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

function formatDateTime(value: string) {
  const currentDate = new Date(value);

  const formattedDate = currentDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  const formattedTime = currentDate.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedDate} - ${formattedTime}`;
}

function mapTicketToDetails(ticket: any): TicketDetailsData {
  return {
    id: ticket.id,
    code: `#${ticket.id.slice(-5).toUpperCase()}`,
    title: ticket.title ?? "Sem título",
    description: ticket.description,
    serviceName:
      ticket.services?.map((item: any) => item.service.name).join(", ") ||
      "Sem serviço",
    totalPrice: ticket.totalPrice,
    clientName: ticket.client.name,
    clientAvatar: ticket.client.avatar ?? null,
    technicianName: ticket.technician.name,
    technicianEmail: ticket.technician.email,
    technicianAvatar: ticket.technician.avatar ?? null,
    status: ticket.status,
    createdAt: ticket.createdAt,
    updatedAt: ticket.updatedAt,
    services: ticket.services,
  };
}

export default function AdminTicketDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;
  const initialTicket = state?.ticket;

  const [currentTicket, setCurrentTicket] = useState<
    TicketDetailsData | undefined
  >(initialTicket);

  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] = useState<TicketStatus | undefined>(
    initialTicket?.status,
  );
  const [currentUpdatedAt, setCurrentUpdatedAt] = useState<string | undefined>(
    initialTicket?.updatedAt
      ? formatDateTime(initialTicket.updatedAt)
      : undefined,
  );
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    async function loadTicket() {
      if (!initialTicket?.id) {
        setLoading(false);
        return;
      }

      try {
        const data = await getTicketById(initialTicket.id);
        const formattedTicket = mapTicketToDetails(data);

        setCurrentTicket(formattedTicket);
        setCurrentStatus(formattedTicket.status);
        setCurrentUpdatedAt(formatDateTime(formattedTicket.updatedAt));
      } catch (error) {
        console.error("Erro ao carregar chamado:", error);
        toast.error("Não foi possível carregar o chamado atualizado.");
      } finally {
        setLoading(false);
      }
    }

    loadTicket();
  }, [initialTicket?.id]);

  async function handleUpdateStatus(status: TicketStatus) {
    if (!currentTicket) return;

    try {
      setUpdatingStatus(true);

      const updatedTicket = await updateTicketStatus(currentTicket.id, status);
      const refreshedTicket = await getTicketById(updatedTicket.id);
      const formattedTicket = mapTicketToDetails(refreshedTicket);

      setCurrentTicket(formattedTicket);
      setCurrentStatus(formattedTicket.status);
      setCurrentUpdatedAt(formatDateTime(formattedTicket.updatedAt));

      toast.success("Status do chamado atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar status do chamado:", error);
      toast.error("Não foi possível atualizar o status do chamado.");
    } finally {
      setUpdatingStatus(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <Text>Carregando chamado...</Text>
      </div>
    );
  }

  if (!currentTicket) {
    return (
      <div className="flex min-h-75 flex-col items-center justify-center gap-3">
        <Text textColor="secondary">
          Não foi possível carregar os dados do chamado.
        </Text>

        <Button variant="secondary" onClick={() => navigate("/admin/chamados")}>
          Voltar para chamados
        </Button>
      </div>
    );
  }

  const resolvedStatus = currentStatus ?? currentTicket.status;
  const baseService = currentTicket.services?.[0];
  const additionalServices = currentTicket.services?.slice(1) ?? [];

  return (
    <div className="flex flex-col gap-4 md:gap-6 md:px-30">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => navigate("/admin/chamados")}
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

        <div className="grid grid-cols-2 gap-2 md:flex">
          {statusActions[resolvedStatus].map((action) => (
            <Button
              key={action.value}
              variant="primary"
              className="py-2.5"
              onClick={() => handleUpdateStatus(action.value)}
              disabled={updatingStatus}
            >
              <Icon svg={action.icon} size="sm" />
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-[1fr_360px] xl:items-start">
        <section className="rounded-xl border border-gray-200 p-5 md:p-6">
          <div className="mb-5 flex items-start justify-between">
            <div className="flex flex-col gap-2">
              <Text textColor="quaternary" weight="bold">
                {currentTicket.code}
              </Text>

              <Text as="h2" size="md" weight="bold">
                {currentTicket.title}
              </Text>
            </div>

            <BadgeStatus variant={statusVariant[resolvedStatus]}>
              {statusLabel[resolvedStatus]}
            </BadgeStatus>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <Text size="sm" weight="bold" textColor="tertiary">
                Descrição
              </Text>

              <Text>{currentTicket.description || "Sem descrição."}</Text>
            </div>

            <div>
              <Text size="sm" weight="bold" textColor="tertiary">
                Categoria
              </Text>

              <Text>
                {baseService?.service.name ??
                  currentTicket.serviceName ??
                  "Sem serviço"}
              </Text>
            </div>

            <div className="grid grid-cols-2">
              <div>
                <Text size="sm" weight="bold" textColor="tertiary">
                  Criado em
                </Text>

                <Text>{formatDateTime(currentTicket.createdAt)}</Text>
              </div>

              <div>
                <Text size="sm" weight="bold" textColor="tertiary">
                  Atualizado em
                </Text>

                <Text>
                  {currentUpdatedAt ?? formatDateTime(currentTicket.updatedAt)}
                </Text>
              </div>
            </div>

            <div>
              <Text size="sm" weight="bold" textColor="tertiary">
                Cliente
              </Text>

              <div className="mt-2 flex items-center gap-2">
                <AvatarCircle
                  name={currentTicket.clientName}
                  avatar={currentTicket.clientAvatar}
                  size="xs"
                  variant="blueDark"
                />

                <Text>{currentTicket.clientName}</Text>
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
                name={currentTicket.technicianName}
                avatar={currentTicket.technicianAvatar}
                size="md"
                variant="blueDark"
              />

              <div>
                <Text>{currentTicket.technicianName}</Text>

                {currentTicket.technicianEmail && (
                  <Text size="sm" textColor="quaternary">
                    {currentTicket.technicianEmail}
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
                <Text>{formatCurrency(baseService?.priceAtTime ?? 0)}</Text>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Text size="sm" weight="bold" textColor="tertiary">
                Adicionais
              </Text>

              {additionalServices.length > 0 ? (
                additionalServices.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <Text>
                      {item.service.name}
                      {item.quantity > 1 && ` (${item.quantity}x)`}
                    </Text>

                    <Text>
                      {formatCurrency(Number(item.priceAtTime) * item.quantity)}
                    </Text>
                  </div>
                ))
              ) : (
                <Text textColor="secondary">Sem adicionais.</Text>
              )}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between">
                <Text weight="bold">Total</Text>
                <Text weight="bold">
                  {formatCurrency(currentTicket.totalPrice)}
                </Text>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
