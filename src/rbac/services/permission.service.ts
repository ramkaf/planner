import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { RedisService } from 'src/redis/providers/redis.service';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    private readonly redisService:RedisService
  ) {}
  
  async createPermission(dto: CreatePermissionDto): Promise<Permission> {
    try {
      // Modify the name if it's a controller permission (if needed)
      let {name , description , isControllerPermission} = dto

      if (!description && isControllerPermission === true)
        description = `the controller permission => ${dto.name}`
         if (!description && isControllerPermission === false)

        description = `the endpoint permission => ${name}`
      if (dto.isControllerPermission) {
        name = `${dto.name}:*`;
      }

      const permission = await this.permissionRepository.save({
        name,
        description: dto.description || `The controller permission ===> ${name} .`,
      });

      this.reInsertPermissionsIntoRedis();
      return permission;
    } catch (error) {
      throw new Error(`Failed to create permission: ${error.message}`);
    }
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