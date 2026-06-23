import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getTechnicians } from "@/services";
import type { Technician } from "@/types";

import { Button, Icon, Text } from "@/components/ui";
import TechnicianRow from "./components/TechniciansRow";
import { Plus } from "@/assets/icons";

type TechnicianListItem = {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  availability: string[];
};

export default function AdminTechnicians() {
  const [technicians, setTechnicians] = useState<TechnicianListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadTechnicians() {
      try {
        const data = await getTechnicians();

        const formattedTechnicians: TechnicianListItem[] = data.map(
          (technician: Technician) => ({
            id: technician.id,
            name: technician.name,
            email: technician.email,
            avatar: technician.avatar ?? null,
            availability: technician.availability ?? [],
          }),
        );

        setTechnicians(formattedTechnicians);
      } catch (error) {
        console.error("Erro ao carregar técnicos:", error);
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

        <Button
          size={"xs"}
          className="md:py-2.5 md:px-4"
          onClick={() => navigate(`/admin/tecnicos/criar-tecnico`)}
        >
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

        {/* Lista */}
        {technicians.length > 0 ? (
          technicians.map((technician) => (
            <TechnicianRow
              key={technician.id}
              id={technician.id}
              name={technician.name}
              email={technician.email}
              avatar={technician.avatar}
              availability={technician.availability}
              // onEdit é a função que será chamada quando o usuário clicar no botão de editar na linha do técnico. Ela navega para a rota de edição do técnico, passando o ID do técnico e os dados do técnico como estado.
              onEdit={() =>
                navigate(`/admin/tecnicos/${technician.id}/editar`, {
                  state: { technician },
                })
              }
            />
          ))
        ) : (
          <div className="px-4 py-6">
            <Text textColor="secondary">Nenhum técnico cadastrado.</Text>
          </div>
        )}
      </div>
    </div>
  );
}
