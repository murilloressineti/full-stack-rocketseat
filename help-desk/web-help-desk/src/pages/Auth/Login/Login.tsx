import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";

import { useAuth } from "@/contexts/AuthContext";

import { loginSchema, type LoginFormData } from "@/schemas/auth";

import { formatEmail } from "@/utils/formatUser";

import { Button, Input, Logo, Text } from "@/components/ui";

import { Background } from "@/assets/images";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { signIn } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(data: LoginFormData) {
    try {
      const response = await signIn(formatEmail(data.email), data.password);

      toast.success("Login realizado com sucesso!");

      switch (response.user.role) {
        case "admin":
          navigate("/admin");
          break;
        case "client":
          navigate("/cliente");
          break;
        case "technician":
          navigate("/tecnico");
          break;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (message === "Invalid email or password") {
          toast.error("E-mail ou senha inválidos");
          return;
        }
      }

      toast.error("Erro inesperado");
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
              Acesse o portal
            </Text>

            <Text size="md" textColor="tertiary">
              Entre usando seu e-mail e senha cadastrados
            </Text>
          </div>

          <div className="my-8 flex flex-col gap-4">
            <Input
              label="E-mail"
              type="email"
              placeholder="Digite seu e-mail"
              {...register("email")}
              error={errors.email?.message}
            />

            <Input
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
              {...register("password")}
              error={errors.password?.message}
            />
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className="mt-3 flex w-full max-w-md flex-col gap-6 rounded-xl border border-gray-200 p-6">
          <div className="flex flex-col gap-0.5">
            <Text as="h2" size="md" weight="bold">
              Ainda não tem uma conta?
            </Text>

            <Text size="md" textColor="tertiary">
              Cadastre agora mesmo
            </Text>
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/cadastro")}
          >
            Criar conta
          </Button>
        </div>
      </section>
    </main>
  );
}
