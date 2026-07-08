import { AvatarCircle, BadgeTime, Button, Icon, Text } from "@/components/ui";

import { PenLine, Trash } from "@/assets/icons";

interface TechnicianRowProps {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  availability: string[];
  onEdit?: () => void;
  onDelete?: () => void;
}

function AvailabilityBadges({
  availability,
  limit,
}: {
  availability: string[];
  limit: number;
}) {
  const visibleTimes = availability.slice(0, limit);
  const remainingCount = availability.length - visibleTimes.length;

  return (
    <>
      {visibleTimes.map((time) => (
        <BadgeTime key={time} variant="disabled">
          {time}
        </BadgeTime>
      ))}

      {remainingCount > 0 && (
        <BadgeTime variant="disabled">+{remainingCount}</BadgeTime>
      )}
    </>
  );
}

export default function TechnicianRow({
  name,
  email,
  avatar,
  availability,
  onEdit,
  onDelete,
}: TechnicianRowProps) {
  const actionButtons = (
    <>
      <Button variant="secondary" size="xs" onClick={onDelete}>
        <Icon svg={Trash} size="xs" className="fill-feedback-danger" />
      </Button>

      <Button variant="secondary" size="xs" onClick={onEdit}>
        <Icon svg={PenLine} size="xs" />
      </Button>
    </>
  );

  return (
    <>
      {/* Desktop */}
      <div className="hidden items-center border-b border-gray-200 px-4 py-4 md:grid md:grid-cols-[1.8fr_1.4fr_2fr_0.5fr]">
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

        <div className="flex flex-wrap gap-1">
          <AvailabilityBadges availability={availability} limit={4} />
        </div>

        <div className="flex justify-end gap-2">{actionButtons}</div>
      </div>

      {/* Mobile */}
      <div className="border-b border-gray-200 px-3 py-4 md:hidden">
        <div className="grid grid-cols-[2fr_2fr_1fr] items-center">
          <div className="flex w-30 items-center gap-3">
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

          <div className="flex flex-wrap gap-1">
            <AvailabilityBadges availability={availability} limit={2} />
          </div>

          <div className="flex justify-end gap-2">{actionButtons}</div>
        </div>
      </div>
    </>
  );
}
