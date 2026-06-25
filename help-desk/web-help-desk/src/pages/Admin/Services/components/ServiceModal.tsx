import { useState } from "react";
import { toast } from "sonner";

import { createService, updateService } from "@/services";
import type { Service } from "@/types";

import { Button, Icon, Input, Text } from "@/components/ui";
import { X } from "@/assets/icons";

interface ServiceModalProps {
  service?: {
    id: string;
    name: string;
    price: string | number;
    active: boolean;
  };
  onClose: () => void;
  onSuccess: (service: Service) => void;
}

export default function ServiceModal({
  service,
  onClose,
  onSuccess,
}: ServiceModalProps) {
  const isEditing = Boolean(service);

  const [name, setName] = useState(service?.name ?? "");
  const [saving, setSaving] = useState(false);

  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");

  function formatPriceForInput(value: string | number) {
    const numberValue = parsePrice(String(value));

    if (Number.isNaN(numberValue)) {
      return "";
    }

    return numberValue.toFixed(2).replace(".", ",");
  }

  const [price, setPrice] = useState(
    service ? formatPriceForInput(service.price) : "",
  );

  function parsePrice(value: string) {
    const cleanValue = value.replace("R$", "").replace(/\s/g, "").trim();

    if (cleanValue.includes(",")) {
      return Number(cleanValue.replace(/\./g, "").replace(",", "."));
    }

    return Number(cleanValue);
  }

  async function handleSave() {
    const trimmedName = name.trim();
    const numberPrice = parsePrice(price);

    let hasError = false;

    setNameError("");
    setPriceError("");

    if (!trimmedName) {
      setNameError("Informe o nome do serviço.");
      hasError = true;
    }

    if (!numberPrice || numberPrice <= 0) {
      setPriceError("Informe um valor válido.");
      hasError = true;
    }

    if (hasError) return;

    try {
      setSaving(true);

      const savedService =
        isEditing && service
          ? await updateService(service.id, {
              name: trimmedName,
              price: numberPrice,
            })
          : await createService({
              name: trimmedName,
              price: numberPrice,
            });

      toast.success(
        isEditing
          ? "Serviço atualizado com sucesso!"
          : "Serviço criado com sucesso!",
      );

      onSuccess(savedService);
    } catch (error) {
      console.error("Erro ao salvar serviço:", error);
      toast.error(
        isEditing
          ? "Não foi possível atualizar o serviço."
          : "Não foi possível criar o serviço.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-default/50 px-4">
      <div className="w-full max-w-md rounded-xl bg-bg-light shadow-lg">
        <div className="flex items-center justify-between border-b border-gray-200 py-5 px-6">
          <Text as="h2" size="md" weight="bold">
            {service ? "Editar serviço" : "Cadastro de serviço"}
          </Text>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer transition-all duration-200 hover:scale-110"
          >
            <Icon svg={X} className="fill-gray-400" />
          </button>
        </div>

        <div className="flex flex-col gap-4 pt-5 pb-8 px-6">
          <Input
            label="Título"
            type="text"
            value={name}
            placeholder="Nome do serviço"
            error={nameError}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            label="Valor"
            type="text"
            value={price}
            placeholder="0,00"
            error={priceError}
            onChange={(e) => setPrice(e.target.value)}
            leftSection={
              <Text as="span" size="md" textColor="primary">
                R$
              </Text>
            }
          />
        </div>

        <div className="border-t border-gray-200 p-5 px-6">
          <Button
            className="w-full py-2.5"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
