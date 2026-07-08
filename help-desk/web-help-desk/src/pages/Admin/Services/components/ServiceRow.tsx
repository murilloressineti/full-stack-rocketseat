import { Ban, CircleCheck, PenLine } from "@/assets/icons";

import { BadgeStatus, Button, Icon, Text } from "@/components/ui";

interface ServiceRowProps {
  name: string;
  price: string;
  active: boolean;
  onEdit?: () => void;
  onToggleStatus?: () => void;
}

export default function ServiceRow({
  name,
  price,
  active,
  onEdit,
  onToggleStatus,
}: ServiceRowProps) {
  const statusLabel = active ? "Ativo" : "Inativo";
  const statusVariant = active ? "done" : "danger";
  const toggleIcon = active ? Ban : CircleCheck;
  const toggleLabel = active ? "Desativar" : "Reativar";

  const actionButtons = (
    <>
      <Button variant="link" size="xs" onClick={onToggleStatus}>
        <Icon svg={toggleIcon} size="xs" className="fill-gray-400" />

        <Text
          size="xs"
          weight="bold"
          textColor="quaternary"
          className="hidden md:flex"
        >
          {toggleLabel}
        </Text>
      </Button>

      <Button variant="secondary" size="xs" onClick={onEdit}>
        <Icon svg={PenLine} size="xs" />
      </Button>
    </>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden items-center border-b border-gray-200 px-4 py-4 md:grid md:grid-cols-[3fr_1.3fr_1fr_1fr]">
        <Text weight="bold" className="truncate">
          {name}
        </Text>

        <Text>{price}</Text>

        <BadgeStatus variant={statusVariant}>{statusLabel}</BadgeStatus>

        <div className="flex justify-end gap-2">{actionButtons}</div>
      </div>

      {/* Mobile */}
      <div className="border-b border-gray-200 px-3 py-4 md:hidden">
        <div className="grid grid-cols-[1.3fr_1.3fr_0.8fr_1fr] gap-6">
          <Text weight="bold" className="truncate">
            {name}
          </Text>

          <Text textColor="secondary">{price}</Text>

          <BadgeStatus variant={statusVariant}>{statusLabel}</BadgeStatus>

          <div className="flex justify-end gap-2">{actionButtons}</div>
        </div>
      </div>
    </>
  );
}
