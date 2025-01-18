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
import { AuthorService } from './../providers/author.service';
import { CreateAuthorDto } from './../dto/create-author.dto';
import { UpdateAuthorDto } from './../dto/update-author.dto';
import {
  ControllerPermission,
  RequiresPermission,
} from '../../rbac/decorators/requires-permission.decorator';
import { PermissionGuard } from '../../rbac/guards/permission.guard';

@Controller('author')
@UseGuards(PermissionGuard) // Apply global permission guard
@ControllerPermission('author') // Controller-level permission for all routes in this controller
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @RequiresPermission('author:create') // Permission required to create an author
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @Get()
  @RequiresPermission('author:read') // Permission required to get all authors
  findAll() {
    return this.authorService.findAll();
  }

  @Get(':id')
  @RequiresPermission('author:read') // Permission required to get a single author
  findOne(@Param('id') id: string) {
    return this.authorService.findOne(+id);
  }

  @Patch(':id')
  @RequiresPermission('author:update') // Permission required to update an author
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  @RequiresPermission('author:delete') // Permission required to delete an author
  remove(@Param('id') id: string) {
    return this.authorService.remove(+id);
  }
}
