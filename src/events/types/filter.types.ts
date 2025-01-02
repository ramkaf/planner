import { SelectQueryBuilder } from "typeorm";

export type FilterOperator = 'eq' | 'gte' | 'lte' | 'in';

export interface FilterConfig {
  field: string;
  operator: FilterOperator;
  relation?: string;
  customQuery?: (qb: SelectQueryBuilder<any>, value: any) => void;
}