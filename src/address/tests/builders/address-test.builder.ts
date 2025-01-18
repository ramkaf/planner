import { CreateAddressDto } from "src/address/dto/create-address.dto";
import { Address } from "src/address/entities/address.entity";

export class AddressTestDataBuilder {
    createValidAddress(): CreateAddressDto {
      return {
        title: 'Test Address',
        description: 'Test Description',
        province: 'Test Province',
        city: 'Test City',
        code: '12345',
        unit: '1A',
        mainStreet: 'Main St',
        subStreet: 'Sub St',
        alley: 'Test Alley',
        region: 'Test Region',
      };
    }
  
    createInvalidAddress(): CreateAddressDto {
      return {
        title: '', // Invalid empty title
        description: 'Test Description',
        province: '',  // Invalid empty province
        city: 'Test City',
        code: '12345',
        unit: '1A',
        mainStreet: 'Main St',
        subStreet: 'Sub St',
        alley: 'Test Alley',
        region: 'Test Region',
      };
    }
  
    createSampleAddress(id: number): Address{
      return {
        id,
        ...this.createValidAddress(),
        events: [],
      };
    }
  }