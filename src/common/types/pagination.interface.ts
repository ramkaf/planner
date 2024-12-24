export interface Pagination {
  page: number;
  limit: number;
  offset: number;
  search?: string;
  filters?: Record<string, any>; // Dynamic filters
}
export interface PaginationResponse<T> {
    data: T[];
    total: number;
    currentPage: number;
    totalPages: number;
    limit: number;
}
  