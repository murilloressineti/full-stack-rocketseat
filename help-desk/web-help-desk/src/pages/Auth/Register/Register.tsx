import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { registerSchema, type RegisterFormData } from "@/schemas/auth/";
import { registerUser } from "@/services/authService";

import { validateUserNameAndEmail } from "@/utils/formatUser";

import { Background } from "@/assets/images";
import { Button, Input, Logo, Text } from "@/components/ui";

export default function Register() {
  const {
    register, // register é usado para registrar os campos do formulário
    handleSubmit, // handleSubmit é usado para lidar com o envio do formulário
    formState: { errors, isSubmitting }, // formState é usado para acessar o estado do formulário, incluindo erros de validação
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) }); // useForm é usado para criar um formulário, e zodResolver é usado para integrar a validação do Zod com o React Hook Form

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

        return;
      }

      toast.error("Não foi possível criar a conta.");
    }
  }

  return (
    <main
      className="h-screen bg-bg-default bg-cover bg-no-repeat pt-8 md:pt-3"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Register */}
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
              Crie sua conta
            </Text>
            <Text size={"md"} textColor={"tertiary"}>
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
                <Text size="xs" textColor={"tertiary"} className="italic">
                  Mínimo de 6 dígitos
                </Text>
              )}
            </div>
          </div>

          <Button variant={"primary"} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>

        <div className="mt-3 flex flex-col gap-6 p-6 w-full max-w-md border border-gray-200 rounded-xl">
          <div className="flex flex-col gap-0.5">
            <Text as={"h2"} size={"md"} weight={"bold"}>
              Já tem uma conta?
            </Text>
            <Text size={"md"} textColor={"tertiary"}>
              Entre agora mesmo
            </Text>
          </div>

          <Button
            type="button"
            variant={"secondary"}
            onClick={() => navigate("/")}
          >
            Acessar conta
          </Button>
        </div>
      </section>
    </main>
  );
}
