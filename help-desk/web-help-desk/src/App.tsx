import { Text } from "@components/ui";

export default function App() {
  return (
    <div className="bg-bg-light">
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
  );
}
