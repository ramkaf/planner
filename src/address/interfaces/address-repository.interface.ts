import { CreateAddressDto } from "src/address/dto/create-address.dto";
import { Address } from "src/address/entities/address.entity";

export interface IAddressRepository {
    create(address: CreateAddressDto): Promise<Address>;
    save(address: Address): Promise<Address>;
    find(): Promise<Address[]>;
    findOne(options: { where: { id: number } }): Promise<Address | null>;
    remove(address: Address): Promise<void>;
    setMockData?(data: Address[]): void;
  }