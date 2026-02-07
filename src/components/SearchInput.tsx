import { memo, useState, useCallback, useEffect, useMemo } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useDebounce } from "@/hooks/useDebounce";
import { MIN_SEARCH_LENGTH } from "@/config";

interface SearchInputProps {
  onSearch: (term: string) => void;
  placeholder?: string;
  isLoading?: boolean;
}

const SearchInput = memo(function SearchInput({
  onSearch,
  placeholder = "Search by name or email...",
  isLoading = false,
}: SearchInputProps) {
  const [searchValue, setValue] = useState("");
  const debouncedValue = useDebounce(searchValue);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    [],
  );

  const handleClear = useCallback(() => {
    setValue("");
    onSearch("");
  }, [onSearch]);

  const isDebouncing = searchValue !== debouncedValue;
  const showSpinner = searchValue.length >= MIN_SEARCH_LENGTH && (isDebouncing || isLoading);

  const slotProps = useMemo(
    () => ({
      input: {
        startAdornment: (
          <InputAdornment position="start">
            {showSpinner ? (
              <CircularProgress size={20} />
            ) : (
              <SearchIcon color="action" fontSize="small" />
            )}
          </InputAdornment>
        ),
        endAdornment: searchValue ? (
          <InputAdornment position="end">
            <IconButton size="small" onClick={handleClear} edge="end">
              <ClearIcon fontSize="small" />
            </IconButton>
          </InputAdornment>
        ) : null,
      },
    }),
    [searchValue, handleClear, showSpinner],
  );

  return (
    <TextField
      fullWidth
      size="small"
      value={searchValue}
      onChange={handleChange}
      placeholder={placeholder}
      slotProps={slotProps}
    />
  );
});

export default SearchInput;
