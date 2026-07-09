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
    <article className="flex items-center justify-between border-b border-gray-200 py-3 last:border-b-0">
      <div className="min-w-0">
        <Text weight="bold" className="truncate">
          {name}
        </Text>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <Text>{price}</Text>

        <Button
          variant="secondary"
          size="xs"
          disabled={disabled}
          onClick={onDelete}
        >
          <Icon svg={Trash} size="xs" className="fill-feedback-danger" />
        </Button>
      </div>
    </article>
  );
}
