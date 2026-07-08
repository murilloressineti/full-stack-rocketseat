import { useMemo, useState, type FormEvent } from "react";

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

function parsePrice(value: string) {
  const cleanValue = value.replace("R$", "").replace(/\s/g, "").trim();

  if (cleanValue.includes(",")) {
    return Number(cleanValue.replace(/\./g, "").replace(",", "."));
  }

  return Number(cleanValue);
}

function formatPriceForInput(value: string | number) {
  const numberValue = parsePrice(String(value));

  if (Number.isNaN(numberValue)) {
    return "";
  }

  return numberValue.toFixed(2).replace(".", ",");
}

export default function ServiceModal({
  service,
  onClose,
  onSuccess,
}: ServiceModalProps) {
  const isEditing = Boolean(service);

  const [name, setName] = useState(service?.name ?? "");
  const [price, setPrice] = useState(
    service ? formatPriceForInput(service.price) : "",
  );

  const [saving, setSaving] = useState(false);

  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");

  const isDirty = useMemo(() => {
    const currentName = name.trim();
    const currentPrice = parsePrice(price);

    if (!service) {
      return currentName !== "" || price.trim() !== "";
    }

    const initialName = service.name.trim();
    const initialPrice = parsePrice(String(service.price));

    return currentName !== initialName || currentPrice !== initialPrice;
  }, [name, price, service]);

  async function handleSave() {
    if (saving) return;

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (saving || !isDirty) return;

    handleSave();
  }

  function handleClose() {
    if (!isDirty) {
      onClose();
      return;
    }

    toast.custom((t) => (
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-bg-light p-4 shadow-lg">
        <div className="mb-3 flex flex-col gap-1">
          <Text weight="bold">Descartar alterações?</Text>

          <Text size="sm" textColor="secondary">
            Você fez alterações neste serviço. Se fechar agora, perderá tudo o
            que não foi salvo.
          </Text>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="secondary"
            size="xs"
            className="md:px-4 md:py-2.5"
            onClick={() => toast.dismiss(t)}
          >
            Continuar editando
          </Button>

          <Button
            size="xs"
            className="md:px-4 md:py-2.5"
            onClick={() => {
              toast.dismiss(t);
              onClose();
            }}
          >
            Descartar
          </Button>
        </div>
      </div>
    ));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-default/50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-bg-light shadow-lg"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <Text as="h2" size="md" weight="bold">
            {isEditing ? "Editar serviço" : "Cadastro de serviço"}
          </Text>

          <button
            type="button"
            onClick={handleClose}
            className="cursor-pointer transition-all duration-200 hover:scale-110"
          >
            <Icon svg={X} className="fill-gray-400" />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-6 pt-6 pb-8">
          <Input
            label="Título"
            type="text"
            value={name}
            placeholder="Nome do serviço"
            error={nameError}
            onChange={(event) => setName(event.target.value)}
          />

          <Input
            label="Valor"
            type="text"
            value={price}
            placeholder="0,00"
            error={priceError}
            onChange={(event) => setPrice(event.target.value)}
            leftSection={
              <Text as="span" size="md" textColor="primary">
                R$
              </Text>
            }
          />
        </div>

        <div className="border-t border-gray-200 px-6 py-6">
          <Button
            type="submit"
            className="w-full py-2.5"
            disabled={saving || !isDirty}
          >
            {saving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
