import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY, CONTROLLER_PERMISSION_KEY } from '../decorators/requires-permission.decorator';
import { IPermission } from '../interfaces/permission.interface';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()]
    );

    const controllerPermission = this.reflector.get<string>(
      CONTROLLER_PERMISSION_KEY,
      context.getClass()
    );
    
    const { user } = context.switchToHttp().getRequest();
    const userPermissions = user.role.permissions || [];
    if (controllerPermission) {
      const hasControllerPermission = userPermissions.some(permission => 
        permission.name === `${controllerPermission}:*`
      );
      if (hasControllerPermission) {
        return true;
      }
    }
    if (!requiredPermissions) {
      return true;
    }
    return  requiredPermissions.every((permission:string) =>
      userPermissions.some((userPermission:IPermission) => userPermission.name === permission)
    );
  }
}
