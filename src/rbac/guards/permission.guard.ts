import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  PERMISSIONS_KEY,
  CONTROLLER_PERMISSION_KEY,
} from '../decorators/requires-permission.decorator';
import { IPermission } from '../interfaces/permission.interface';
import { RedisService } from '../../redis/providers/redis.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly redisService: RedisService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    const controllerPermission = this.reflector.get<string>(
      CONTROLLER_PERMISSION_KEY,
      context.getClass(),
    );

    let { user } = context.switchToHttp().getRequest();
    let userPermissions = user.role.permissions || [];
    userPermissions = await Promise.all(
      userPermissions.map(async (item) => {
        const pr = await this.redisService.getData(`permission-${item.id}`);
        return JSON.parse(pr);
      }),
    );

    if (controllerPermission) {
      const hasControllerPermission = userPermissions.some(
        (permission) => permission.name === `${controllerPermission}:*`,
      );
      if (hasControllerPermission) {
        return true;
      }
    }
    if (!requiredPermissions) {
      return true;
    }
    return requiredPermissions.every((permission: string) =>
      userPermissions.some(
        (userPermission: IPermission) => userPermission.name === permission,
      ),
    );
  }
}
