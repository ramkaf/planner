import { Controller, Get, Post, Body, Param, UseGuards, Patch } from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { CreateRoleDto, AssignPermissionsDto } from '../dto/create-role.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionGuard } from '../guards/permission.guard';
import { RequiresPermission } from '../decorators/requires-permission.decorator';

@Controller('roles')
@UseGuards(PermissionGuard)
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  // @RequiresPermission('roles:create')
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto);
  }

  @Patch('/:id')
  // @RequiresPermission('roles:update')
  assignPermissions(
    @Param('id') id: number,
    @Body() dto: AssignPermissionsDto,
  ) {
    return this.roleService.assignPermissionsToRole(id, dto);
  }

  @Get()
  // @RequiresPermission('roles:read')
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  // @RequiresPermission('roles:read')
  findOne(@Param('id') id: number) {
    return this.roleService.findById(id);
  }
}