export interface Pagination {
  page: number;
  limit: number;
  offset: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

export interface PaginationResponse<T> {
  data: T[];
  total: number;
  currentPage: number;
  totalPages: number;
  limit: number;
}
