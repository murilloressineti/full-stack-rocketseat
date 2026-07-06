import { Router } from "express";
import { TicketsController } from "@/controllers/tickets-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const ticketsRoutes = Router();
const ticketsController = new TicketsController();

// Todas as rotas requerem autenticação
ticketsRoutes.use(ensureAuthenticated);

// Criar chamado — apenas cliente
ticketsRoutes.post(
  "/",
  verifyUserAuthorization(["client"]),
  ticketsController.create,
);

// Listar chamados — admin, técnico ou cliente (controlado no controller)
ticketsRoutes.get("/", ticketsController.index);

// Visualizar detalhes de um chamado específico — admin, técnico ou cliente (controlado no controller)
ticketsRoutes.get("/:id", ticketsController.show);

// Atualizar chamado — admin ou técnico responsável
ticketsRoutes.put("/:id", ticketsController.update);

// Adicionar serviço ao chamado — apenas técnico responsável
ticketsRoutes.post("/:id/services", ticketsController.addService);

// Remover serviço adicional do chamado — apenas técnico responsável
ticketsRoutes.delete(
  "/:id/services/:ticketServiceId",
  ticketsController.removeService,
);

// Excluir chamado — admin ou cliente dono do chamado
ticketsRoutes.delete("/:id", ticketsController.delete);

export { ticketsRoutes };
