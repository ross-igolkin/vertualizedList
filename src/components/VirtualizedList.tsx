import { memo, useRef, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import VirtualRow from "./VirtualRow";
import ListItemSkeleton from "./ListItemSkeleton";
import StatusState from "./StatusState";
import DebugOverlay from "./DebugOverlay";
import type { ListItem } from "@/api/types";
import {
  ESTIMATED_ITEM_HEIGHT,
  OVERSCAN,
  LIST_GAP,
  SKELETON_COUNT,
} from "@/config";

interface VirtualizedListProps {
  items: ListItem[];
  totalItems: number;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  isSearchActive: boolean;
}

function InitialSkeleton() {
  return (
    <Stack padding={1.5} gap={1.5}>
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <ListItemSkeleton key={i} />
      ))}
    </Stack>
  );
}


const VirtualizedList = memo(function VirtualizedList({
  items,
  totalItems,
  isLoading,
  isError,
  error,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  isSearchActive,
}: VirtualizedListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  // Append ?debug to the URL to enable a floating debug panel with virtualization stats
  const debugEnabled = new URLSearchParams(window.location.search).has("debug");

  const showBottomLoader = isFetchingNextPage && !isSearchActive;
  const rowCount = items.length + (showBottomLoader ? 1 : 0);

  const virtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => ESTIMATED_ITEM_HEIGHT,
    overscan: OVERSCAN,
    gap: LIST_GAP,
  });

  const virtualItems = virtualizer.getVirtualItems();
  const lastItem = virtualItems[virtualItems.length - 1];

  useEffect(() => {
    if (!lastItem) return;

    const isNearEnd = lastItem.index >= items.length - OVERSCAN;
    if (isNearEnd && hasNextPage && !isFetchingNextPage && !isSearchActive) {
      fetchNextPage();
    }
  }, [
    lastItem?.index,
    items.length,
    hasNextPage,
    isFetchingNextPage,
    isSearchActive,
    fetchNextPage,
  ]);

  if (isLoading) return <InitialSkeleton />;

  if (isError) {
    return (
      <StatusState
        icon={<ErrorOutlineIcon sx={{ fontSize: 56, color: "error.main" }} />}
        message={error?.message ?? "Failed to load data"}
        actionLabel="Retry"
        actionColor="error"
        onAction={fetchNextPage}
      />
    );
  }

  if (items.length === 0) {
    return (
      <StatusState
        icon={<SearchOffIcon sx={{ fontSize: 56, color: "text.disabled" }} />}
        message={isSearchActive ? "No matches found" : "No items to display"}
      />
    );
  }

  const firstIndex = virtualItems[0]?.index ?? 0;
  const lastIndex = lastItem?.index ?? 0;

  return (
    <Box flex={1} minHeight={0} position="relative">
      <Box ref={scrollRef} height="100%" overflow="auto" padding={1.5}>
        <Box position="relative" style={{ height: virtualizer.getTotalSize() }}>
          <Stack
            gap={`${LIST_GAP}px`}
            position="absolute"
            top={0}
            left={0}
            width="100%"
            style={{ transform: `translateY(${virtualItems[0]?.start ?? 0}px)` }}
          >
            {virtualItems.map((virtualRow) => {
              if (virtualRow.index === items.length) {
                return (
                  <div
                    key="loader"
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}
                  >
                    <ListItemSkeleton />
                  </div>
                );
              }

              const item = items[virtualRow.index];
              if (!item) return null;

              return (
                <VirtualRow
                  key={item.id}
                  item={item}
                  index={virtualRow.index}
                  measureElement={virtualizer.measureElement}
                />
              );
            })}
          </Stack>
        </Box>
      </Box>

      {debugEnabled && (
        <DebugOverlay
          renderedNodes={virtualItems.length}
          loadedItems={items.length}
          totalItems={totalItems}
          visibleRange={[firstIndex, lastIndex]}
          isFetching={isFetchingNextPage}
        />
      )}
    </Box>
  );
});

export default VirtualizedList;
