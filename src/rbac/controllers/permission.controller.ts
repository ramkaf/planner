import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { PermissionService } from '../services/permission.service';
import { CreateControllerPermissionDto, CreateActionPermissionDto } from '../dto/create-permission.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionGuard } from '../guards/permission.guard';
import { RequiresPermission } from '../decorators/requires-permission.decorator';

@Controller('permissions')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Post('controller')
  @RequiresPermission('permissions:create')
  createControllerPermission(@Body() dto: CreateControllerPermissionDto) {
    return this.permissionService.createControllerPermission(dto);
  }

  @Post('action')
  @RequiresPermission('permissions:create')
  createActionPermission(@Body() dto: CreateActionPermissionDto) {
    return this.permissionService.createActionPermission(dto);
  }

  @Get()
  @RequiresPermission('permissions:read')
  findAll() {
    return this.permissionService.findAll();
  }

  @Get(':id')
  @RequiresPermission('permissions:read')
  findOne(@Param('id') id: number) {
    return this.permissionService.findById(id);
  }
}