import { Router } from "express";
import { ServicesController } from "@/controllers/services-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

const servicesRoutes = Router();
const servicesController = new ServicesController();

// Todas as rotas requerem autenticação
servicesRoutes.use(ensureAuthenticated);

// Criar serviço — apenas admin
servicesRoutes.post(
  "/",
  verifyUserAuthorization(["admin"]),
  servicesController.create
);

// Listar serviços — qualquer usuário logado (ou poderia restringir só admin se quiser)
servicesRoutes.get("/", servicesController.index);

// Atualizar serviço — apenas admin
servicesRoutes.put(
  "/:id",
  verifyUserAuthorization(["admin"]),
  servicesController.update
);

// Desativar serviço (soft delete) — apenas admin
servicesRoutes.delete(
  "/:id",
  verifyUserAuthorization(["admin"]),
  servicesController.deactivate
);

export { servicesRoutes };
