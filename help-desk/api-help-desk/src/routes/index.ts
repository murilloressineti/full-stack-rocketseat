import { Router } from "express";
import { usersRoutes } from "./users-routes";
import { sessionsRoutes } from "./sessions-routes";
import { servicesRoutes } from "./services-routes";
import { ticketsRoutes } from "./tickets-routes";

// Cria o roteador principal da aplicação
const routes = Router();

// Rotas relacionadas aos usuários
routes.use("/users", usersRoutes);

// Rotas de autenticação (login)
routes.use("/sessions", sessionsRoutes);

// Rotas de serviços cadastrados pelo admin
routes.use("/services", servicesRoutes);

// Rotas de chamados (tickets)
routes.use("/tickets", ticketsRoutes);

// Exporta todas as rotas unificadas
export { routes };
