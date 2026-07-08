import { useEffect, useState } from "react";

import { toast } from "sonner";

import { getClients } from "@/services";

import type { Client } from "@/types";

import { ClientModal, ClientRow } from "./components";
import { Skeleton, Text } from "@/components/ui";

type ClientListItem = {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  role: "client";
};

export default function AdminClientsList() {
  const [clients, setClients] = useState<ClientListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedClient, setSelectedClient] = useState<Client | undefined>();
  const [modalMode, setModalMode] = useState<"edit" | "delete" | undefined>();

  useEffect(() => {
    async function loadClients() {
      try {
        const data = await getClients();

        const formattedClients: ClientListItem[] = data.map((client) => ({
          id: client.id,
          name: client.name,
          email: client.email,
          avatar: client.avatar ?? null,
          role: "client",
        }));

        setClients(formattedClients);
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
        toast.error("Não foi possível carregar os clientes.");
      } finally {
        setLoading(false);
      }
    }

    loadClients();
  }, []);

  function handleCloseModal() {
    setSelectedClient(undefined);
    setModalMode(undefined);
  }

  function handleClientSuccess(updatedClient?: Client) {
    if (modalMode === "delete") {
      setClients((prev) =>
        prev.filter((client) => client.id !== selectedClient?.id),
      );
    }

    if (modalMode === "edit" && updatedClient) {
      setClients((prev) =>
        prev.map((client) =>
          client.id === updatedClient.id ? updatedClient : client,
        ),
      );
    }

    handleCloseModal();
  }

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <div className="flex items-center justify-between">
        <Text as="h1" size="xl" weight="bold" textColor="blueDark">
          Clientes
        </Text>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200">
        <div className="grid grid-cols-[1.5fr_1.5fr_0.5fr] md:grid-cols-[2fr_1.5fr_0.5fr] border-b border-gray-200 px-4 py-4">
          <Text weight="bold" textColor="tertiary">
            Nome
          </Text>

          <Text weight="bold" textColor="tertiary">
            E-mail
          </Text>

          <div />
        </div>

        {clients.length > 0 ? (
          clients.map((client) => (
            <ClientRow
              key={client.id}
              id={client.id}
              name={client.name}
              email={client.email}
              avatar={client.avatar}
              onEdit={() => {
                setSelectedClient(client);
                setModalMode("edit");
              }}
              onDelete={() => {
                setSelectedClient(client);
                setModalMode("delete");
              }}
            />
          ))
        ) : (
          <div className="px-4 py-6">
            <Text textColor="secondary">Nenhum cliente cadastrado.</Text>
          </div>
        )}
      </div>

      {selectedClient && modalMode && (
        <ClientModal
          mode={modalMode}
          client={selectedClient}
          onClose={handleCloseModal}
          onSuccess={handleClientSuccess}
        />
      )}
    </div>
  );
}
