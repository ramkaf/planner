import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './../providers/events.service';
import { CreateEventDto } from './../dto/create-event.dto';
import { UpdateEventDto } from './../dto/update-event.dto';
import { Event } from './../entities/event.entity';
import {
  Pagination,
  PaginationResponse,
} from 'src/common/types/pagination.interface';
import { PaginationParams } from 'src/common/decorators/pagination.decorator';
import { Request as ExpressRequest } from 'express';
import { EventStatus } from './../interfaces/event.interface';
import { ICreateEvent } from './../interfaces/create.event.inerface';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/upload/providers/upload.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PermissionGuard } from '../../rbac/guards/permission.guard';
import { RequiresPermission, ControllerPermission } from '../../rbac/decorators/requires-permission.decorator';
import { RequestWithUser } from 'src/users/interfaces/user.interface';

@Controller('events')
@UseGuards(JwtAuthGuard, PermissionGuard)  // Apply global guards here
@ControllerPermission('events')  // Controller-level permission
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @RequiresPermission('events:create')  // Permission required for this route
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createEventDto: CreateEventDto,
    @Request() req: RequestWithUser,
  ) {
    const { id: user_id } = req.user;
    const status = createEventDto.status || EventStatus.Scheduled;

    let image_url = null;
    if (image) {
      image_url = await this.uploadService.saveFile(image);
    }

    const eventCreateSchema: ICreateEvent = {
      ...createEventDto,
      date: new Date(createEventDto.date),
      user_id,
      status,
      image_url,
    };

    return this.eventsService.create(eventCreateSchema);
  }

  @Get()
  @RequiresPermission('events:read')  // Permission required for this route
  async findAll(
    @PaginationParams() pagination: Pagination,
  ): Promise<PaginationResponse<Event>> {
    return this.eventsService.findAll(pagination);
  }

  @Get(':id')
  @RequiresPermission('events:read')  // Permission required for this route
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  @RequiresPermission('events:update')  // Permission required for this route
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  @RequiresPermission('events:delete')  // Permission required for this route
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
