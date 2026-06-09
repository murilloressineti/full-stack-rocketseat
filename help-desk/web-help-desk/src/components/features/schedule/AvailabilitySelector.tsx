import { useState } from "react";
import TimeSlot from "./TimeSlot";
import { Text } from "@/components/ui";

interface AvailabilitySelectorProps {
  value?: string[];
  onChange?: (times: string[]) => void;
}

const MORNING_TIMES = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00"];

const AFTERNOON_TIMES = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const NIGHT_TIMES = ["19:00", "20:00", "21:00", "22:00", "23:00"];

export default function AvailabilitySelector({
  value = [],
  onChange,
}: AvailabilitySelectorProps) {
  const [selectedTimes, setSelectedTimes] = useState<string[]>(value);

  function handleToggle(time: string) {
    setSelectedTimes((prev) => {
      const updated = prev.includes(time)
        ? prev.filter((item) => item !== time)
        : [...prev, time];

      onChange?.(updated);

      return updated;
    });
  }

  return (
    <div className="flex flex-col gap-5">
      <section>
        <Text
          as={"h3"}
          size={"xs"}
          weight={"bold"}
          textColor={"tertiary"}
          className="mb-2 uppercase"
        >
          Manhã
        </Text>

        <div className="flex flex-wrap gap-2">
          {MORNING_TIMES.map((time) => (
            <TimeSlot
              key={time}
              time={time}
              selected={selectedTimes.includes(time)}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </section>

      <section>
        <Text
          as={"h3"}
          size={"xs"}
          weight={"bold"}
          textColor={"tertiary"}
          className="mb-2 uppercase"
        >
          Tarde
        </Text>

        <div className="flex flex-wrap gap-2">
          {AFTERNOON_TIMES.map((time) => (
            <TimeSlot
              key={time}
              time={time}
              selected={selectedTimes.includes(time)}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </section>

      <section>
        <Text
          as={"h3"}
          size={"xs"}
          weight={"bold"}
          textColor={"tertiary"}
          className="mb-2 uppercase"
        >
          Noite
        </Text>

        <div className="flex flex-wrap gap-2">
          {NIGHT_TIMES.map((time) => (
            <TimeSlot
              key={time}
              time={time}
              selected={selectedTimes.includes(time)}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
