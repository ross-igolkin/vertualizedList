export interface ListItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  catchPhrase: string;
  comments: string;
}

export interface PaginatedResponse<T> {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: T[];
}
