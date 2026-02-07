import { useMemo } from "react";
import {
  useInfiniteQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { fetchList } from "@/api/client";
import { PER_PAGE, MIN_SEARCH_LENGTH } from "@/config";

export function useInfiniteList(endpoint: string, searchTerm: string) {
  const activeSearch = searchTerm.length >= MIN_SEARCH_LENGTH ? searchTerm : "";
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading,
    isPlaceholderData,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: [endpoint, activeSearch],
    queryFn: ({ pageParam }) =>
      fetchList({
        endpoint,
        page: pageParam,
        perPage: PER_PAGE,
        search: activeSearch || undefined,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    placeholderData: keepPreviousData,
  });

  const items = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data],
  );

  const totalItems = data?.pages[0]?.items ?? 0;

  return {
    items,
    totalItems,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading,
    isPlaceholderData,
    isError,
    error,
  };
}
