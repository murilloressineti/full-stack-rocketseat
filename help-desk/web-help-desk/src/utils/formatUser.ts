// Formata o nome da pessoa, capitalizando a primeira letra de cada palavra.
export function formatPersonName(value: string) {
  return value
    .trim()
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Remove espaços e converte o e-mail para minúsculas.
export function formatEmail(value: string) {
  return value.trim().toLowerCase();
}

// Formata e valida nome e e-mail antes do envio para a API.
export function validateUserNameAndEmail(name: string, email: string) {
  const formattedName = formatPersonName(name);
  const formattedEmail = formatEmail(email);

  const errors = {
    name: "",
    email: "",
  };

  if (!formattedName) {
    errors.name = "Informe o nome.";
  }

  if (!formattedEmail) {
    errors.email = "Informe o e-mail.";
  } else if (!isValidEmail(formattedEmail)) {
    errors.email = "Informe um e-mail válido.";
  }

  return {
    formattedName,
    formattedEmail,
    errors,
    hasError: Boolean(errors.name || errors.email),
  };
}

// Valida o formato do e-mail.
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
