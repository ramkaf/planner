import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Request } from 'express';
import { Pagination } from '../types/pagination.interface';

export const PaginationParams = createParamDecorator((data: unknown, ctx: ExecutionContext): Pagination => {
  const req: Request = ctx.switchToHttp().getRequest();
  
  const page = parseInt(req.query.page as string) || 1; // Default to page 1
  const limit = parseInt(req.query.limit as string) || 10; // Default to limit 10

  if (page < 1 || limit < 1) {
    throw new BadRequestException('Page and limit must be positive integers.');
  }

  const offset = (page - 1) * limit;

  return { page, limit, offset };
});
