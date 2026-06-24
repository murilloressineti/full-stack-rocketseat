import { BadgeStatus, Button, Icon, Text } from "@/components/ui";
import { Ban, CircleCheck, PenLine } from "@/assets/icons";

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
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-[3fr_1.3fr_1fr_1fr] items-center border-b border-gray-200 px-4 py-4">
        <Text weight="bold" className="truncate">
          {name}
        </Text>

        <Text>{price}</Text>

        <BadgeStatus variant={active ? "done" : "danger"}>
          {active ? "Ativo" : "Inativo"}
        </BadgeStatus>

        <div className="flex justify-end gap-2">
          <Button onClick={onToggleStatus} size="xs" variant="link">
            <Icon
              svg={active ? Ban : CircleCheck}
              size="xs"
              className="fill-gray-400"
            />
            <Text size="xs" weight="bold" textColor="quaternary">
              {active ? "Desativar" : "Reativar"}
            </Text>
          </Button>

          <Button variant="secondary" size="xs" onClick={onEdit}>
            <Icon svg={PenLine} size="xs" />
          </Button>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden border-b border-gray-200 px-3 py-4">
        <div className="grid grid-cols-[1.3fr_1.3fr_0.8fr_1fr] gap-6">
          <Text weight="bold" className="truncate">
            {name}
          </Text>

          <Text textColor="secondary">{price}</Text>

          <BadgeStatus variant={active ? "done" : "danger"}>
            {active ? "Ativo" : "Inativo"}
          </BadgeStatus>

          <div className="flex justify-end gap-2">
            <Button variant="link" size="xs" onClick={onToggleStatus}>
              <Icon
                svg={active ? Ban : CircleCheck}
                size="xs"
                className="fill-gray-400"
              />
            </Button>

            <Button variant="secondary" size="xs" onClick={onEdit}>
              <Icon svg={PenLine} size="xs" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
