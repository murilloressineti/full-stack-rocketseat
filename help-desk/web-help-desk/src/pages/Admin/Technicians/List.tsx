import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getTechnicians } from "@/services";

import type { Technician } from "@/types";

import { TechnicianModal, TechnicianRow } from "./components";
import { Button, Icon, Skeleton, Text } from "@/components/ui";

import { Plus } from "@/assets/icons";

type TechnicianListItem = {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  availability: string[];
};

function formatTechnicianListItem(technician: Technician): TechnicianListItem {
  return {
    id: technician.id,
    name: technician.name,
    email: technician.email,
    avatar: technician.avatar ?? null,
    availability: technician.availability ?? [],
  };
}

export default function AdminTechniciansList() {
  const [technicians, setTechnicians] = useState<TechnicianListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTechnician, setSelectedTechnician] =
    useState<TechnicianListItem | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadTechnicians() {
      try {
        const data = await getTechnicians();

        setTechnicians(data.map(formatTechnicianListItem));
      } catch (error) {
        console.error("Erro ao carregar técnicos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTechnicians();
  }, []);

  function handleCreateTechnician() {
    navigate("/admin/tecnicos/novo");
  }

  function handleEditTechnician(technician: TechnicianListItem) {
    navigate(`/admin/tecnicos/${technician.id}/editar`, {
      state: { technician },
    });
  }

  function handleCloseModal() {
    setSelectedTechnician(null);
  }

  function handleDeleteSuccess(technicianId: string) {
    setTechnicians((prev) =>
      prev.filter((technician) => technician.id !== technicianId),
    );

    handleCloseModal();
  }

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex items-center justify-between">
        <Text as="h1" size="xl" weight="bold" textColor="blueDark">
          Técnicos
        </Text>

        <Button
          size="xs"
          className="md:px-4 md:py-2.5"
          onClick={handleCreateTechnician}
        >
          <Icon svg={Plus} />

          <Text weight="bold" className="hidden md:flex">
            Novo
          </Text>
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <div className="grid grid-cols-[2fr_3fr] border-b border-gray-200 px-4 py-4 md:grid-cols-[1.8fr_1.4fr_2fr_0.5fr]">
          <Text weight="bold" textColor="tertiary">
            Nome
          </Text>

          <Text weight="bold" textColor="tertiary" className="hidden md:flex">
            E-mail
          </Text>

          <Text weight="bold" textColor="tertiary">
            Disponibilidade
          </Text>

          <div />
        </div>

        {technicians.length > 0 ? (
          technicians.map((technician) => (
            <TechnicianRow
              key={technician.id}
              id={technician.id}
              name={technician.name}
              email={technician.email}
              avatar={technician.avatar}
              availability={technician.availability}
              onEdit={() => handleEditTechnician(technician)}
              onDelete={() => setSelectedTechnician(technician)}
            />
          ))
        ) : (
          <div className="px-4 py-6">
            <Text textColor="secondary">Nenhum técnico cadastrado.</Text>
          </div>
        )}
      </div>

      {selectedTechnician && (
        <TechnicianModal
          technician={selectedTechnician}
          onClose={handleCloseModal}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </div>
  );
}
