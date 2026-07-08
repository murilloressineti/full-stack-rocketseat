import { useMemo, useState } from "react";

import { toast } from "sonner";

import { deleteClient, updateClient } from "@/services";

import { validateUserNameAndEmail } from "@/utils/formatUser";

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

  const isDirty = useMemo(() => {
    return (
      name.trim() !== client.name.trim() ||
      email.trim().toLowerCase() !== client.email.trim().toLowerCase()
    );
  }, [name, email, client]);

  async function handleDelete() {
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
  }

  async function handleUpdate() {
    const { formattedName, formattedEmail, errors, hasError } =
      validateUserNameAndEmail(name, email);

    setNameError("");
    setEmailError("");

    if (errors.name) {
      setNameError("Informe o nome do cliente.");
    }

    if (errors.email) {
      setEmailError(
        errors.email === "Informe o e-mail."
          ? "Informe o e-mail do cliente."
          : errors.email,
      );
    }

    if (hasError) return;

    try {
      setSaving(true);

      const updatedClient = await updateClient(client.id, {
        name: formattedName,
        email: formattedEmail,
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

  async function handleSave() {
    if (saving) return;

    if (isDeleting) {
      await handleDelete();
      return;
    }

    await handleUpdate();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isEditing || saving || !isDirty) return;

    handleSave();
  }

  function handleClose() {
    if (!isEditing || !isDirty) {
      onClose();
      return;
    }

    toast.custom((t) => (
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-bg-light p-4 shadow-lg">
        <div className="mb-3 flex flex-col gap-1">
          <Text weight="bold">Descartar alterações?</Text>

          <Text size="sm" textColor="secondary">
            Você fez alterações neste cliente. Se fechar agora, perderá tudo o
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
        id="client-edit-form"
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl bg-bg-light shadow-lg"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <Text as="h2" size="md" weight="bold">
            {isDeleting ? "Excluir cliente" : "Editar cliente"}
          </Text>

          <button
            type="button"
            onClick={handleClose}
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
          <div className="flex flex-col gap-4 px-6 pt-6 pb-8">
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
              onChange={(event) => setName(event.target.value)}
            />

            <Input
              label="E-mail"
              type="email"
              value={email}
              placeholder="exemplo@mail.com"
              error={emailError}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        )}

        <div className="border-t border-gray-200 px-6 py-6">
          <div className="flex gap-2">
            {isDeleting && (
              <Button
                type="button"
                variant="secondary"
                className="w-full py-2.5"
                onClick={handleClose}
                disabled={saving}
              >
                Cancelar
              </Button>
            )}

            <Button
              type={isEditing ? "submit" : "button"}
              form={isEditing ? "client-edit-form" : undefined}
              className="w-full py-2.5"
              onClick={isDeleting ? handleSave : undefined}
              disabled={saving || (isEditing && !isDirty)}
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
      </form>
    </div>
  );
}
