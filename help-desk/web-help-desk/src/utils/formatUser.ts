export function formatPersonName(value: string) {
  return value
    .trim()
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatEmail(value: string) {
  return value.trim().toLowerCase();
}

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
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formattedEmail)) {
    errors.email = "Informe um e-mail válido.";
  }

  return {
    formattedName,
    formattedEmail,
    errors,
    hasError: Boolean(errors.name || errors.email),
  };
}
