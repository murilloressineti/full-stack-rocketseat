import { AvatarCircle, BadgeStatus, Button, Icon, Text } from "@/components/ui";
import { Eye } from "@/assets/icons";
import type { TicketStatus } from "@/types";

interface TicketRowProps {
  updatedAt: string;
  code: string;
  title: string;
  serviceName: string;
  totalPrice: string;

  technicianName: string;
  technicianAvatar?: string | null;

  status: TicketStatus;

  onDetails?: () => void;
}

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

export default function TicketRow({
  updatedAt,
  code,
  title,
  serviceName,
  totalPrice,
  technicianName,
  technicianAvatar,
  status,
  onDetails,
}: TicketRowProps) {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-[1.1fr_0.6fr_2fr_1.6fr_1fr_1.4fr_1.4fr_0.3fr] gap-2 items-center border-b border-gray-200 px-4 py-4">
        <Text>{updatedAt}</Text>

        <Text weight="bold">{code}</Text>

        <Text weight="bold" className="truncate">
          {title}
        </Text>

        <Text className="truncate">{serviceName}</Text>

        <Text>{totalPrice}</Text>

        <div className="flex items-center gap-2 min-w-0">
          <AvatarCircle
            name={technicianName}
            avatar={technicianAvatar}
            size="xs"
            variant="blueDark"
          />
          <Text className="truncate">{technicianName}</Text>
        </div>

        <BadgeStatus variant={statusVariant[status]}>
          {statusLabel[status]}
        </BadgeStatus>

        <Button variant="secondary" size="xs" onClick={onDetails}>
          <Icon svg={Eye} size="xs" />
        </Button>
      </div>

      {/* Mobile */}
      <div className="md:hidden grid grid-cols-[1.2fr_2fr_0.8fr] gap-2 items-center border-b border-gray-200 px-3 py-4">
        <Text>{updatedAt}</Text>

        <div className="flex ml-2 flex-col min-w-0">
          <Text weight="bold" className="truncate">
            {title}
          </Text>
          <Text size="sm" textColor="secondary" className="truncate">
            {serviceName}
          </Text>
        </div>

        <div className="flex justify-end gap-4">
          <BadgeStatus variant={statusVariant[status]}>
            {statusLabel[status]}
          </BadgeStatus>
          <Button variant="secondary" size="xs" onClick={onDetails}>
            <Icon svg={Eye} size="xs" />
          </Button>
        </div>
      </div>
    </>
  );
}
