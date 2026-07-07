import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Skeleton, Text } from "@/components/ui";
import { getTechnicianTicketCards, updateTicketStatus } from "@/services";
import type { TechnicianTicketCardData } from "@/services";
import type { TicketStatus } from "@/types";

import TicketSection from "./components/TicketSection";

export default function TechnicianTicketsList() {
  const [tickets, setTickets] = useState<TechnicianTicketCardData[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadTickets() {
      try {
        const data = await getTechnicianTicketCards();
        setTickets(data);
      } catch (error) {
        console.error("Erro ao carregar chamados:", error);
        toast.error("Não foi possível carregar os chamados.");
      } finally {
        setLoading(false);
      }
    }

    loadTickets();
  }, []);

  const openTickets = tickets.filter((ticket) => ticket.status === "open");

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "in_progress",
  );

  const closedTickets = tickets.filter((ticket) => ticket.status === "closed");

    if (loading) {
      return <Skeleton />;
    }

  function handleDetails(ticket: TechnicianTicketCardData) {
    navigate(`/tecnico/chamados/${ticket.id}`, {
      state: { ticket },
    });
  }

  async function handleQuickAction(ticket: TechnicianTicketCardData) {
    const nextStatus: TicketStatus =
      ticket.status === "open" ? "in_progress" : "closed";

    try {
      const updatedTicket = await updateTicketStatus(ticket.id, nextStatus);

      setTickets((prev) =>
        prev.map((item) =>
          item.id === ticket.id
            ? {
                ...item,
                status: updatedTicket.status,
                updatedAt: updatedTicket.updatedAt,
                totalPrice: updatedTicket.totalPrice,
              }
            : item,
        ),
      );

      toast.success(
        nextStatus === "in_progress"
          ? "Atendimento iniciado com sucesso!"
          : "Chamado encerrado com sucesso!",
      );
    } catch (error) {
      console.error("Erro ao atualizar chamado:", error);
      toast.error("Não foi possível atualizar o chamado.");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Text as="h1" size="xl" weight="bold" textColor="blueDark">
        Meus chamados
      </Text>

      <TicketSection
        title="Aberto"
        status="open"
        tickets={openTickets}
        onDetails={handleDetails}
        onQuickAction={handleQuickAction}
      />

      <TicketSection
        title="Em atendimento"
        status="in_progress"
        tickets={inProgressTickets}
        onDetails={handleDetails}
        onQuickAction={handleQuickAction}
      />

      <TicketSection
        title="Encerrado"
        status="closed"
        tickets={closedTickets}
        onDetails={handleDetails}
        onQuickAction={handleQuickAction}
      />
    </div>
  );
}
