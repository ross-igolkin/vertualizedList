import { memo } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import SearchInput from "./SearchInput";

interface ListHeaderProps {
  title: string;
  totalItems: number;
  isSearching: boolean;
  onSearch: (term: string) => void;
}

const ListHeader = memo(function ListHeader({
  title,
  totalItems,
  isSearching,
  onSearch,
}: ListHeaderProps) {
  return (
    <Box padding={2} borderBottom={1} borderColor="divider">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        marginBottom={1.5}
      >
        <Typography variant="h6">{title}</Typography>
        <Chip label={totalItems} size="small" />
      </Stack>
      <SearchInput onSearch={onSearch} isLoading={isSearching} />
    </Box>
  );
});

export default ListHeader;
