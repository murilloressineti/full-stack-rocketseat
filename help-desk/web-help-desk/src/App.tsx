import Text from "./components/text";
import Icon from "./components/icon";
import BanIcon from "./assets/icons/ban.svg?react";

export default function App() {
  return (
    <div>
      <Text as="h1" weight="bold" className="text-blue-dark!">
        Olá, mundo!
      </Text>

      <Icon svg={BanIcon} animate className="fill-feedback-danger"/>
    </div>
  );
}
