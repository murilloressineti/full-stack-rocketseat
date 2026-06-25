import { useState } from "react";
import { toast } from "sonner";

import { deleteClient, updateClient } from "@/services";
import type { Client } from "@/types";

import { AvatarCircle, Button, Icon, Input, Text } from "@/components/ui";
import { X } from "@/assets/icons";

interface ClientModalProps {
  mode: "edit" | "delete";
  client: Client;
  onClose: () => void;
  onSuccess: (client?: Client) => void;
}

export default function ClientModal({
  mode,
  client,
  onClose,
  onSuccess,
}: ClientModalProps) {
  const isEditing = mode === "edit";
  const isDeleting = mode === "delete";

  const [name, setName] = useState(client.name);
  const [email, setEmail] = useState(client.email);
  const [saving, setSaving] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  async function handleSave() {
    if (isDeleting) {
      try {
        setSaving(true);

        await deleteClient(client.id);

        toast.success("Cliente excluído com sucesso!");
        onSuccess();
      } catch (error) {
        console.error("Erro ao excluir cliente:", error);
        toast.error("Não foi possível excluir o cliente.");
      } finally {
        setSaving(false);
      }

      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    let hasError = false;

    setNameError("");
    setEmailError("");

    if (!trimmedName) {
      setNameError("Informe o nome do cliente.");
      hasError = true;
    }

    if (!trimmedEmail) {
      setEmailError("Informe o e-mail do cliente.");
      hasError = true;
    }

    if (hasError) return;

    try {
      setSaving(true);

      const updatedClient = await updateClient(client.id, {
        name: trimmedName,
        email: trimmedEmail,
      });

      toast.success("Cliente atualizado com sucesso!");
      onSuccess(updatedClient);
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      toast.error("Não foi possível atualizar o cliente.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-default/50 px-4">
      <div className="w-full max-w-md rounded-xl bg-bg-light shadow-lg">
        <div className="flex items-center justify-between border-b border-gray-200 py-5 px-6">
          <Text as="h2" size="md" weight="bold">
            {isDeleting ? "Excluir cliente" : "Editar cliente"}
          </Text>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer transition-all duration-200 hover:scale-110"
          >
            <Icon svg={X} className="fill-gray-400" />
          </button>
        </div>

        {isDeleting ? (
          <div className="flex flex-col gap-5 px-6 pt-5 pb-8">
            <Text size="md">
              Deseja realmente excluir <strong>{client.name}</strong>?
            </Text>

            <Text size="md">
              Ao excluir, todos os chamados deste cliente serão removidos e esta
              ação não poderá ser desfeita.
            </Text>
          </div>
        ) : (
          <div className="flex flex-col gap-4 px-6 pb-8 pt-6">
            <div className="mb-1">
              <AvatarCircle
                name={name}
                avatar={client.avatar}
                size="lg"
                variant="blueDark"
              />
            </div>

            <Input
              label="Nome"
              type="text"
              value={name}
              placeholder="Nome do cliente"
              error={nameError}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              label="E-mail"
              type="email"
              value={email}
              placeholder="exemplo@mail.com"
              error={emailError}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}

        <div className="border-t border-gray-200 px-6 py-6">
          <div className="flex gap-2">
            {isDeleting && (
              <Button
                variant="secondary"
                className="w-full py-2.5"
                onClick={onClose}
                disabled={saving}
              >
                Cancelar
              </Button>
            )}

            <Button
              className="w-full py-2.5"
              onClick={handleSave}
              disabled={saving}
            >
              {saving
                ? isDeleting
                  ? "Excluindo..."
                  : "Salvando..."
                : isDeleting
                  ? "Sim, excluir"
                  : "Salvar"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
