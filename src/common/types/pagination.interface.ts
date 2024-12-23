export interface Pagination {
    page: number;
    limit: number;
    offset: number;
  }

export interface PaginationResponse<T> {
    data: T[];
    total: number;
    currentPage: number;
    totalPages: number;
    limit: number;
}
  