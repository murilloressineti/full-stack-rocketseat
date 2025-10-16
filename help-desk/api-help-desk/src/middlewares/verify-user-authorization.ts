import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";

// Middleware que verifica se o usuário autenticado possui uma das roles permitidas
function verifyUserAuthorization(role: string[]) {
  // Retorna uma função middleware personalizada para checar a autorização
  return (request: Request, response: Response, next: NextFunction) => {
    // Garante que o usuário esteja autenticado
    if (!request.user) {
      throw new AppError("Unauthorized", 401);
    }

    // Verifica se a role do usuário está incluída nas roles permitidas
    if (!role.includes(request.user.role)) {
      throw new AppError("Unauthorized", 401);
    }

    // Se tudo estiver certo, segue para o próximo middleware ou controller
    return next();
  };
}

export { verifyUserAuthorization };
