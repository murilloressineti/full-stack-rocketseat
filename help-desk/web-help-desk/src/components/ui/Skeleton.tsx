import { Text } from "@/components/ui";

export default function Loading() {
  return (
    <div className="flex animate-pulse">
      <Text textColor="secondary">Carregando...</Text>
    </div>
  );
}
