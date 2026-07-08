import { AvatarCircle, Button, Icon, Text } from "@/components/ui";

import { PenLine, Trash } from "@/assets/icons";

interface ClientRowProps {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ClientRow({
  name,
  email,
  avatar,
  onEdit,
  onDelete,
}: ClientRowProps) {
  const actions = (
    <div className="flex justify-end gap-2">
      <Button variant="secondary" size="xs" onClick={onDelete}>
        <Icon svg={Trash} size="xs" className="fill-feedback-danger" />
      </Button>

      <Button variant="secondary" size="xs" onClick={onEdit}>
        <Icon svg={PenLine} size="xs" />
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden items-center border-b border-gray-200 px-4 py-4 md:grid md:grid-cols-[2fr_1.5fr_0.5fr]">
        <div className="flex min-w-0 items-center gap-3">
          <AvatarCircle
            name={name}
            avatar={avatar}
            size="sm"
            variant="blueDark"
          />

          <Text weight="bold" className="truncate">
            {name}
          </Text>
        </div>

        <Text className="truncate">{email}</Text>

        {actions}
      </div>

      {/* Mobile */}
      <div className="border-b border-gray-200 px-3 py-4 md:hidden">
        <div className="grid grid-cols-[1.5fr_1.5fr_0.5fr] items-center gap-2">
          <div className="flex min-w-0 items-center gap-3">
            <AvatarCircle
              name={name}
              avatar={avatar}
              size="sm"
              variant="blueDark"
            />

            <Text weight="bold" className="truncate">
              {name}
            </Text>
          </div>

          <Text size="sm" className="truncate">
            {email}
          </Text>

          {actions}
        </div>
      </div>
    </>
  );
}
