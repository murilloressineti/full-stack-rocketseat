import { BadgeStatus, Text } from "@/components/ui";
import TicketCard from "./TicketCard";
import type { TechnicianTicketCardData } from "@/services";

interface TicketSectionProps {
  title: string;
  status: "open" | "in_progress" | "closed";
  tickets: TechnicianTicketCardData[];
  onDetails: (ticket: TechnicianTicketCardData) => void;
  onQuickAction: (ticket: TechnicianTicketCardData) => void;
}

const statusVariant = {
  open: "open",
  in_progress: "progress",
  closed: "done",
} as const;

export default function TicketSection({
  title,
  status,
  tickets,
  onDetails,
  onQuickAction,
}: TicketSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <BadgeStatus
        variant={statusVariant[status]}
        className="w-fit flex h-auto px-2 py-1.5"
      >
        <Text as={"span"} size={"xs"} weight={"bold"}>
          {title}
        </Text>
      </BadgeStatus>

      {tickets.length > 0 ? (
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
