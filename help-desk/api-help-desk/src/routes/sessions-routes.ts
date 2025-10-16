import { Router } from "express";
import { SessionsController } from "@/controllers/sessions-controller";

// Cria um novo roteador do Express para lidar com autenticação (sessões)
const sessionsRoutes = Router();

// Instancia o controller responsável pelas sessões (login)
const sessionsController = new SessionsController();

// Rota para autenticação de usuário (login)
sessionsRoutes.post("/", sessionsController.create);

// Exporta as rotas de sessão para serem usadas no index.routes.ts
export { sessionsRoutes };
