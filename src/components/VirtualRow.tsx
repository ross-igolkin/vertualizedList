// Wrapper for dynamic measurement — see TanStack Virtual docs:
// https://tanstack.com/virtual/latest/docs/api/virtualizer#measureelement
import { memo } from "react";
import ListItem from "./ListItem";
import type { ListItem as ListItemType } from "@/api/types";

interface VirtualRowProps {
  item: ListItemType;
  index: number;
  measureElement: (node: Element | null) => void;
}

const VirtualRow = memo(function VirtualRow({
  item,
  index,
  measureElement,
}: VirtualRowProps) {
  return (
    <div data-index={index} ref={measureElement}>
      <ListItem item={item} />
    </div>
  );
});

export default VirtualRow;
