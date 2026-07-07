import TimeSlot from "./TimeSlot";
import { Text } from "@/components/ui";
import { SCHEDULE_SECTIONS } from "./constants";

interface AvailabilitySelectorProps {
  value: string[];
  onChange: (times: string[]) => void;
}

export default function AvailabilitySelector({
  value,
  onChange,
}: AvailabilitySelectorProps) {
  function handleToggle(time: string) {
    const updated = value.includes(time)
      ? value.filter((item) => item !== time)
      : [...value, time];

    onChange(updated);
  }
  return (
    <div className="flex flex-col gap-5">
      {SCHEDULE_SECTIONS.map((section) => (
        <section key={section.label}>
          <Text
            as="h3"
            size="xs"
            weight="bold"
            textColor="tertiary"
            className="mb-2 uppercase"
          >
            {section.label}
          </Text>

          <div className="flex flex-wrap gap-2">
            {section.times.map((time) => (
              <TimeSlot
                key={time}
                time={time}
                selected={value.includes(time)}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
