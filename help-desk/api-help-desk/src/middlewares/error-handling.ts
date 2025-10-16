import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { ZodError } from "zod";

// Middleware global para tratamento centralizado de erros
export function errorHandling(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Trata erros personalizados da aplicação (AppError)
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  // Trata erros de validação gerados pelo Zod
  if (error instanceof ZodError) {
    return response.status(400).json({
      message: "validation error",
      issues: error.format(),
    });
  }

  // Trata erros inesperados (erros internos do servidor)
  return response.status(500).json({ message: error.message });
}
