import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { createTicket, getActiveServices } from "@/services";
import type { Service } from "@/types";

import { Button, Input, Select, Skeleton, Text, Textarea } from "@/components/ui";

const createTicketSchema = z.object({
  title: z.string().trim().min(1, "Informe o título do chamado."),
  description: z.string().trim().min(1, "Informe a descrição do chamado."),
  serviceId: z.string().min(1, "Selecione uma categoria de serviço."),
});

type CreateTicketFormData = z.infer<typeof createTicketSchema>;

export default function ClientNewTicketCreate() {
  const navigate = useNavigate();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateTicketFormData>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      title: "",
      description: "",
      serviceId: "",
    },
  });

  const selectedServiceId = watch("serviceId");

  const selectedService = useMemo(() => {
    return services.find((service) => service.id === selectedServiceId);
  }, [services, selectedServiceId]);

  function formatCurrency(value: string | number) {
    const numberValue = Number(value);

    if (Number.isNaN(numberValue)) {
      return "R$ 0,00";
    }

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numberValue);
  }

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getActiveServices();
        setServices(data);
      } catch (error) {
        console.error("Erro ao carregar serviços:", error);
        toast.error("Não foi possível carregar as categorias.");
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  async function handleCreateTicket(data: CreateTicketFormData) {
    try {
      setSaving(true);

      await createTicket({
        title: data.title.trim(),
        description: data.description.trim(),
        services: [
          {
            serviceId: data.serviceId,
            quantity: 1,
          },
        ],
      });

      toast.success("Chamado criado com sucesso!");
      navigate("/cliente/chamados");
    } catch (error) {
      console.error("Erro ao criar chamado:", error);
      toast.error("Não foi possível criar o chamado.");
    } finally {
      setSaving(false);
    }
  }

    if (loading) {
      return <Skeleton />;
    }

  return (
    <form
      onSubmit={handleSubmit(handleCreateTicket)}
      className="flex flex-col gap-4 md:gap-6 md:px-30"
    >
      <Text as="h1" size="xl" weight="bold" textColor="blueDark">
        Novo chamado
      </Text>

      <div className="grid grid-cols-1 gap-4 md:gap-6 xl:grid-cols-[1fr_360px] xl:items-start">
        <section className="rounded-xl border border-gray-200 p-5 md:p-6">
          <div className="mb-5 md:mb-6 flex flex-col gap-1">
            <Text as="h2" size="lg" weight="bold">
              Informações
            </Text>

            <Text textColor="quaternary">
              Configure as informações para abertura do chamado
            </Text>
          </div>

          <div className="flex flex-col gap-4">
            <Input
              label="Título"
              placeholder="Digite um título para o chamado"
              {...register("title")}
              error={errors.title?.message}
            />

            <Textarea
              label="Descrição"
              placeholder="Descreva o que está acontecendo"
              {...register("description")}
              error={errors.description?.message}
            />

            <Select
              label="Categoria de serviço"
              value={selectedServiceId}
              {...register("serviceId")}
              error={errors.serviceId?.message}
            >
              <option value="">Selecione a categoria de atendimento</option>

              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </Select>
          </div>
        </section>

        <aside className="rounded-xl border border-gray-200 p-5 md:p-6">
          <div className="mb-8 flex flex-col gap-1">
            <Text as="h2" size="lg" weight="bold">
              Resumo
            </Text>

            <Text textColor="quaternary">Valores e detalhes</Text>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <Text weight="bold" textColor="tertiary">
                Categoria de serviço
              </Text>

              <Text>
                {selectedService?.name ?? "Nenhuma categoria selecionada"}
              </Text>
            </div>

            <div>
              <Text weight="bold" textColor="tertiary">
                Custo inicial
              </Text>

              <Text size="xl" weight="bold">
                {formatCurrency(selectedService?.price ?? 0)}
              </Text>
            </div>

            <Text textColor="quaternary">
              O chamado será automaticamente atribuído a um técnico disponível
            </Text>

            <Button
              className="w-full py-2.5"
              type="submit"
              disabled={saving || !selectedService}
            >
              {saving ? "Criando..." : "Criar chamado"}
            </Button>
          </div>
        </aside>
      </div>
    </form>
  );
}
