import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { RoleService } from './services/role.service';
import { PermissionService } from './services/permission.service';
import { PermissionGuard } from './guards/permission.guard';
import { RoleController } from './controllers/role.controller';
import { PermissionController } from './controllers/permission.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission])],
  providers: [RoleService, PermissionService, PermissionGuard],
  controllers: [RoleController, PermissionController],
  exports: [RoleService, PermissionService, PermissionGuard],
})
export class RbacModule {}