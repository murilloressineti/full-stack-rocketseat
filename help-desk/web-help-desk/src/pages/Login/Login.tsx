import { Background } from "@/assets/images";
import { Button, Input, Logo, Text } from "@/components/ui";

export default function Login() {
  return (
    <main
      className="h-screen bg-bg-default bg-cover bg-no-repeat pt-8 md:pt-3"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* Login */}
      <section className="bg-bg-light h-full ml-auto md:rounded-tl-3xl flex flex-col w-full items-center justify-center lg:w-1/2 px-6 md:px-35 py-8 md:py-12">
        <div className="mb-8">
          <Logo variant="full"/>
        </div>

        <div className="flex flex-col p-7 w-full max-w-md border border-gray-200 rounded-xl">
          <div className="flex flex-col gap-0.5">
            <Text as={"h1"} size={"lg"} weight={"bold"}>
              Acesse o portal
            </Text>
            <Text size={"md"} textColor={"tertiary"}>
              Entre usando seu e-mail e senha cadastrados
            </Text>
          </div>

          <div className="my-10 flex flex-col gap-4">
            <Input label="E-mail" type="email" placeholder="exemplo@mail.com" />
            <Input
              label="Senha"
              type="password"
              placeholder="Digite sua senha"
            />
          </div>

          <Button variant={"primary"}>Entrar</Button>
        </div>

        <div className="mt-3 flex flex-col gap-6 p-7 w-full max-w-md border border-gray-200 rounded-xl">
          <div className="flex flex-col gap-0.5">
            <Text as={"h2"} size={"md"} weight={"bold"}>
              Ainda não tem uma conta?
            </Text>
            <Text size={"md"} textColor={"tertiary"}>
              Cadastre agora mesmo
            </Text>
          </div>

          <Button variant={"secondary"}>Criar conta</Button>
        </div>
      </section>
    </main>
  );
}
