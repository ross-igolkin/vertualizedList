import axios from "axios";
import type { ListItem, PaginatedResponse } from "./types";
import { PER_PAGE } from "@/config";

const api = axios.create({
  baseURL: "/",
});

export interface FetchListParams {
  endpoint: string;
  page: number;
  perPage?: number;
  search?: string;
}

export async function fetchList({
  endpoint,
  page,
  perPage = PER_PAGE,
  search,
}: FetchListParams): Promise<PaginatedResponse<ListItem>> {
  const params: Record<string, string | number> = {
    _page: page,
    _per_page: perPage,
  };

  // json-server v1 beta only supports exact, case-sensitive field match.
  // No partial, case-insensitive, or full-text search is available.
  // Heuristic: "@" → email filter, otherwise → lastName filter.
  // With a real backend, this would be a single full-text search endpoint.
  if (search) {
    if (search.includes("@")) {
      params.email = search;
    } else {
      params.lastName = search;
    }
  }

  const { data } = await api.get<PaginatedResponse<ListItem>>(endpoint, {
    params,
  });
  return data;
}
