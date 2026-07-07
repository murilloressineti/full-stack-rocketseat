import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import { validateUserNameAndEmail } from "@/utils/formatUser";
import {
  AvailabilitySelector,
  ALL_TIMES,
} from "@/components/features/schedule";
import { createTechnician, updateTechnician } from "@/services";

import { AvatarCircle, Button, Icon, Input, Text } from "@/components/ui";
import { ArrowLeft } from "@/assets/icons";

// Estado inicial da disponibilidade do técnico
const INITIAL_AVAILABILITY: string[] = [];

export default function AdminTechnicianCreate() {
  const navigate = useNavigate();

  // Estados para armazenar os dados do formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(
    [],
  );
  const [saving, setSaving] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Função para ordenar os horários selecionados
  function sortAvailability(times: string[]) {
    return [...times].sort(
      (a, b) => ALL_TIMES.indexOf(a) - ALL_TIMES.indexOf(b),
    );
  }

  // UseMemo para verificar se houve alterações nos campos do formulário
  const isDirty = useMemo(() => {
    const normalizedCurrentAvailability =
      sortAvailability(selectedAvailability);
    const normalizedInitialAvailability =
      sortAvailability(INITIAL_AVAILABILITY);

    return (
      name.trim() !== "" ||
      email.trim() !== "" ||
      password.trim() !== "" ||
      JSON.stringify(normalizedCurrentAvailability) !==
        JSON.stringify(normalizedInitialAvailability)
    );
  }, [name, email, password, selectedAvailability]);

  // Função para voltar à lista de técnicos
  function goBackToTechnicians() {
    navigate("/admin/tecnicos");
  }

  // Função para lidar com o cancelamento do cadastro
  function handleCancel() {
    if (!isDirty) {
      goBackToTechnicians();
      return;
    }

    toast.custom((t) => (
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
        <div className="mb-3 flex flex-col gap-1">
          <Text weight="bold">Descartar alterações?</Text>
          <Text size="sm" textColor="secondary">
            Você começou a cadastrar um técnico. Se sair agora, perderá tudo o
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
              goBackToTechnicians();
            }}
          >
            Descartar
          </Button>
        </div>
      </div>
    ));
  }

  // Função para lidar com o salvamento do técnico
  async function handleSave() {
    const { formattedName, formattedEmail, errors, hasError } =
      validateUserNameAndEmail(name, email);

    const trimmedPassword = password.trim();

    let hasPasswordError = false;

    setNameError("");
    setEmailError("");
    setPasswordError("");

    if (errors.name) {
      setNameError("Informe o nome do técnico.");
    }

    if (errors.email) {
      setEmailError(
        errors.email === "Informe o e-mail."
          ? "Informe o e-mail do técnico."
          : errors.email,
      );
    }

    if (!trimmedPassword) {
      setPasswordError("Informe a senha do técnico.");
      hasPasswordError = true;
    } else if (trimmedPassword.length < 6) {
      setPasswordError("A senha deve ter pelo menos 6 caracteres.");
      hasPasswordError = true;
    }

    if (hasError || hasPasswordError) return;

    const sortedAvailability = sortAvailability(selectedAvailability);

    try {
      setSaving(true);

      const createdTechnician = await createTechnician({
        name: formattedName,
        email: formattedEmail,
      });

      await updateTechnician(createdTechnician.id, {
        name: formattedName,
        email: formattedEmail,
        password: trimmedPassword,
        availability: sortedAvailability,
      });

      toast.success("Técnico criado com sucesso!");
      navigate("/admin/tecnicos");
    } catch (error) {
      console.error("Erro ao criar técnico:", error);

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (message === "User with same email already exists") {
          setEmailError("E-mail já cadastrado.");
          return;
        }
      }

      toast.error("Não foi possível criar o técnico.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* Topo */}
      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={handleCancel}
          className="flex items-center gap-2 transition-all duration-200 cursor-pointer group"
        >
          <Icon
            svg={ArrowLeft}
            size="sm"
            className="fill-gray-400 group-hover:fill-gray-300"
          />
          <Text
            size="sm"
            weight="bold"
            textColor="quaternary"
            className="group-hover:text-gray-300"
          >
            Voltar
          </Text>
        </button>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Text as="h1" size="xl" weight="bold" textColor="blueDark">
            Novo técnico
          </Text>

          <div className="flex gap-2 md:flex md:items-center">
            <Button
              variant="secondary"
              className="w-full py-2.5"
              onClick={handleCancel}
              disabled={saving || !isDirty}
            >
              Cancelar
            </Button>

            <Button
              className="w-full py-2.5"
              onClick={handleSave}
              disabled={saving || !isDirty}
            >
              {saving ? "Criando..." : "Criar"}
            </Button>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-[360px_1fr] items-start">
        {/* Card: Dados pessoais */}
        <section className="rounded-xl border border-gray-200 p-5 md:p-6">
          <div className="mb-6 flex flex-col gap-1">
            <Text as="h2" size="lg" weight="bold">
              Dados pessoais
            </Text>

            <Text textColor="quaternary">
              Defina as informações do perfil de técnico
            </Text>
          </div>

          <div className="mb-6">
            <AvatarCircle
              name={name}
              avatar={null}
              size="lg"
              variant="blueDark"
            />
          </div>

          <div className="flex flex-col gap-4">
            <Input
              label="Nome"
              type="text"
              value={name}
              placeholder="Nome completo"
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

            <div className="flex flex-col gap-1">
              <Input
                label="Senha"
                type="password"
                value={password}
                placeholder="Defina a senha de acesso"
                error={passwordError}
                onChange={(e) => setPassword(e.target.value)}
              />

              {!passwordError && (
                <Text size="xs" textColor="tertiary" className="italic">
                  Mínimo de 6 dígitos
                </Text>
              )}
            </div>
          </div>
        </section>

        {/* Card: Horários */}
        <section className="rounded-xl border border-gray-200 p-5 md:p-6">
          <div className="mb-5 flex flex-col gap-1 md:mb-6">
            <Text as="h2" size="lg" weight="bold">
              Horários de atendimento
            </Text>

            <Text textColor={"quaternary"}>
              Selecione os horários de disponibilidade do técnico para
              atendimento
            </Text>
          </div>

          <div className="flex flex-col gap-5">
            <AvailabilitySelector
              value={selectedAvailability}
              onChange={setSelectedAvailability}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
