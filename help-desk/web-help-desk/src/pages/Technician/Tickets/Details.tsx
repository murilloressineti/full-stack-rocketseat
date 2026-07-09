import { useState, type ElementType } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import {
  addTicketService,
  deleteTicketService,
  getActiveServices,
  updateTicketStatus,
} from "@/services";

import type { Service, Ticket, TicketStatus } from "@/types";

import AdditionalServiceItem from "./components/AdditionalServiceItem";
import AdditionalServiceModal from "./components/AdditionalServiceModal";
import { AvatarCircle, BadgeStatus, Button, Icon, Text } from "@/components/ui";

import { ArrowLeft, CircleCheck, Clock, Plus } from "@/assets/icons";

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
  services?: Ticket["services"];
};

type LocationState = {
  ticket?: TicketDetailsData;
};

type StatusAction = {
  label: string;
  value: TicketStatus;
  icon: ElementType;
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

const technicianStatusActions: Record<TicketStatus, StatusAction[]> = {
  open: [
    { label: "Encerrar", value: "closed", icon: CircleCheck },
    { label: "Iniciar atendimento", value: "in_progress", icon: Clock },
  ],
  in_progress: [{ label: "Encerrar", value: "closed", icon: CircleCheck }],
  closed: [],
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

function formatDateTime(value: string) {
  const currentDate = new Date(value);

  if (Number.isNaN(currentDate.getTime())) {
    return value;
  }

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

function formatTicketCode(id: string) {
  return `#${id.slice(-5).toUpperCase()}`;
}

export default function TechnicianTicketDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;
  const initialTicket = state?.ticket;

  const [currentTicket, setCurrentTicket] = useState(initialTicket);

  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [savingService, setSavingService] = useState(false);

  const [isAdditionalServiceModalOpen, setIsAdditionalServiceModalOpen] =
    useState(false);

  const [availableServices, setAvailableServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(false);

  function goBackToTickets() {
    navigate("/tecnico/chamados");
  }

  function updateCurrentTicket(ticket: {
    totalPrice: string | number;
    updatedAt: string;
    status?: TicketStatus;
    services?: TicketDetailsData["services"];
  }) {
    setCurrentTicket((prev) =>
      prev
        ? {
            ...prev,
            status: ticket.status ?? prev.status,
            totalPrice: ticket.totalPrice,
            updatedAt: ticket.updatedAt,
            services: ticket.services ?? prev.services,
          }
        : prev,
    );
  }

  async function handleUpdateStatus(status: TicketStatus) {
    if (!currentTicket || updatingStatus) return;

    try {
      setUpdatingStatus(true);

      const updatedTicket = await updateTicketStatus(currentTicket.id, status);

      updateCurrentTicket({
        status: updatedTicket.status,
        totalPrice: updatedTicket.totalPrice,
        updatedAt: updatedTicket.updatedAt,
        services: updatedTicket.services,
      });

      toast.success("Status do chamado atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar status do chamado:", error);
      toast.error("Não foi possível atualizar o status do chamado.");
    } finally {
      setUpdatingStatus(false);
    }
  }

  async function handleOpenAdditionalServiceModal() {
    try {
      setLoadingServices(true);

      const services = await getActiveServices();

      setAvailableServices(services);
      setIsAdditionalServiceModalOpen(true);
    } catch (error) {
      console.error("Erro ao carregar serviços:", error);
      toast.error("Não foi possível carregar os serviços.");
    } finally {
      setLoadingServices(false);
    }
  }

  async function handleSaveAdditionalService(serviceId: string) {
    if (!currentTicket || savingService) return;

    try {
      setSavingService(true);

      const updatedTicket = await addTicketService(currentTicket.id, {
        serviceId,
        quantity: 1,
      });

      updateCurrentTicket(updatedTicket);

      toast.success("Serviço adicionado com sucesso!");
      setIsAdditionalServiceModalOpen(false);
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (message === "Service already added to this ticket") {
          toast.error("Este serviço já foi adicionado ao chamado.");
          return;
        }
      }

      toast.error("Não foi possível adicionar o serviço.");
    } finally {
      setSavingService(false);
    }
  }

  async function handleDeleteAdditionalService(ticketServiceId: string) {
    if (!currentTicket || savingService) return;

    try {
      setSavingService(true);

      const updatedTicket = await deleteTicketService(
        currentTicket.id,
        ticketServiceId,
      );

      updateCurrentTicket(updatedTicket);

      toast.success("Serviço removido com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Não foi possível remover o serviço.");
    } finally {
      setSavingService(false);
    }
  }

  if (!currentTicket) {
    return (
      <div className="flex min-h-75 flex-col items-center justify-center gap-3">
        <Text textColor="secondary">
          Não foi possível carregar os dados do chamado.
        </Text>

        <Button variant="secondary" onClick={goBackToTickets}>
          Voltar para chamados
        </Button>
      </div>
    );
  }

  const baseService = currentTicket.services?.[0];
  const additionalServices = currentTicket.services?.slice(1) ?? [];

  const canManageAdditionalServices = currentTicket.status !== "closed";

  return (
    <div className="flex flex-col gap-4 md:gap-6 md:px-30">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={goBackToTickets}
            className="group flex cursor-pointer items-center gap-2 transition-all duration-200"
          >
            <Icon
              svg={ArrowLeft}
              size="sm"
              className="fill-gray-400 group-hover:fill-gray-300"
            />

            <Text
              size="sm"
              weight="bold"
              className="text-gray-400 group-hover:text-gray-300"
            >
              Voltar
            </Text>
          </button>

          <Text as="h1" size="xl" weight="bold" textColor="blueDark">
            Chamado detalhado
          </Text>
        </div>

        {technicianStatusActions[currentTicket.status].length > 0 && (
          <div className="grid grid-cols-2 gap-2 md:flex">
            {technicianStatusActions[currentTicket.status].map((action) => (
              <Button
                key={action.value}
                className="py-2.5"
                onClick={() => handleUpdateStatus(action.value)}
                disabled={updatingStatus}
              >
                <Icon svg={action.icon} size="sm" />
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-[1fr_360px] xl:items-start">
        <div className="flex flex-col gap-4">
          <section className="rounded-xl border border-gray-200 p-5 md:p-6">
            <div className="mb-5 flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <Text textColor="quaternary" weight="bold">
                  {formatTicketCode(currentTicket.id)}
                </Text>

                <Text as="h2" size="md" weight="bold">
                  {currentTicket.title}
                </Text>
              </div>

              <BadgeStatus variant={statusVariant[currentTicket.status]}>
                {statusLabel[currentTicket.status]}
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

                  <Text>{formatDateTime(currentTicket.updatedAt)}</Text>
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

          <section className="rounded-xl border border-gray-200 p-5 md:p-6">
            <div className="mb-5 flex items-center justify-between">
              <Text size="sm" weight="bold" textColor="tertiary">
                Serviços adicionais
              </Text>

              <Button
                size="xs"
                className="py-2.5"
                onClick={handleOpenAdditionalServiceModal}
                disabled={!canManageAdditionalServices || loadingServices}
              >
                <Icon svg={Plus} size="xs" />
              </Button>
            </div>

            {additionalServices.length > 0 ? (
              <div className="flex flex-col">
                {additionalServices.map((item) => (
                  <AdditionalServiceItem
                    key={item.id}
                    name={item.service.name}
                    price={formatCurrency(item.priceAtTime)}
                    disabled={!canManageAdditionalServices || savingService}
                    onDelete={() => handleDeleteAdditionalService(item.id)}
                  />
                ))}
              </div>
            ) : (
              <Text textColor="secondary">
                Nenhum serviço adicional cadastrado.
              </Text>
            )}
          </section>
        </div>

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

      <AdditionalServiceModal
        open={isAdditionalServiceModalOpen}
        services={availableServices.map((service) => ({
          id: service.id,
          name: service.name,
          price: Number(service.price),
        }))}
        saving={savingService}
        onClose={() => setIsAdditionalServiceModalOpen(false)}
        onSave={handleSaveAdditionalService}
      />
    </div>
  );
}
