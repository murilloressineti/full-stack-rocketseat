import { CircleCheck, Clock, PenLine } from "@/assets/icons";
import { AvatarCircle, BadgeStatus, Button, Icon, Text } from "@/components/ui";
import type { TechnicianTicketCardData } from "@/services";

export type TechnicianTicketStatus = "open" | "in_progress" | "closed";

interface TicketCardProps {
  ticket: TechnicianTicketCardData;
  onDetails?: () => void;
  onQuickAction?: () => void;
}

const statusVariant: Record<
  TechnicianTicketStatus,
  "open" | "progress" | "done"
> = {
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

function formatTicketCode(id: string) {
  return `#${id.slice(-5).toUpperCase()}`;
}

export default function TicketCard({
  ticket,
  onDetails,
  onQuickAction,
}: TicketCardProps) {
  const quickAction =
    ticket.status === "open"
      ? { icon: Clock, label: "Iniciar" }
      : ticket.status === "in_progress"
        ? { icon: CircleCheck, label: "Encerrar" }
        : null;

  return (
    <article className="rounded-xl border border-gray-200 p-5">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Text textColor="tertiary" weight="bold">
            {formatTicketCode(ticket.id)}
          </Text>

          <Text as="h2" size="md" weight="bold" className="mt-1 truncate">
            {ticket.title}
          </Text>

          <Text className="truncate">{ticket.serviceName}</Text>
        </div>

        <div className="flex shrink-0 gap-1.5">
          <Button variant="secondary" size="xs" onClick={onDetails}>
            <Icon svg={PenLine} size="xs" />
          </Button>

          {quickAction && (
            <Button size="xs" onClick={onQuickAction}>
              <Icon svg={quickAction.icon} size="xs" />

              <Text size="xs" weight="bold">
                {quickAction.label}
              </Text>
            </Button>
          )}
        </div>
      </header>

      <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-4">
        <Text>{formatDateTime(ticket.updatedAt)}</Text>

        <Text>{formatCurrency(ticket.totalPrice)}</Text>
      </div>

      <footer className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-1.5">
          <AvatarCircle
            name={ticket.clientName}
            avatar={ticket.clientAvatar}
            size="xs"
            variant="blueDark"
          />

          <Text weight="bold" className="truncate">
            {ticket.clientName}
          </Text>
        </div>

        <BadgeStatus
          className="md:px-1.5 md:py-1.5"
          variant={statusVariant[ticket.status]}
        />
      </footer>
    </article>
  );
}
