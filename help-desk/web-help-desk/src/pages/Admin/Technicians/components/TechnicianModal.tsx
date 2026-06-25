import { useState } from "react";
import { toast } from "sonner";

import { deleteTechnician } from "@/services";

import { Button, Icon, Text } from "@/components/ui";
import { X } from "@/assets/icons";

interface TechnicianModalProps {
  technician: {
    id: string;
    name: string;
  };
  onClose: () => void;
  onSuccess: (technicianId: string) => void;
}

export default function TechnicianModal({
  technician,
  onClose,
  onSuccess,
}: TechnicianModalProps) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    try {
      setDeleting(true);

      await deleteTechnician(technician.id);

      toast.success("Técnico excluído com sucesso!");
      onSuccess(technician.id);
    } catch (error) {
      console.error("Erro ao excluir técnico:", error);
      toast.error("Não foi possível excluir o técnico.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-default/50 px-4">
      <div className="w-full max-w-md rounded-xl bg-bg-light shadow-lg">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <Text as="h2" size="md" weight="bold">
            Excluir técnico
          </Text>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer transition-all duration-200 hover:scale-110"
          >
            <Icon svg={X} className="fill-gray-400" />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-6 pb-8 pt-6">
          <Text size="md">
            Deseja realmente excluir <strong>{technician.name}</strong>?
          </Text>

          <Text size="md">
            Ao excluir, todos os chamados atribuídos a este técnico poderão ser
            afetados e esta ação não poderá ser desfeita.
          </Text>
        </div>

        <div className="border-t border-gray-200 px-6 py-6">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="secondary"
              className="w-full py-2.5"
              onClick={onClose}
              disabled={deleting}
            >
              Cancelar
            </Button>

            <Button
              className="w-full py-2.5"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Excluindo..." : "Sim, excluir"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
