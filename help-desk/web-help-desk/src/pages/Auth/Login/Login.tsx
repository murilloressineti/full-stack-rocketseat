import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { formatEmail } from "@/utils/formatUser";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { loginSchema, type LoginFormData } from "@/schemas/auth";

import { useAuth } from "@/contexts/AuthContext";

import { Background } from "@/assets/images";
import { Button, Input, Logo, Text } from "@/components/ui";

export default function Login() {
  const {
    register, // register é usado para registrar os campos do formulário
    handleSubmit, // handleSubmit é usado para lidar com o envio do formulário
    formState: { errors, isSubmitting }, // formState é usado para acessar o estado do formulário, incluindo erros de validação
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) }); // useForm é usado para criar um formulário, e zodResolver é usado para integrar a validação do Zod com o React Hook Form

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

        return;
      }
      toast.error("Erro inesperado");
    }
  }

  return (
    <main
      className="h-screen bg-bg-default bg-cover bg-no-repeat pt-8 md:pt-3"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Login */}
      <section className="bg-bg-light h-full ml-auto md:rounded-tl-3xl flex flex-col w-full items-center justify-center lg:w-1/2 px-6 md:px-35 py-8 md:py-12">
        <div className="mb-6">
          <Logo variant="full" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col p-6 w-full max-w-md border border-gray-200 rounded-xl"
        >
          <div className="flex flex-col gap-0.5">
            <Text as={"h1"} size={"lg"} weight={"bold"}>
              Acesse o portal
            </Text>
            <Text size={"md"} textColor={"tertiary"}>
              Entre usando seu e-mail e senha cadastrados
            </Text>
          </div>

          <div className="my-8 flex flex-col gap-4">
            <Input
              label="E-mail"
              type="email"
              placeholder="exemplo@mail.com"
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

          <Button variant={"primary"} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className="mt-3 flex flex-col gap-6 p-6 w-full max-w-md border border-gray-200 rounded-xl">
          <div className="flex flex-col gap-0.5">
            <Text as={"h2"} size={"md"} weight={"bold"}>
              Ainda não tem uma conta?
            </Text>
            <Text size={"md"} textColor={"tertiary"}>
              Cadastre agora mesmo
            </Text>
          </div>

          <Button type="button" variant={"secondary"} onClick={() => navigate("/cadastro")}>
            Criar conta
          </Button>
        </div>
      </section>
    </main>
  );
}
