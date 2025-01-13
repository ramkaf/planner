// src/rbac/seeds/default-permissions.ts

import { PermissionService } from "../services/permission.service";
import { RoleService } from "../services/role.service";

async function seedDefaultPermissions(
  permissionService: PermissionService,
  roleService: RoleService,
) {
  // Users Module Permissions
  const userPermissions = await Promise.all([
    // Controller level permission
    permissionService.createControllerPermission({
      resource: 'users',
      description: 'Full access to user management'
    }),
    // Action level permissions
    permissionService.createActionPermission({
      resource: 'users',
      action: 'create',
      description: 'Can create new users'
    }),
    permissionService.createActionPermission({
      resource: 'users',
      action: 'read',
      description: 'Can view user details'
    }),
    permissionService.createActionPermission({
      resource: 'users',
      action: 'update',
      description: 'Can update user information'
    }),
    permissionService.createActionPermission({
      resource: 'users',
      action: 'delete',
      description: 'Can delete users'
    }),
  ]);

  // Events Module Permissions
  const eventPermissions = await Promise.all([
    // Controller level permission
    permissionService.createControllerPermission({
      resource: 'events',
      description: 'Full access to event management'
    }),
    // Action level permissions
    permissionService.createActionPermission({
      resource: 'events',
      action: 'create',
      description: 'Can create new events'
    }),
    permissionService.createActionPermission({
      resource: 'events',
      action: 'read',
      description: 'Can view event details'
    }),
    permissionService.createActionPermission({
      resource: 'events',
      action: 'update',
      description: 'Can update event information'
    }),
    permissionService.createActionPermission({
      resource: 'events',
      action: 'delete',
      description: 'Can delete events'
    }),
  ]);

  // Reviews Module Permissions
  const reviewPermissions = await Promise.all([
    // Controller level permission
    permissionService.createControllerPermission({
      resource: 'reviews',
      description: 'Full access to review management'
    }),
    // Action level permissions
    permissionService.createActionPermission({
      resource: 'reviews',
      action: 'create',
      description: 'Can create reviews'
    }),
    permissionService.createActionPermission({
      resource: 'reviews',
      action: 'read',
      description: 'Can read reviews'
    }),
    permissionService.createActionPermission({
      resource: 'reviews',
      action: 'update',
      description: 'Can update reviews'
    }),
    permissionService.createActionPermission({
      resource: 'reviews',
      action: 'delete',
      description: 'Can delete reviews'
    }),
  ]);

  // Mailers Module Permissions
  const mailerPermissions = await Promise.all([
    // Controller level permission
    permissionService.createControllerPermission({
      resource: 'mailers',
      description: 'Full access to mail management'
    }),
    // Action level permissions
    permissionService.createActionPermission({
      resource: 'mailers',
      action: 'create',
      description: 'Can create email templates'
    }),
    permissionService.createActionPermission({
      resource: 'mailers',
      action: 'read',
      description: 'Can view email templates'
    }),
    permissionService.createActionPermission({
      resource: 'mailers',
      action: 'update',
      description: 'Can update email templates'
    }),
    permissionService.createActionPermission({
      resource: 'mailers',
      action: 'delete',
      description: 'Can delete email templates'
    }),
  ]);

  // RBAC Management Permissions
  const rbacPermissions = await Promise.all([
    // Controller level permission
    permissionService.createControllerPermission({
      resource: 'roles',
      description: 'Full access to role management'
    }),
    // Action level permissions
    permissionService.createActionPermission({
      resource: 'roles',
      action: 'create',
      description: 'Can create roles'
    }),
    permissionService.createActionPermission({
      resource: 'roles',
      action: 'read',
      description: 'Can view roles'
    }),
    permissionService.createActionPermission({
      resource: 'roles',
      action: 'update',
      description: 'Can update roles'
    }),
    permissionService.createActionPermission({
      resource: 'roles',
      action: 'delete',
      description: 'Can delete roles'
    }),
  ]);

  // Combine all permissions
  const allPermissions = [
    ...userPermissions,
    ...eventPermissions,
    ...reviewPermissions,
    ...mailerPermissions,
    ...rbacPermissions,
  ];

  // Assign all permissions to role with ID 1 (assuming it's the admin role)
  await roleService.assignPermissionsToRole(1, {
    permissionIds: allPermissions.map(p => p.id)
  });

  return allPermissions;
}

export default seedDefaultPermissions;