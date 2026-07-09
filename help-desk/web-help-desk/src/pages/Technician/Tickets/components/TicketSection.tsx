import type { TechnicianTicketCardData } from "@/services";

import type { TicketStatus } from "@/types";

import TicketCard from "./TicketCard";
import { BadgeStatus, Text } from "@/components/ui";

interface TicketSectionProps {
  title: string;
  status: TicketStatus;
  tickets: TechnicianTicketCardData[];
  onDetails: (ticket: TechnicianTicketCardData) => void;
  onQuickAction: (ticket: TechnicianTicketCardData) => void;
}

const statusVariant: Record<TicketStatus, "open" | "progress" | "done"> = {
  open: "open",
  in_progress: "progress",
  closed: "done",
};

export default function TicketSection({
  title,
  status,
  tickets,
  onDetails,
  onQuickAction,
}: TicketSectionProps) {
  const hasTickets = tickets.length > 0;

  return (
    <section className="flex flex-col gap-4">
      <BadgeStatus
        variant={statusVariant[status]}
        className="flex h-auto w-fit px-2 py-1.5"
      >
        <Text as="span" size="xs" weight="bold">
          {title}
        </Text>
      </BadgeStatus>

      {hasTickets ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          {tickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onDetails={() => onDetails(ticket)}
              onQuickAction={() => onQuickAction(ticket)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 p-5">
          <Text textColor="secondary">Nenhum chamado nesta seção.</Text>
        </div>
      )}
    </section>
  );
}
