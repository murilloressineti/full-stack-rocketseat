import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { deactivateService, getServices, reactivateService } from "@/services";
import type { Service } from "@/types";

import { Button, Icon, Text } from "@/components/ui";
import { Plus } from "@/assets/icons";
import ServiceRow from "./components/ServiceRow";

type ServiceListItem = {
  id: string;
  name: string;
  price: string;
  active: boolean;
};

export default function AdminServicesList() {
  const [services, setServices] = useState<ServiceListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  function formatCurrency(value: string | number) {
    const numberValue = Number(value);

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numberValue);
  }

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices();

        const formattedServices: ServiceListItem[] = data.map(
          (service: Service) => ({
            id: service.id,
            name: service.name,
            price: formatCurrency(service.price),
            active: service.active,
          }),
        );

        setServices(formattedServices);
      } catch (error) {
        console.error("Erro ao carregar serviços:", error);
        toast.error("Não foi possível carregar os serviços.");
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  async function handleToggleServiceStatus(service: ServiceListItem) {
    try {
      const updatedService = service.active
        ? await deactivateService(service.id)
        : await reactivateService(service.id);

      setServices((prev) =>
        prev.map((item) =>
          item.id === service.id
            ? {
                ...item,
                active: updatedService.active,
              }
            : item,
        ),
      );

      toast.success(
        service.active
          ? "Serviço desativado com sucesso!"
          : "Serviço reativado com sucesso!",
      );
    } catch (error) {
      console.error("Erro ao alterar status do serviço:", error);
      toast.error("Não foi possível alterar o status do serviço.");
    }
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex items-center justify-between">
        <Text as="h1" size="xl" weight="bold" textColor="blueDark">
          Serviços
        </Text>

        <Button
          size="xs"
          className="md:py-2.5 md:px-4"
          onClick={() => navigate("/admin/servicos/novo")}
        >
          <Icon svg={Plus} />
          <Text weight="bold" className="hidden md:flex">
            Novo
          </Text>
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <div className="grid grid-cols-[1.3fr_1.3fr_0.8fr_1fr] md:grid-cols-[3fr_1.3fr_1fr_1fr] border-b border-gray-200 px-4 py-4">
          <Text weight="bold" textColor="tertiary">
            Título
          </Text>

          <Text weight="bold" textColor="tertiary">
            Valor
          </Text>

          <Text weight="bold" textColor="tertiary">
            Status
          </Text>
          <div />
        </div>

        {/* Lista */}
        {services.length > 0 ? (
          services.map((service) => (
            <ServiceRow
              key={service.id}
              name={service.name}
              price={service.price}
              active={service.active}
              onToggleStatus={() => handleToggleServiceStatus(service)}
              onEdit={() =>
                navigate(`/admin/servicos/${service.id}/editar`, {
                  state: { service },
                })
              }
            />
          ))
        ) : (
          <div className="px-4 py-6">
            <Text textColor="secondary">Nenhum serviço cadastrado.</Text>
          </div>
        )}
      </div>
    </div>
  );
}
