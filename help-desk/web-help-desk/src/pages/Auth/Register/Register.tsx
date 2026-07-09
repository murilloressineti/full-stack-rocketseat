import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";

import { registerUser } from "@/services/authService";

import { registerSchema, type RegisterFormData } from "@/schemas/auth";

import { validateUserNameAndEmail } from "@/utils/formatUser";

import { Button, Input, Logo, Text } from "@/components/ui";

import { Background } from "@/assets/images";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();

  async function onSubmit(data: RegisterFormData) {
    const { formattedName, formattedEmail, errors, hasError } =
      validateUserNameAndEmail(data.name, data.email);

    if (hasError) {
      if (errors.name) toast.error(errors.name);
      if (errors.email) toast.error(errors.email);
      return;
    }

    try {
      await registerUser({
        ...data,
        name: formattedName,
        email: formattedEmail,
      });

      toast.success("Conta criada com sucesso!");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (message === "User with same email already exists") {
          toast.error("E-mail já cadastrado");
          return;
        }
      }

      toast.error("Não foi possível criar a conta.");
    }
  }

  return (
    <main
      className="h-screen bg-bg-default bg-cover bg-no-repeat pt-8 md:pt-3"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <section className="ml-auto flex h-full w-full flex-col items-center justify-center bg-bg-light px-6 py-8 md:rounded-tl-3xl md:px-35 md:py-12 lg:w-1/2">
        <div className="mb-6">
          <Logo variant="full" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-md flex-col rounded-xl border border-gray-200 p-6"
        >
          <div className="flex flex-col gap-0.5">
            <Text as="h1" size="lg" weight="bold">
              Crie sua conta
            </Text>

            <Text size="md" textColor="tertiary">
              Informe seu nome, e-mail e senha
            </Text>
          </div>

          <div className="my-8 flex flex-col gap-4">
            <Input
              label="Nome"
              type="text"
              placeholder="Digite o nome completo"
              {...register("name")}
              error={errors.name?.message}
            />

            <Input
              label="E-mail"
              type="email"
              placeholder="exemplo@mail.com"
              {...register("email")}
              error={errors.email?.message}
            />

            <div className="flex flex-col gap-1">
              <Input
                label="Senha"
                type="password"
                placeholder="Digite sua senha"
                {...register("password")}
                error={errors.password?.message}
              />

              {!errors.password && (
                <Text size="xs" textColor="tertiary" className="italic">
                  Mínimo de 6 dígitos
                </Text>
              )}
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>

        <div className="mt-3 flex w-full max-w-md flex-col gap-6 rounded-xl border border-gray-200 p-6">
          <div className="flex flex-col gap-0.5">
            <Text as="h2" size="md" weight="bold">
              Já tem uma conta?
            </Text>

            <Text size="md" textColor="tertiary">
              Entre agora mesmo
            </Text>
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/")}
          >
            Acessar conta
          </Button>
        </div>
      </section>
    </main>
  );
}
