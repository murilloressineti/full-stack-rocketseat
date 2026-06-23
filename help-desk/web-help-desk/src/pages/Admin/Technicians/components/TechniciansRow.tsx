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

export default function TechnicianRow({
  id,
  name,
  email,
  avatar,
  availability,
  onEdit,
  onDelete,
}: TechnicianRowProps) {
  const visibleAvailability = availability.slice(0, 4);
  const remainingCount = availability.length - visibleAvailability.length;

  const visibleAvailabilityMobile = availability.slice(0, 1);
  const remainingCountMobile =
    availability.length - visibleAvailabilityMobile.length;

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-[1.8fr_1.4fr_2fr_0.5fr] items-center border-b border-gray-200 px-4 py-4">
        <div className="flex items-center gap-3 min-w-0">
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
          {visibleAvailability.map((time) => (
            <BadgeTime key={time} variant="disabled">
              {time}
            </BadgeTime>
          ))}

          {remainingCount > 0 && (
            <BadgeTime variant="disabled">+{remainingCount}</BadgeTime>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="secondary" size="xs" onClick={onDelete}>
            <Icon svg={Trash} size="xs" className="fill-feedback-danger" />
          </Button>
          <Button variant="secondary" size="xs" onClick={onEdit}>
            <Icon svg={PenLine} size="xs" />
          </Button>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden border-b border-gray-200 px-3 py-4">
        <div className="grid grid-cols-[2fr_2fr_1fr] items-center">
          <div className="flex items-center gap-3 w-30">
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
            {visibleAvailabilityMobile.map((time) => (
              <BadgeTime key={time} variant="disabled">
                {time}
              </BadgeTime>
            ))}

            {remainingCountMobile > 0 && (
              <BadgeTime variant="disabled">+{remainingCountMobile}</BadgeTime>
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="secondary" size="xs" onClick={onDelete}>
              <Icon svg={Trash} size="xs" className="fill-feedback-danger" />
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
