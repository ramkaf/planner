import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './../dto/create-address.dto';
import { Address } from './../entities/address.entity';
import { UpdateAddressDto } from './../dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  // Create a new address
  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const address = this.addressRepository.create(createAddressDto);
    return await this.addressRepository.save(address);
  }

  // Get all addresses
  async findAll(): Promise<Address[]> {
    return await this.addressRepository.find();
  }

  // Get an address by ID
  async findOne(id: number): Promise<Address> {
    return await this.addressRepository.findOne({ where: { id } });
  }

  // Update an existing address
  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const address = await this.findOne(id);
    if (!address) {
      throw new Error('Address not found');
    }
    Object.assign(address, updateAddressDto);
    return await this.addressRepository.save(address);
  }

  // Delete an address
  async remove(id: number): Promise<void> {
    const address = await this.findOne(id);
    if (!address) {
      throw new Error('Address not found');
    }
    await this.addressRepository.remove(address);
  }
}
