import type { TicketStatus } from "@/types";

import { AvatarCircle, BadgeStatus, Button, Icon, Text } from "@/components/ui";

import { Eye } from "@/assets/icons";

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

function TechnicianInfo({
  name,
  avatar,
}: {
  name: string;
  avatar?: string | null;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      <AvatarCircle name={name} avatar={avatar} size="xs" variant="blueDark" />

      <Text className="truncate">{name}</Text>
    </div>
  );
}

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
  const statusBadge = (
    <BadgeStatus variant={statusVariant[status]}>
      {statusLabel[status]}
    </BadgeStatus>
  );

  const detailsButton = (
    <Button variant="secondary" size="xs" onClick={onDetails}>
      <Icon svg={Eye} size="xs" />
    </Button>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden items-center gap-2 border-b border-gray-200 px-4 py-4 md:grid md:grid-cols-[1.1fr_0.6fr_1.6fr_1.8fr_1fr_1.4fr_1.4fr_0.3fr]">
        <Text>{updatedAt}</Text>

        <Text weight="bold">{code}</Text>

        <Text weight="bold" className="truncate">
          {title}
        </Text>

        <Text className="truncate">{serviceName}</Text>

        <Text>{totalPrice}</Text>

        <TechnicianInfo name={technicianName} avatar={technicianAvatar} />

        {statusBadge}

        {detailsButton}
      </div>

      {/* Mobile */}
      <div className="grid grid-cols-[1.2fr_2fr_0.8fr] items-center gap-2 border-b border-gray-200 px-3 py-4 md:hidden">
        <Text>{updatedAt}</Text>

        <div className="ml-2 flex min-w-0 flex-col">
          <Text weight="bold" className="truncate">
            {title}
          </Text>

          <Text size="sm" textColor="secondary" className="truncate">
            {serviceName}
          </Text>
        </div>

        <div className="flex justify-end gap-4">
          {statusBadge}
          {detailsButton}
        </div>
      </div>
    </>
  );
}
