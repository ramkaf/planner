import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { CreateControllerPermissionDto, CreateActionPermissionDto } from '../dto/create-permission.dto';
import { RedisService } from 'src/redis/providers/redis.service';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    private readonly redisService:RedisService
  ) {}
  
  async createControllerPermission(dto: CreateControllerPermissionDto): Promise<Permission> {
    const permission = await this.permissionRepository.save({
      name: `${dto.resource}:*`,
      description: dto.description || `Full access to ${dto.resource}`,
      resource: dto.resource,
      action : '*',
      isControllerPermission: true,
    });
    this.reInsertPermissionsIntoRedis()
    return permission
  }
  async createActionPermission(dto: CreateActionPermissionDto): Promise<Permission> {
    const permission = await this.permissionRepository.save({
      name: `${dto.resource}:${dto.action}`,
      description: dto.description,
      resource: dto.resource,
      action: dto.action,
      isControllerPermission: false,
    });
    this.reInsertPermissionsIntoRedis()
    return permission
  }
  async reInsertPermissionsIntoRedis (){
    const permissions = await this.findAll();
    await this.redisService.deleteLikeKeys('permission')
    for (const p of permissions) {
      const key = `permission-${p.id}`;
      const value = JSON.stringify(p); // Convert the permission object to a JSON string
      await this.redisService.setData(key, value, 999999999);  // Using 0 to make it persistent
    }
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