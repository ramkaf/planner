// src/auth/decorators/auth.decorator.ts
import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

import { Roles } from './roles.decorator';
import { UserRole } from 'src/users/interfaces/user.interface';
import { RoleGuard } from '../guards/roles.guard';

export function Auth(...roles: UserRole[]) {
  return applyDecorators(
    UseGuards(JwtAuthGuard, RoleGuard),
    Roles(...roles)
  );
}