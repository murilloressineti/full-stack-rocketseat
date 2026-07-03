import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Text } from "@/components/ui";
import { getTechnicianTicketCards } from "@/services";
import type { TechnicianTicketCardData } from "@/services";

import TicketSection from "./components/TicketSection";

export default function TechnicianTicketsList() {
  const [tickets, setTickets] = useState<TechnicianTicketCardData[]>([]);
  const [loading, setLoading] = useState(true);

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
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <Text as="h1" size="xl" weight="bold" textColor="blueDark">
        Meus chamados
      </Text>

      <TicketSection title="Aberto" status="open" tickets={openTickets} />

      <TicketSection
        title="Em atendimento"
        status="in_progress"
        tickets={inProgressTickets}
      />

      <TicketSection
        title="Encerrado"
        status="closed"
        tickets={closedTickets}
      />
    </div>
  );
}
