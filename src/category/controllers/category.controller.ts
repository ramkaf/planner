import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './../providers/category.service';
import { CreateCategoryDto } from './../dto/create-category.dto';
import { UpdateCategoryDto } from './../dto/update-category.dto';
import {
  ControllerPermission,
  RequiresPermission,
} from '../../rbac/decorators/requires-permission.decorator';
import { PermissionGuard } from '../../rbac/guards/permission.guard';

@Controller('categories')
@UseGuards(PermissionGuard) // Apply global permission guard
@ControllerPermission('categories') // Controller-level permission for all routes in this controller
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @RequiresPermission('categories:create') // Permission required to create a category
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @RequiresPermission('categories:read') // Permission required to get all categories
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @RequiresPermission('categories:read') // Permission required to get a single category
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @RequiresPermission('categories:update') // Permission required to update a category
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @RequiresPermission('categories:delete') // Permission required to delete a category
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.categoryService.remove(id);
  }
}
