import { useState, useCallback } from "react";
import Paper from "@mui/material/Paper";
import ListHeader from "./ListHeader";
import VirtualizedList from "./VirtualizedList";
import { useInfiniteList } from "@/hooks/useInfiniteList";

interface ListPanelProps {
  title: string;
  endpoint: string;
}

export default function ListPanel({ title, endpoint }: ListPanelProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const {
    items,
    totalItems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isPlaceholderData,
    isError,
    error,
  } = useInfiniteList(endpoint, searchTerm);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const isSearchActive = searchTerm.length > 0;

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        border: 1,
        borderColor: "divider",
      }}
    >
      <ListHeader
        title={title}
        totalItems={totalItems}
        isSearching={isPlaceholderData}
        onSearch={handleSearch}
      />

      <VirtualizedList
        items={items}
        totalItems={totalItems}
        isLoading={isLoading}
        isError={isError}
        error={error}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        isSearchActive={isSearchActive}
      />
    </Paper>
  );
}
