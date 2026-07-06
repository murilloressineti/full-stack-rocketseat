import { Button, Icon, Text } from "@/components/ui";
import { Trash } from "@/assets/icons";

interface AdditionalServiceItemProps {
  name: string;
  price: string;
  disabled?: boolean;
  onDelete?: () => void;
}

export default function AdditionalServiceItem({
  name,
  price,
  disabled,
  onDelete,
}: AdditionalServiceItemProps) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-3 last:border-b-0">
      <Text weight="bold">{name}</Text>

      <div className="flex items-center gap-4">
        <Text>{price}</Text>

        <Button
          type="button"
          variant="secondary"
          size="xs"
          disabled={disabled}
          onClick={onDelete}
        >
          <Icon svg={Trash} size="xs" className="fill-feedback-danger" />
        </Button>
      </div>
    </div>
  );
}
