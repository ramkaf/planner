import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Address } from './../entities/address.entity';
import { Repository } from 'typeorm';
import { AddressService } from '../providers/address.service';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { validate } from 'class-validator';

const mockAddressRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
};

const ADDRESS_DATA = {
  id: 1,
  title: 'address 1',
  description: 'address 1 description',
  province: 'kordestan',
  city: 'dehgolan',
  code: '256',
  unit: '8',
  mainStreet: '54',
  subStreet: '54',
  alley: 'tr',
  region: '5',
  events: [],
};

describe('AddressService', () => {
  let service: AddressService;
  let repository: jest.Mocked<Repository<Address>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(Address),
          useValue: mockAddressRepository,
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    repository = module.get<Repository<Address>>(
      getRepositoryToken(Address),
    ) as jest.Mocked<Repository<Address>>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save an address', async () => {
      const createAddressDto: CreateAddressDto = { ...ADDRESS_DATA };
      const savedAddress = { ...ADDRESS_DATA };

      repository.create.mockReturnValue(savedAddress);
      repository.save.mockResolvedValue(savedAddress);

      const result = await service.create(createAddressDto);

      expect(repository.create).toHaveBeenCalledWith(createAddressDto);
      expect(repository.save).toHaveBeenCalledWith(savedAddress);
      expect(result).toEqual(savedAddress);
    });

    it('should handle error during address creation', async () => {
      const createAddressDto: CreateAddressDto = { ...ADDRESS_DATA };
      repository.save.mockRejectedValue(new Error('Database error'));

      await expect(service.create(createAddressDto)).rejects.toThrow(
        'Database error',
      );

      expect(repository.create).toHaveBeenCalledWith(createAddressDto);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });

    it('should handle error during address creation', async () => {
      const createAddressDto: CreateAddressDto = { ...ADDRESS_DATA };
      repository.save.mockRejectedValue(new Error('Database error'));
  
      await expect(service.create(createAddressDto)).rejects.toThrow(
        'Database error',
      );
  
      expect(repository.create).toHaveBeenCalledWith(createAddressDto);
      expect(repository.save).toHaveBeenCalledTimes(1);
    });
  
    it('should fail validation for invalid data', async () => {
      const invalidDto = new CreateAddressDto(); 
      delete invalidDto.title;
  
      const validationErrors = await validate(invalidDto);
  
      expect(validationErrors.length).toBeGreaterThan(0);
      expect(validationErrors[0].property).toBe('title');
      expect(validationErrors[0].constraints).toHaveProperty('isString');
    });
  });

  describe('findAll', () => {
    it('should return an array of addresses', async () => {
      const addresses: Address[] = [ADDRESS_DATA];

      repository.find.mockResolvedValue(addresses);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(addresses);
    });

    it('should handle empty results', async () => {
      repository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return an address by ID', async () => {
      repository.findOne.mockResolvedValue(ADDRESS_DATA);

      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(ADDRESS_DATA);
    });

    it('should return null when address id is invalid', async () => {
      repository.findOne.mockResolvedValue(null);

      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(null);
    });
  });

  describe('update', () => {
    it('should update and save an address', async () => {
      const updateAddressDto: UpdateAddressDto = { city: 'New City' };
      const updatedAddress = { ...ADDRESS_DATA, ...updateAddressDto };

      repository.findOne.mockResolvedValue(ADDRESS_DATA);
      repository.save.mockResolvedValue(updatedAddress);

      const result = await service.update(1, updateAddressDto);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.save).toHaveBeenCalledWith(updatedAddress);
      expect(result).toEqual(updatedAddress);
    });
  });

  describe('remove', () => {
    it('should remove an address', async () => {
      repository.findOne.mockResolvedValue(ADDRESS_DATA);
      repository.remove.mockResolvedValue(undefined);

      await service.remove(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.remove).toHaveBeenCalledWith(ADDRESS_DATA);
    });

    it('should throw an error if address is not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow('Address not found');

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
