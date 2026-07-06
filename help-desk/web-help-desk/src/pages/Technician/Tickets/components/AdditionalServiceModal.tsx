import { useEffect, useMemo, useState } from "react";

import { Button, Icon, Input, Select, Text } from "@/components/ui";
import { X } from "@/assets/icons";

interface ServiceOption {
  id: string;
  name: string;
  price: number;
}

interface AdditionalServiceModalProps {
  open: boolean;
  services: ServiceOption[];

  saving?: boolean;

  onClose: () => void;
  onSave: (serviceId: string) => void;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default function AdditionalServiceModal({
  open,
  services,
  saving,
  onClose,
  onSave,
}: AdditionalServiceModalProps) {
  const [selectedServiceId, setSelectedServiceId] = useState("");

  useEffect(() => {
    if (!open) {
      setSelectedServiceId("");
    }
  }, [open]);

  const selectedService = useMemo(() => {
    return services.find((service) => service.id === selectedServiceId);
  }, [selectedServiceId, services]);

  function handleSave() {
    if (!selectedServiceId) return;

    onSave(selectedServiceId);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-default/50 px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="w-full max-w-lg rounded-xl bg-bg-light shadow-lg"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <Text as="h2" size="lg" weight="bold">
            Serviço adicional
          </Text>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer transition-all duration-200 hover:scale-110"
          >
            <Icon svg={X} className="fill-gray-400" />
          </button>
        </div>

        <div className="flex flex-col gap-5 px-6 py-6">
          <Select
            label="Descrição"
            value={selectedServiceId}
            onChange={(event) => {
              setSelectedServiceId(event.target.value);
            }}
          >
            <option value="">Selecione um serviço</option>

            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </Select>

          <Input
            label="Valor"
            readOnly
            value={selectedService ? formatCurrency(selectedService.price) : ""}
          />
        </div>

        <div className="border-t border-gray-200 px-6 py-6">
          <Button
            type="submit"
            className="w-full py-2.5"
            disabled={!selectedServiceId || saving}
          >
            {saving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
