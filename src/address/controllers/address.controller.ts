import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AddressService } from './../providers/address.service';
import { Address } from './../entities/address.entity';
import { CreateAddressDto } from './../dto/create-address.dto';
import { UpdateAddressDto } from './../dto/update-address.dto';
import {
  ControllerPermission,
  RequiresPermission,
} from '../../rbac/decorators/requires-permission.decorator';
import { PermissionGuard } from '../../rbac/guards/permission.guard';

@Controller('addresses')
@UseGuards(PermissionGuard) // Apply global permission guard to ensure user permissions are checked
@ControllerPermission('addresses') // Controller-level permission for all routes in this controller
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @RequiresPermission('addresses:create') // Permission required to create an address
  async create(@Body() createAddressDto: CreateAddressDto): Promise<Address> {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @RequiresPermission('addresses:read') // Permission required to view all addresses
  async findAll(): Promise<Address[]> {
    return this.addressService.findAll();
  }

  @Get(':id')
  @RequiresPermission('addresses:read') // Permission required to view a single address
  async findOne(@Param('id') id: number): Promise<Address> {
    return this.addressService.findOne(id);
  }

  @Put(':id')
  @RequiresPermission('addresses:update') // Permission required to update an address
  async update(
    @Param('id') id: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    return this.addressService.update(id, updateAddressDto);
  }

  @Delete(':id')
  @RequiresPermission('addresses:delete') // Permission required to delete an address
  async remove(@Param('id') id: number): Promise<void> {
    return this.addressService.remove(id);
  }
}
