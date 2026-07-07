import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateTechnician } from "@/services";
import { toast } from "sonner";
import {
  AvailabilitySelector,
  ALL_TIMES,
} from "@/components/features/schedule";

import { validateUserNameAndEmail } from "@/utils/formatUser";

import { AvatarCircle, Button, Icon, Input, Text } from "@/components/ui";
import { ArrowLeft } from "@/assets/icons";

// Esse type é o "pacote de dados" que a tela espera receber quando sai da listagem de técnicos e entra na edição
type TechnicianNavigationData = {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  availability: string[];
};

// Esse type define a estrutura do location.state
type LocationState = {
  technician?: TechnicianNavigationData;
};

export default function AdminTechnicianEdit() {
  const navigate = useNavigate();
  const location = useLocation(); // useLocation para acessar o estado passado na navegação. Esse estado trouxe os dados do técnico selecionado na listagem de técnicos
  const { id } = useParams<{ id: string }>(); // useParams para obter o ID do técnico da URL

  // Acessando o estado passado na navegação. Esse estado trouxe os dados do técnico selecionado na listagem de técnicos
  const state = location.state as LocationState | null;
  const technician = state?.technician;

  const [name, setName] = useState(technician?.name ?? "");
  const [email, setEmail] = useState(technician?.email ?? "");
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>(
    technician?.availability ?? [],
  );

  const [saving, setSaving] = useState(false);

  // Função para ordenar os horários de disponibilidade do técnico. Ela cria uma cópia do array de horários e ordena com base na ordem definida em ALL_TIMES
  function sortAvailability(times: string[]) {
    return [...times].sort(
      (a, b) => ALL_TIMES.indexOf(a) - ALL_TIMES.indexOf(b),
    );
  }

  // UseMemo para evitar recriar o objeto initialTechnician a cada renderização. Espécie de Snapshot dos dados iniciais do técnico, para comparar com os dados atuais e saber se houve alterações
  const initialTechnician = useMemo(
    () => ({
      name: technician?.name ?? "",
      email: technician?.email ?? "",
      availability: technician?.availability ?? [],
    }),
    [technician],
  );

  // UseMemo para verificar se houve alterações nos dados do técnico. Compara os dados atuais com os dados iniciais e retorna true se houver alterações, false caso contrário
  const isDirty = useMemo(() => {
    const normalizedCurrentAvailability =
      sortAvailability(selectedAvailability);
    const normalizedInitialAvailability = sortAvailability(
      initialTechnician.availability,
    );

    return (
      name.trim() !== initialTechnician.name.trim() ||
      email.trim().toLowerCase() !==
        initialTechnician.email.trim().toLowerCase() ||
      JSON.stringify(normalizedCurrentAvailability) !==
        JSON.stringify(normalizedInitialAvailability)
    );
  }, [name, email, selectedAvailability, initialTechnician]);

  // Função para voltar à lista de técnicos
  function goBackToTechnicians() {
    navigate("/admin/tecnicos");
  }

  // Função para lidar com o cancelamento da edição do técnico.
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
            Você fez alterações neste técnico. Se sair agora, perderá tudo o que
            não foi salvo.
          </Text>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="secondary"
            size="xs"
            className="md:py-2.5 md:px-4"
            onClick={() => toast.dismiss(t)}
          >
            Continuar editando
          </Button>

          <Button
            size="xs"
            className="md:py-2.5 md:px-4"
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
    if (!id || !technician) return;

    const { formattedName, formattedEmail, hasError } =
      validateUserNameAndEmail(name, email);

    if (hasError) {
      toast.error("Preencha nome e e-mail corretamente.");
      return;
    }

    const sortedAvailability = sortAvailability(selectedAvailability);

    try {
      setSaving(true);

      await updateTechnician(id, {
        name: formattedName,
        email: formattedEmail,
        availability: sortedAvailability,
      });

      toast.success("Técnico atualizado com sucesso!");
      navigate("/admin/tecnicos");
    } catch (error) {
      console.error("Erro ao atualizar técnico:", error);
      toast.error("Não foi possível salvar as alterações.");
    } finally {
      setSaving(false);
    }
  }

  // fallback: usuário entrou direto na rota sem vir da listagem
  if (!technician) {
    return (
      <div className="flex min-h-75 flex-col items-center justify-center gap-3">
        <Text textColor="secondary">
          Não foi possível carregar os dados do técnico.
        </Text>

        <Button variant="secondary" onClick={() => navigate("/admin/tecnicos")}>
          Voltar para técnicos
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6 md:px-30">
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
            className="fill-gray-400 transition-all duration-200 group-hover:fill-gray-300"
          />
          <Text
            size="sm"
            weight="bold"
            textColor={"quaternary"}
            className="group-hover:text-gray-300 transition-all duration-200"
          >
            Voltar
          </Text>
        </button>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Text as="h1" size="xl" weight="bold" textColor="blueDark">
            Perfil de técnico
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
              {saving ? "Salvando..." : "Salvar"}
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

            <Text textColor={"quaternary"}>
              Defina as informações do perfil de técnico
            </Text>
          </div>

          <div className="mb-6">
            <AvatarCircle
              name={name}
              avatar={technician.avatar}
              size="lg"
              variant="blueDark"
            />
          </div>

          <div className="flex flex-col gap-4">
            <Input
              label="Nome"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </section>

        {/* Card: Horários */}
        <section className="rounded-xl border border-gray-200 p-5 md:p-6">
          <div className="mb-5 md:mb-6 flex flex-col gap-1">
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
