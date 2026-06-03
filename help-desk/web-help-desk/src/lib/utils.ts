import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Função para mesclar classes do Tailwind de forma inteligente,
 * evitando conflitos e permitindo lógica condicional.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
