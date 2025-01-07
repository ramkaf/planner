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

@Controller('events')
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createEventDto: CreateEventDto,
    @Request() req: ExpressRequest,
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
  async findAll(
    @PaginationParams() pagination: Pagination,
  ): Promise<PaginationResponse<Event>> {
    return this.eventsService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
