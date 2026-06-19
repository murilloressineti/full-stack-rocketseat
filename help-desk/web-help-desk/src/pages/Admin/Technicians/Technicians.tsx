import { useState, useEffect } from "react";
import { getTechnicians } from "@/services";
import type { AppUser } from "@/types";

import { AvatarCircle, Button, BadgeTime, Icon, Text } from "@/components/ui";
import { PenLine, Plus } from "@/assets/icons";

interface TechnicianProps {
  name: string;
  avatar?: string | null;
}

export default function AdminTechnicians({ name, avatar }: TechnicianProps) {
  const [technicians, setTechnicians] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTechnicians() {
      try {
        const data = await getTechnicians();

        setTechnicians(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadTechnicians();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex items-center justify-between">
        <Text as="h1" size="xl" weight={"bold"} textColor={"blueDark"}>
          Técnicos
        </Text>

        <Button size={"xs"} className="md:py-2.5 md:px-4">
          <Icon svg={Plus}></Icon>
          <Text weight={"bold"} className="hidden md:flex">
            Novo
          </Text>
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1.5fr_1.90fr] border-b border-gray-200 px-4 py-4">
          <Text weight="bold" textColor={"tertiary"}>
            Nome
          </Text>
          <Text weight="bold" textColor={"tertiary"} className="hidden md:flex">
            E-mail
          </Text>
          <Text weight="bold" textColor={"tertiary"}>
            Disponibilidade
          </Text>
          <div />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-[2fr_1.5fr_1.75fr_0.15fr] border-b border-gray-200 px-4 py-4 items-center">
          <div className="flex items-center gap-3">
            <AvatarCircle name={name} avatar={avatar} />
            <Text weight="bold">Carlos Silva</Text>
          </div>

          <Text className="hidden md:flex">carlos.silva@test.com</Text>

          <div className="flex gap-1">
            <BadgeTime variant={"disabled"}>08:00</BadgeTime>
            <BadgeTime variant={"disabled"}>09:00</BadgeTime>
            <BadgeTime variant={"disabled"}>10:00</BadgeTime>
            <BadgeTime variant={"disabled"}>11:00</BadgeTime>
            <BadgeTime variant={"disabled"}>+4</BadgeTime>
          </div>

          <Button variant={"secondary"} size={"xs"}>
            <Icon svg={PenLine} size={"xs"}></Icon>
          </Button>
        </div>
      </div>

      {technicians.map((technician) => (
        <div key={technician.id}>
          <p>{technician.name}</p>
          <p>{technician.email}</p>
        </div>
      ))}
    </div>
  );
}

// 1.Criar TechnicianRow
// 2.Criar AvatarCircle ✅
// 3.Fazer o row receber um objeto mockado
// 4.Fazer desktop e mobile ficarem visualmente idênticos ao Figma
// 5.Só depois trocar os mocks por: .map(...)
