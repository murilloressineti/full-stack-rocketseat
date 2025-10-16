import { Request, Response, NextFunction } from "express";

// Middleware que força o papel (role) do usuário para "client" ao criar um novo usuário
function forceClientRole(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Define o campo "role" do corpo da requisição como "client"
  request.body.role = "client";

  // Passa o controle para o próximo middleware ou controller
  next();
}

export { forceClientRole };
