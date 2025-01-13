import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PermissionService } from '../services/permission.service';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionGuard } from '../guards/permission.guard';
import { ControllerPermission, RequiresPermission } from '../decorators/requires-permission.decorator';

@Controller('permissions')
@UseGuards(PermissionGuard)
// @ControllerPermission('permission')

export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Post()
  createControllerPermission(@Body() dto: CreatePermissionDto) {
    return this.permissionService.createPermission(dto);
  }

  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.permissionService.findById(id);
  }
}