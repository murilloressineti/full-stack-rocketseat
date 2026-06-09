import { BadgeTime } from "@/components/ui";

interface TimeSlotProps {
  time: string;
  selected: boolean;
  onToggle: (time: string) => void;
}

export default function TimeSlot({
  time,
  selected,
  onToggle,
}: TimeSlotProps) {
  return (
    <BadgeTime
      variant={selected ? "selected" : "available"}
      onClick={() => onToggle(time)}
    >
      {time}
    </BadgeTime>
  );
}