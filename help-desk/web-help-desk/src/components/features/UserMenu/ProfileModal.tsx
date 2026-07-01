import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import axios from "axios";

import { updateProfile } from "@/services";

import {
  AvatarCircle,
  BadgeTime,
  Button,
  Icon,
  Input,
  Text,
} from "@/components/ui";
import { Trash, Upload, X } from "@/assets/icons";
import type { ProfileUser } from "./types";

interface ProfileModalProps {
  user: ProfileUser;
  open: boolean;
  onClose: () => void;
  onChangePassword: () => void;
  onProfileUpdated?: (user: ProfileUser) => void;
}

function formatName(value: string) {
  return value
    .trim()
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function formatEmail(value: string) {
  return value.trim().toLowerCase();
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function ProfileModal({
  user,
  open,
  onClose,
  onChangePassword,
  onProfileUpdated,
}: ProfileModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState<string | null | undefined>(user.avatar);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;

    setName(user.name);
    setEmail(user.email);
    setAvatar(user.avatar);

    setNameError("");
    setEmailError("");
  }, [open, user]);

  if (!open) return null;

  function handleSelectImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Selecione uma imagem válida.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setAvatar(previewUrl);
  }

  function handleRemoveImage() {
    setAvatar(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSave() {
    const formattedName = formatName(name);
    const formattedEmail = formatEmail(email);

    let hasError = false;

    setNameError("");
    setEmailError("");

    if (!formattedName) {
      setNameError("Informe o nome.");
      hasError = true;
    }

    if (!formattedEmail) {
      setEmailError("Informe o e-mail.");
      hasError = true;
    } else if (!isValidEmail(formattedEmail)) {
      setEmailError("Informe um e-mail válido.");
      hasError = true;
    }

    if (hasError) return;

    try {
      setSaving(true);

      const updatedUser = await updateProfile(user.id, {
        name: formattedName,
        email: formattedEmail,
        avatar: avatar?.startsWith("blob:") ? (user.avatar ?? null) : avatar,
      });

      onProfileUpdated?.({
        ...updatedUser,
        role: updatedUser.role,
      });

      toast.success("Perfil atualizado com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (message === "Email already in use") {
          setEmailError("E-mail já cadastrado.");
          return;
        }
      }

      toast.error("Não foi possível atualizar o perfil.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-default/50 px-4">
      <div className="w-full max-w-lg rounded-xl bg-bg-light shadow-lg">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <Text as="h2" size="lg" weight="bold">
            Perfil
          </Text>

          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer transition-all duration-200 hover:scale-110"
          >
            <Icon svg={X} className="fill-gray-400" />
          </button>
        </div>

        <div className="flex flex-col gap-5 px-6 pt-6 pb-8">
          <div className="flex items-center gap-3">
            <AvatarCircle
              name={name}
              avatar={avatar}
              size="lg"
              variant="blueDark"
            />

            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleSelectImage}
              />

              <Button
                type="button"
                variant="secondary"
                size="xs"
                className="py-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <Icon svg={Upload} size="xs" />
                Nova imagem
              </Button>

              <Button
                type="button"
                variant="secondary"
                size="xs"
                className="py-2"
                onClick={handleRemoveImage}
              >
                <Icon svg={Trash} size="xs" className="fill-feedback-danger" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Input
              label="Nome"
              value={name}
              error={nameError}
              onChange={(event) => setName(event.target.value)}
            />

            <Input
              label="E-mail"
              type="email"
              value={email}
              error={emailError}
              onChange={(event) => setEmail(event.target.value)}
            />

            <Input
              label="Senha"
              type="password"
              value="********"
              readOnly
              rightSection={
                <Button
                  type="button"
                  variant="secondary"
                  size="xs"
                  className="py-2"
                  onClick={onChangePassword}
                >
                  Alterar
                </Button>
              }
            />
          </div>
        </div>

        {user.role === "technician" && (
          <div className="border-t border-gray-200 px-6 py-6">
            <div className="mb-4 flex flex-col gap-1">
              <Text size="md" weight="bold">
                Disponibilidade
              </Text>

              <Text textColor="quaternary">
                Horários de atendimento definidos pelo admin
              </Text>
            </div>

            <div className="flex flex-wrap gap-1">
              {user.availability && user.availability.length > 0 ? (
                user.availability.map((time) => (
                  <BadgeTime key={time} variant="disabled">
                    {time}
                  </BadgeTime>
                ))
              ) : (
                <Text textColor="secondary">Nenhum horário definido.</Text>
              )}
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 px-6 py-6">
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
