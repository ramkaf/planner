import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { CategoryService } from './../providers/category.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

let service: CategoryService;
let mockRepository: Partial<Record<keyof Repository<Category>, jest.Mock>>; // Ensure it's a Partial<Record>
let categories: Category[] = [];

describe('CategoryService', () => {
  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(), 
      save: jest.fn(), 
      findOne: jest.fn((options) => {
        return categories.find((cat) => cat.id === options.where.id) || null;
      }),
      find: jest.fn(), 
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('CategoryService - create', () => {
    it('should insert a new category successfully', async () => {
      const createCategoryDto = { name: 'Unique Category', isActive: true };
      const createdCategory = { id: 1, ...createCategoryDto };

      mockRepository.create.mockReturnValue(createdCategory); // Mocking create
      mockRepository.save.mockResolvedValue(createdCategory); // Mocking save

      const result = await service.create(createCategoryDto);

      expect(mockRepository.create).toHaveBeenCalledWith(createCategoryDto);
      expect(mockRepository.save).toHaveBeenCalledWith(createdCategory);
      expect(result).toEqual(createdCategory);
    });

    it('should throw an error when inserting a category with a duplicate name', async () => {
      const createCategoryDto = { name: 'Duplicate Category', isActive: true };
      const error = new Error('Duplicate entry error');

      mockRepository.create.mockReturnValue(createCategoryDto);
      mockRepository.save.mockRejectedValue(error); // Mocking save rejection

      await expect(service.create(createCategoryDto)).rejects.toThrow(error);

      expect(mockRepository.create).toHaveBeenCalledWith(createCategoryDto);
      expect(mockRepository.save).toHaveBeenCalledWith(createCategoryDto);
    });

    it('should throw an error when required fields are missing', async () => {
      const createCategoryDto = { isActive: true };
      const error = new Error('Validation error: name is required');

      mockRepository.create.mockReturnValue(createCategoryDto);
      mockRepository.save.mockRejectedValue(error);

      await expect(service.create(createCategoryDto as any)).rejects.toThrow(error);

      expect(mockRepository.create).toHaveBeenCalledWith(createCategoryDto);
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should handle special characters in the name', async () => {
      const createCategoryDto = { name: 'Category @#$%', isActive: true };
      const createdCategory = { id: 3, ...createCategoryDto };

      mockRepository.create.mockReturnValue(createdCategory);
      mockRepository.save.mockResolvedValue(createdCategory);

      const result = await service.create(createCategoryDto);

      expect(mockRepository.create).toHaveBeenCalledWith(createCategoryDto);
      expect(mockRepository.save).toHaveBeenCalledWith(createdCategory);
      expect(result).toEqual(createdCategory);
    });
  });
  describe('CategoryService - findAll', () => {
    it('should return all active categories with related events', async () => {
      mockRepository.find.mockResolvedValue(categories);
      const result = await service.findAll();
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { isActive: true },
        relations: ['events'],
      });
      expect(result).toEqual(categories);
    });

    it('should return an empty array if no active categories exist', async () => {
      mockRepository.find.mockResolvedValue([]);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { isActive: true },
        relations: ['events'],
      });
      expect(result).toEqual([]);
    });
  });
  describe('CategoryService - findOne', () => {
    it('should find a category by its ID', async () => {
      // Mock data for the category to be inserted
      const newCategory = { id: 1, name: 'Category 1', isActive: true, events: [] } as Category;
      
      // Mock the repository's save and findOne methods
      mockRepository.save = jest.fn().mockResolvedValue(newCategory); // Mock save
      mockRepository.findOne = jest.fn().mockResolvedValue(newCategory); // Mock findOne to return the new category
  
      // Insert the category (save it to the mock repository)
      await service.create(newCategory);
  
      // Call findOne to get the category by ID
      const result = await service.findOne(1);
  
      // Assert that the result is the same as the new category
      expect(result).toEqual(newCategory);
  
      // Assert that findOne was called with the correct parameters
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['events'],
      });
    });
  
    it('should throw NotFoundException if category does not exist', async () => {
      // Mock the repository's findOne to return null for a non-existing category
      mockRepository.findOne = jest.fn().mockResolvedValue(null);
  
      const invalidId = 99;
  
      // Assert that the service throws NotFoundException
      await expect(service.findOne(invalidId)).rejects.toThrow(
        new NotFoundException(`Category with ID ${invalidId} not found`),
      );
  
      // Assert that findOne was called with the correct parameters
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: invalidId },
        relations: ['events'],
      });
    });
  });
  describe('CategoryService - update', () => {
    it('should update a category successfully', async () => {
      const existingCategory = { id: 1, name: 'Old Category', isActive: true } as Category;
      const updateCategoryDto: UpdateCategoryDto = { name: 'Updated Category' };
      mockRepository.findOne = jest.fn().mockResolvedValue(existingCategory);
      mockRepository.save = jest.fn().mockResolvedValue({ ...existingCategory, ...updateCategoryDto });
      const result = await service.update(1, updateCategoryDto);
      expect(result).toEqual({ ...existingCategory, ...updateCategoryDto });
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['events'],
      });
      expect(mockRepository.save).toHaveBeenCalledWith({ ...existingCategory, ...updateCategoryDto });
    });
  
    it('should throw NotFoundException if the category does not exist', async () => {
      const updateCategoryDto: UpdateCategoryDto = { name: 'Updated Category' };
      mockRepository.findOne = jest.fn().mockResolvedValue(null);
      await expect(service.update(99, updateCategoryDto)).rejects.toThrow(
        new NotFoundException(`Category with ID 99 not found`),
      );
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 99 },
        relations: ['events'],
      });
    });
  });
  describe('CategoryService - remove', () => {
    it('should soft delete a category successfully', async () => {
      // Mock data for the existing category
      const existingCategory = { id: 1, name: 'Category to Delete', isActive: true } as Category;
      
      // Mock the repository methods
      mockRepository.findOne = jest.fn().mockResolvedValue(existingCategory);
      mockRepository.save = jest.fn().mockResolvedValue({ ...existingCategory, deletedAt: expect.any(Date) });
  
      // Call the remove method
      await service.remove(1);
  
      // Assert that save was called with the updated category containing deletedAt
      expect(mockRepository.save).toHaveBeenCalledWith(expect.objectContaining({
        id: 1,
        deletedAt: expect.any(Date),
      }));
  
      // Ensure findOne was called with the correct parameters
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['events'],
      });
    });
  
    it('should throw NotFoundException if the category does not exist', async () => {
      // Mock the findOne method to return null (category not found)
      mockRepository.findOne = jest.fn().mockResolvedValue(null);
  
      // Ensure NotFoundException is thrown when trying to remove a non-existing category
      await expect(service.remove(99)).rejects.toThrow(
        new NotFoundException(`Category with ID 99 not found`),
      );
  
      // Ensure findOne was called with the correct parameters
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 99 },
        relations: ['events'],
      });
    });
  });    
});
