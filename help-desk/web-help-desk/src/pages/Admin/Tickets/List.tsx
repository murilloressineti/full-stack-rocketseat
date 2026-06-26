import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { getTickets } from "@/services";
import type { Ticket } from "@/types";

import { Text } from "@/components/ui";
import TicketRow from "./components/TicketRow";

type TicketListItem = {
  id: string;
  code: string;
  title: string;
  serviceName: string;
  totalPrice: string | number;
  clientName: string;
  clientAvatar?: string | null;
  technicianName: string;
  technicianAvatar?: string | null;
  status: Ticket["status"];
  updatedAt: string;
};

export default function AdminTicketsList() {
  const [tickets, setTickets] = useState<TicketListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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

  function formatTicketCode(index: number) {
    return String(index + 1).padStart(5, "0");
  }

  useEffect(() => {
    async function loadTickets() {
      try {
        const data = await getTickets();

        const formattedTickets: TicketListItem[] = data.map((ticket, index) => {
          const mainService = ticket.services?.[0]?.service;

          return {
            id: ticket.id,
            code: formatTicketCode(index),
            title: ticket.title,
            serviceName: mainService?.name ?? "Sem serviço",
            totalPrice: ticket.totalPrice,
            clientName: ticket.client.name,
            clientAvatar: ticket.client.avatar ?? null,
            technicianName: ticket.technician.name,
            technicianAvatar: ticket.technician.avatar ?? null,
            status: ticket.status,
            updatedAt: formatDateTime(ticket.updatedAt),
          };
        });

        setTickets(formattedTickets);
      } catch (error) {
        console.error("Erro ao carregar chamados:", error);
        toast.error("Não foi possível carregar os chamados.");
      } finally {
        setLoading(false);
      }
    }

    loadTickets();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <Text as="h1" size="xl" weight="bold" textColor="blueDark">
        Chamados
      </Text>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <div className="grid grid-cols-[1fr_2fr_0.8fr] md:grid-cols-[1.1fr_0.6fr_2.4fr_1fr_1.5fr_1.5fr_1.4fr_0.3fr] border-b border-gray-200 px-4 py-4">
          <Text weight="bold" textColor="tertiary" className="truncate">
            Atualizado em
          </Text>
          <Text weight="bold" textColor="tertiary" className="hidden md:flex">
            Id
          </Text>
          <Text weight="bold" textColor="tertiary">
            Título e Serviço
          </Text>
          <Text weight="bold" textColor="tertiary" className="hidden md:flex">
            Valor total
          </Text>
          <Text weight="bold" textColor="tertiary" className="hidden md:flex">
            Cliente
          </Text>
          <Text weight="bold" textColor="tertiary" className="hidden md:flex">
            Técnico
          </Text>
          <Text weight="bold" textColor="tertiary">
            Status
          </Text>
          <div />
        </div>

        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <TicketRow
              key={ticket.id}
              updatedAt={ticket.updatedAt}
              code={ticket.code}
              title={ticket.title}
              serviceName={ticket.serviceName}
              totalPrice={formatCurrency(ticket.totalPrice)}
              clientName={ticket.clientName}
              clientAvatar={ticket.clientAvatar}
              technicianName={ticket.technicianName}
              technicianAvatar={ticket.technicianAvatar}
              status={ticket.status}
              onDetails={() =>
                navigate(`/admin/chamados/${ticket.id}`, {
                  state: { ticket },
                })
              }
            />
          ))
        ) : (
          <div className="px-4 py-6">
            <Text textColor="secondary">Nenhum chamado cadastrado.</Text>
          </div>
        )}
      </div>
    </div>
  );
}
