import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { getTechnicians, deleteTechnician } from "@/services";
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

export default function AdminTechniciansList() {
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

  async function handleDeleteTechnician(id: string) {
    try {
      await deleteTechnician(id);

      setTechnicians((prev) =>
        prev.filter((technician) => technician.id !== id),
      );

      toast.success("Técnico excluído com sucesso!");
    } catch (error) {
      console.log("Erro ao excluir técnico", error);
      toast.error("Não foi possível excluir o técnico.");
    }
  }

  function handleConfirmDelete(technician: TechnicianListItem) {
    toast.custom((t) => (
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Text weight="bold">Excluir técnico</Text>
            <Text size="sm" textColor="secondary">
              Tem certeza que deseja excluir <strong>{technician.name}</strong>?
              Essa ação não poderá ser desfeita.
            </Text>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              size="xs"
              className="md:py-2.5 md:px-4"
              onClick={() => toast.dismiss(t)}
            >
              Cancelar
            </Button>

            <Button
              size="xs"
              className="md:py-2.5 md:px-4"
              onClick={async () => {
                toast.dismiss(t);
                await handleDeleteTechnician(technician.id);
              }}
            >
              Excluir
            </Button>
          </div>
        </div>
      </div>
    ));
  }

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
          onClick={() => navigate(`/admin/tecnicos/novo`)}
        >
          <Icon svg={Plus}></Icon>
          <Text weight={"bold"} className="hidden md:flex">
            Novo
          </Text>
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <div className="grid grid-cols-[2fr_3fr] md:grid-cols-[1.8fr_1.4fr_2fr_0.5fr] border-b border-gray-200 px-4 py-4">
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
              onDelete={() => handleConfirmDelete(technician)}
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
