import { Request, Response, NextFunction } from "express";

function forceClientRole(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Garante que qualquer usuário criado nessa rota seja CLIENTE
  request.body.role = "client";
  next();
}

export { forceClientRole };
