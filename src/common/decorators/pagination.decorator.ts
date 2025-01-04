import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { Pagination } from '../types/pagination.interface';

export const PaginationParams = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Pagination => {
    const req: Request = ctx.switchToHttp().getRequest();

    const page = parseInt(req.query.page as string) || 1; // Default to page 1
    const limit = parseInt(req.query.limit as string) || 10; // Default to limit 10
    const search = (req.query.search as string) || '';
    const sortBy = (req.query.sortBy as string) || 'id';
    const sortOrder =
      ((req.query.sortOrder as string)?.toLowerCase() as 'asc' | 'desc') ||
      'asc';
    const offset = (page - 1) * limit;

    // Extract filters dynamically
    const filters: Record<string, any> = {};
    for (const [key, value] of Object.entries(req.query)) {
      if (['page', 'limit', 'search', 'sortBy', 'sortOrder'].includes(key))
        continue; // Skip pagination params
      filters[key] = value;
    }

    if (page < 1 || limit < 1) {
      throw new BadRequestException(
        'Page and limit must be positive integers.',
      );
    }

    if (sortOrder && !['asc', 'desc'].includes(sortOrder)) {
      throw new BadRequestException(
        'Sort order must be either "asc" or "desc".',
      );
    }

    return { page, limit, offset, search, filters, sortBy, sortOrder };
  },
);
