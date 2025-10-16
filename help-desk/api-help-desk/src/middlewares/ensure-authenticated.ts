import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";

// Define o formato esperado do payload do token JWT
interface TokenPayload {
  role: string;
  sub: string;
}

// Middleware que garante que o usuário está autenticado antes de acessar a rota
function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    // Obtém o token JWT do cabeçalho de autorização
    const authHeader = request.headers.authorization;

    // Verifica se o token foi enviado
    if (!authHeader) {
      throw new AppError("JWT token not found", 401);
    }

    // Extrai o token do formato "Bearer <token>"
    const [, token] = authHeader.split(" ");

    // Verifica e decodifica o token usando a chave secreta
    const { role, sub: user_id } = verify(
      token,
      authConfig.jwt.secret
    ) as TokenPayload;

    // Adiciona os dados do usuário autenticado à requisição
    request.user = {
      id: user_id,
      role,
    };

    // Continua para o próximo middleware ou controller
    return next();
  } catch (error) {
    // Lança erro se o token for inválido ou ausente
    throw new AppError("Invalid JWT token", 401);
  }
}

// Exporta o middleware de autenticação
export { ensureAuthenticated };
