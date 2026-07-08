import Icon from "./Icon";
import Text from "./Text";

import { Spinner } from "@/assets/icons";

export default function Skeleton() {
  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <Icon svg={Spinner} className="animate-spin text-gray-300" />

      <Text textColor="secondary">Carregando...</Text>
    </div>
  );
}
