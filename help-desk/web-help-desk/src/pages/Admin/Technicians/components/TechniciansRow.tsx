import { AvatarCircle, BadgeTime, Button, Icon, Text } from "@/components/ui";
import { PenLine } from "@/assets/icons";

interface TechnicianRowProps {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  availability: string[];
  onEdit?: () => void;
}

export default function TechnicianRow({
  id,
  name,
  email,
  avatar,
  availability,
  onEdit,
}: TechnicianRowProps) {
  const visibleAvailability = availability.slice(0, 4);
  const remainingCount = availability.length - visibleAvailability.length;

  const visibleAvailabilityMobile = availability.slice(0, 1);
  const remainingCountMobile =
    availability.length - visibleAvailabilityMobile.length;

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:grid md:grid-cols-[2fr_1.5fr_1.75fr_0.15fr] items-center gap-4 border-b border-gray-200 px-4 py-4">
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

        <Button variant="secondary" size="xs" onClick={onEdit}>
          <Icon svg={PenLine} size="xs" />
        </Button>
      </div>

      {/* Mobile */}
      <div className="md:hidden border-b border-gray-200 px-3 py-4">
        <div className="flex items-center justify-between">
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

          <Button variant="secondary" size="xs" onClick={onEdit}>
            <Icon svg={PenLine} size="xs" />
          </Button>
        </div>
      </div>
    </>
  );
}
