import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

import { createTechnician, updateTechnician } from "@/services";

import {
  AvatarCircle,
  BadgeTime,
  Button,
  Icon,
  Input,
  Text,
} from "@/components/ui";
import { ArrowLeft } from "@/assets/icons";

// Definição dos horários de atendimento
type ShiftSection = {
  label: string;
  times: string[];
};

const MORNING_TIMES = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00"];
const AFTERNOON_TIMES = ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
const NIGHT_TIMES = ["19:00", "20:00", "21:00", "22:00", "23:00"];

// Ordenação dos horários
const ALL_TIMES = [...MORNING_TIMES, ...AFTERNOON_TIMES, ...NIGHT_TIMES];

// Estado inicial da disponibilidade do técnico
const INITIAL_AVAILABILITY: string[] = [];

export default function TechnicianNew() {
  const navigate = useNavigate();

  // Estados para armazenar os dados do formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(
    [],
  );
  const [saving, setSaving] = useState(false);

  // UseMemo para evitar recriar o array de seções a cada renderização
  const sections: ShiftSection[] = useMemo(
    () => [
      { label: "MANHÃ", times: MORNING_TIMES },
      { label: "TARDE", times: AFTERNOON_TIMES },
      { label: "NOITE", times: NIGHT_TIMES },
    ],
    [],
  );

  // Função para ordenar os horários selecionados
  function sortAvailability(times: string[]) {
    return [...times].sort(
      (a, b) => ALL_TIMES.indexOf(a) - ALL_TIMES.indexOf(b),
    );
  }

  // Função para alternar a seleção de um horário
  function toggleTime(time: string) {
    setSelectedAvailability((prev) =>
      prev.includes(time)
        ? prev.filter((item) => item !== time)
        : [...prev, time],
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
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      toast.error("Preencha nome, e-mail e senha.");
      return;
    }

    if (trimmedPassword.length < 6) {
      toast.error("A senha deve ter no mínimo 6 dígitos.");
      return;
    }

    const sortedAvailability = sortAvailability(selectedAvailability);

    try {
      setSaving(true);

      // 1) cria o técnico
      const createdTechnician = await createTechnician({
        name: trimmedName,
        email: trimmedEmail,
      });

      // 2) atualiza o técnico recém-criado com senha + disponibilidade
      await updateTechnician(createdTechnician.id, {
        name: trimmedName,
        email: trimmedEmail,
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
          toast.error("E-mail já cadastrado.");
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
            className="text-gray-400 group-hover:text-gray-300"
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

            <Text className="text-gray-400">
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
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              label="E-mail"
              type="email"
              value={email}
              placeholder="exemplo@mail.com"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex flex-col gap-1">
              <Input
                label="Senha"
                type="password"
                value={password}
                placeholder="Defina a senha de acesso"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Text size="xs" textColor="tertiary" className="italic">
                Mínimo de 6 dígitos
              </Text>
            </div>
          </div>
        </section>

        {/* Card: Horários */}
        <section className="rounded-xl border border-gray-200 p-5 md:p-6">
          <div className="mb-5 flex flex-col gap-1 md:mb-6">
            <Text as="h2" size="lg" weight="bold">
              Horários de atendimento
            </Text>

            <Text className="text-gray-400">
              Selecione os horários de disponibilidade do técnico para
              atendimento
            </Text>
          </div>

          <div className="flex flex-col gap-5">
            {sections.map((section) => (
              <div key={section.label} className="flex flex-col gap-2">
                <Text
                  as="span"
                  size="xs"
                  weight="bold"
                  className="uppercase tracking-wide text-gray-400"
                >
                  {section.label}
                </Text>

                <div className="flex flex-wrap gap-2">
                  {section.times.map((time) => {
                    const isSelected = selectedAvailability.includes(time);

                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => toggleTime(time)}
                        className="cursor-pointer"
                      >
                        <BadgeTime
                          variant={isSelected ? "selected" : "available"}
                          className="justify-center"
                        >
                          {time}
                        </BadgeTime>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
