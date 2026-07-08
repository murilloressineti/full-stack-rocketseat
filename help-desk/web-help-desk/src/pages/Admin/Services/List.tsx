import { useEffect, useState } from "react";

import { toast } from "sonner";

import { deactivateService, getServices, reactivateService } from "@/services";

import type { Service } from "@/types";

import { ServiceModal, ServiceRow } from "./components";
import { Button, Icon, Skeleton, Text } from "@/components/ui";

import { Plus } from "@/assets/icons";

type ServiceListItem = {
  id: string;
  name: string;
  price: number | string;
  active: boolean;
};

function parseCurrencyValue(value: string | number) {
  if (typeof value === "number") {
    return value;
  }

  const cleanValue = value.replace("R$", "").replace(/\s/g, "").trim();

  // Formato brasileiro: 1.999,90 ou 99,90
  if (cleanValue.includes(",")) {
    return Number(cleanValue.replace(/\./g, "").replace(",", "."));
  }

  // Formato da API: 99.90
  return Number(cleanValue);
}

function formatCurrency(value: string | number) {
  const numberValue = parseCurrencyValue(value);

  if (Number.isNaN(numberValue)) {
    return "R$ 0,00";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numberValue);
}

function formatServiceListItem(service: Service): ServiceListItem {
  return {
    id: service.id,
    name: service.name,
    price: service.price,
    active: service.active,
  };
}

export default function AdminServicesList() {
  const [services, setServices] = useState<ServiceListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<
    ServiceListItem | undefined
  >();

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices();

        setServices(data.map(formatServiceListItem));
      } catch (error) {
        console.error("Erro ao carregar serviços:", error);
        toast.error("Não foi possível carregar os serviços.");
      } finally {
        setLoading(false);
      }
    }

    loadServices();
  }, []);

  function handleOpenCreateModal() {
    setSelectedService(undefined);
    setIsServiceModalOpen(true);
  }

  function handleOpenEditModal(service: ServiceListItem) {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  }

  function handleCloseModal() {
    setIsServiceModalOpen(false);
    setSelectedService(undefined);
  }

  function handleServiceSuccess(savedService: Service) {
    setServices((prev) => {
      const serviceExists = prev.some((item) => item.id === savedService.id);

      if (serviceExists) {
        return prev.map((item) =>
          item.id === savedService.id
            ? formatServiceListItem(savedService)
            : item,
        );
      }

      return [...prev, formatServiceListItem(savedService)];
    });

    handleCloseModal();
  }

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
    return <Skeleton />;
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex items-center justify-between">
        <Text as="h1" size="xl" weight="bold" textColor="blueDark">
          Serviços
        </Text>

        <Button
          size="xs"
          className="md:px-4 md:py-2.5"
          onClick={handleOpenCreateModal}
        >
          <Icon svg={Plus} />

          <Text weight="bold" className="hidden md:flex">
            Novo
          </Text>
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <div className="grid grid-cols-[1.3fr_1.3fr_0.8fr_1fr] border-b border-gray-200 px-4 py-4 md:grid-cols-[3fr_1.3fr_1fr_1fr]">
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

        {services.length > 0 ? (
          services.map((service) => (
            <ServiceRow
              key={service.id}
              name={service.name}
              price={formatCurrency(service.price)}
              active={service.active}
              onToggleStatus={() => handleToggleServiceStatus(service)}
              onEdit={() => handleOpenEditModal(service)}
            />
          ))
        ) : (
          <div className="px-4 py-6">
            <Text textColor="secondary">Nenhum serviço cadastrado.</Text>
          </div>
        )}
      </div>

      {isServiceModalOpen && (
        <ServiceModal
          service={selectedService}
          onClose={handleCloseModal}
          onSuccess={handleServiceSuccess}
        />
      )}
    </div>
  );
}
