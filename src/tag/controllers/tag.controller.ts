import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TagService } from './../providers/tag.service';
import { CreateTagDto } from './../dto/create-tag.dto';
import { UpdateTagDto } from './../dto/update-tag.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';  // Ensure JWT guard is correctly imported
import { PermissionGuard } from '../../rbac/guards/permission.guard';  // Corrected import path for PermissionGuard
import { RequiresPermission, ControllerPermission } from '../../rbac/decorators/requires-permission.decorator';  // Corrected import path for decorators

@Controller('tags')
@UseGuards(JwtAuthGuard, PermissionGuard)  // Apply global guards here
@ControllerPermission('tags')  // Controller-level permission for all routes under this controller
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @RequiresPermission('tags:create')  // Permission required for creating a tag
  async create(@Body() createTagDto: CreateTagDto) {
    return await this.tagService.create(createTagDto);
  }

  @Get()
  @RequiresPermission('tags:read')  // Permission required for reading tags
  async findAll() {
    return await this.tagService.findAll();
  }

  @Get(':id')
  @RequiresPermission('tags:read')  // Permission required for reading a specific tag
  async findOne(@Param('id') id: number) {
    return await this.tagService.findOne(id);
  }

  @Patch(':id')
  @RequiresPermission('tags:update')  // Permission required for updating a tag
  async update(@Param('id') id: number, @Body() updateTagDto: UpdateTagDto) {
    return await this.tagService.update(id, updateTagDto);
  }

  @Delete(':id')
  @RequiresPermission('tags:delete')  // Permission required for deleting a tag
  async remove(@Param('id') id: number) {
    await this.tagService.remove(id);
    return { message: 'Tag deleted successfully' };
  }
}
