import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import type { AppUser } from "@/types/user";
import { updateProfile } from "@/services";

import { Button, Icon, Input, Text } from "@/components/ui";
import { ArrowLeft, X } from "@/assets/icons";

interface ChangePasswordModalProps {
  userId: string;
  open: boolean;
  onClose: () => void;
  onBack: () => void;
  required?: boolean;
  onSuccess?: (user: AppUser) => void;
}

export default function ChangePasswordModal({
  userId,
  open,
  onClose,
  onBack,
  required,
  onSuccess,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  const [saving, setSaving] = useState(false);

  const isDirty = currentPassword.trim() !== "" || newPassword.trim() !== "";

  if (!open) return null;

  function resetForm() {
    setCurrentPassword("");
    setNewPassword("");
    setCurrentPasswordError("");
    setNewPasswordError("");
  }

  function confirmDiscard(onConfirm: () => void) {
    if (!isDirty) {
      resetForm();
      onConfirm();
      return;
    }

    toast.custom((t) => (
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-bg-light p-4 shadow-lg">
        <div className="mb-3 flex flex-col gap-1">
          <Text weight="bold">Descartar alterações?</Text>

          <Text size="sm" textColor="secondary">
            Você começou a alterar sua senha. Se sair agora, perderá tudo o que
            não foi salvo.
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
              resetForm();
              onConfirm();
            }}
          >
            Descartar
          </Button>
        </div>
      </div>
    ));
  }

  function handleClose() {
    confirmDiscard(onClose);
  }

  function handleBack() {
    confirmDiscard(onBack);
  }

  async function handleSave() {
    const trimmedCurrentPassword = currentPassword.trim();
    const trimmedNewPassword = newPassword.trim();

    let hasError = false;

    setCurrentPasswordError("");
    setNewPasswordError("");

    if (!trimmedCurrentPassword) {
      setCurrentPasswordError("Informe sua senha atual.");
      hasError = true;
    }

    if (!trimmedNewPassword) {
      setNewPasswordError("Informe a nova senha.");
      hasError = true;
    } else if (trimmedNewPassword.length < 6) {
      setNewPasswordError("A senha deve ter pelo menos 6 caracteres.");
      hasError = true;
    }

    if (hasError) return;

    if (trimmedCurrentPassword === trimmedNewPassword) {
      setNewPasswordError("A nova senha deve ser diferente da senha atual.");
      return;
    }

    try {
      setSaving(true);

      const updatedUser = await updateProfile(userId, {
        currentPassword: trimmedCurrentPassword,
        password: trimmedNewPassword,
      });

      onSuccess?.(updatedUser);

      toast.success("Senha alterada com sucesso!");
      resetForm();
      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (message === "Current password is incorrect") {
          setCurrentPasswordError("Senha atual incorreta.");
          return;
        }

        if (
          message === "New password must be different from current password"
        ) {
          setNewPasswordError(
            "A nova senha deve ser diferente da senha atual.",
          );
          return;
        }
      }
      console.error("Erro ao alterar senha:", error);
      toast.error("Não foi possível alterar a senha.");
    } finally {
      setSaving(false);
    }
  }

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
          <div className="flex items-center gap-3">
            {!required && (
              <button
                type="button"
                onClick={handleBack}
                className="cursor-pointer transition-all duration-200 hover:scale-110"
              >
                <Icon svg={ArrowLeft} className="fill-gray-400" />
              </button>
            )}

            <Text as="h2" size="lg" weight="bold">
              Alterar senha
            </Text>
          </div>

          {!required && (
            <button
              type="button"
              onClick={handleClose}
              className="cursor-pointer transition-all duration-200 hover:scale-110"
            >
              <Icon svg={X} className="fill-gray-400" />
            </button>
          )}
        </div>

        <div className="flex flex-col gap-4 px-6 pt-6 pb-8">
          <Input
            label="Senha atual"
            type="password"
            value={currentPassword}
            placeholder="Digite sua senha atual"
            error={currentPasswordError}
            onChange={(event) => setCurrentPassword(event.target.value)}
          />

          <div className="flex flex-col gap-1">
            <Input
              label="Nova senha"
              type="password"
              value={newPassword}
              placeholder="Digite sua nova senha"
              error={newPasswordError}
              onChange={(event) => setNewPassword(event.target.value)}
            />

            {!newPasswordError && (
              <Text size="xs" textColor="tertiary" className="italic">
                Mínimo de 6 dígitos
              </Text>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-6">
          <Button type="submit" className="w-full py-2.5" disabled={saving}>
            {saving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
