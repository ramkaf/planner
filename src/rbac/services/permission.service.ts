import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { CreateControllerPermissionDto, CreateActionPermissionDto } from '../dto/create-permission.dto';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async createControllerPermission(dto: CreateControllerPermissionDto): Promise<Permission> {
    return this.permissionRepository.save({
      name: dto.resource,
      description: dto.description || `Full access to ${dto.resource}`,
      resource: dto.resource,
      isControllerPermission: true,
    });
  }

  async createActionPermission(dto: CreateActionPermissionDto): Promise<Permission> {
    return this.permissionRepository.save({
      name: `${dto.resource}:${dto.action}`,
      description: dto.description,
      resource: dto.resource,
      action: dto.action,
      isControllerPermission: false,
    });
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  async findById(id: number): Promise<Permission> {
    return this.permissionRepository.findOneBy({ id });
  }

  async findByIds(ids: number[]): Promise<Permission[]> {
    return this.permissionRepository.findByIds(ids);
  }
}