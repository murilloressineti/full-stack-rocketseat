import { Button, Icon, Input, Text } from "@components/ui";
import { ArrowLeft, PenLine } from "@assets/icons";

export default function App() {
  return (
    <div className="bg-bg-light">
      {/* Text */}
      <div>
        <Text as="h1" weight="bold" textColor="primary">
          Olá, mundo!
        </Text>
        <Text size={"xxs"} textColor={"secondary"}>
          Olá, mundo!
        </Text>
        <Text size={"xs"} textColor={"tertiary"}>
          Olá, mundo!
        </Text>
        <Text size={"md"} textColor={"inverted"}>
          Olá, mundo!
        </Text>
        <Text size={"lg"} textColor={"blueBase"}>
          Olá, mundo!
        </Text>
        <Text size={"xl"} textColor={"blueDark"}>
          Olá, mundo!
        </Text>
        <Text size={"xl"} textColor={"blueLight"}>
          Olá, mundo!
        </Text>
      </div>

      {/* Icon */}
      <div>
        <Icon svg={ArrowLeft} size={"xs"} />
        <Icon svg={ArrowLeft} size={"sm"} />
        <Icon svg={ArrowLeft} size={"md"} />
        <Icon svg={ArrowLeft} size={"lg"} className="fill-feedback-danger" />
      </div>

      {/* Button */}
      <div>
        <Button variant={"primary"}>
          <Icon svg={PenLine} /> Label
        </Button>
        <Button variant={"secondary"}>
          <Icon svg={PenLine} /> Label
        </Button>
        <Button variant={"link"}>
          <Icon svg={PenLine} /> Label
        </Button>

        <Button variant={"primary"} size={"xs"}>
          <Icon svg={PenLine} />
        </Button>

        <Button variant={"secondary"} size={"xs"}>
          <Icon svg={PenLine} />
        </Button>

        <Button variant={"link"} size={"xs"}>
          <Icon svg={PenLine} />
        </Button>

        <div className="flex flex-col gap-4 w-100 border p-4">
          <Button>Entrar</Button>
          <Button variant={"secondary"}>Criar conta</Button>
        </div>
      </div>

      {/* Input */}
      <div className="flex flex-col gap-4 p-10 max-w-sm">
        {/* Exemplo 1: Input simples */}
        <Input label="Label" type="email" placeholder="Placeholder" />

        {/* Exemplo 2: Input com Erro (vai ficar vermelho automaticamente) */}
        <Input
          label="Label"
          type="text"
          placeholder="Placeholder"
          error="Label"
        />
      </div>

      <div className="flex flex-col gap-4 p-10 max-w-sm">
        <Input label="E-mail" type="email" placeholder="exemplo@mail.com" />

        <Input
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
        />
      </div>
    </div>
  );
}
