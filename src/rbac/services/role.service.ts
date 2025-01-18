import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { CreateRoleDto, AssignPermissionsDto } from '../dto/create-role.dto';
import { PermissionService } from './permission.service';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private permissionService: PermissionService,
  ) {}

  async createRole(dto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create(dto);
    return this.roleRepository.save(role);
  }

  async assignPermissionsToRole(
    roleId: number,
    dto: AssignPermissionsDto,
  ): Promise<Role> {
    const role = await this.roleRepository.findOneBy({ id: roleId });
    const permissions = await this.permissionService.findByIds(
      dto.permissionIds,
    );
    role.permissions = permissions;
    return this.roleRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find({
      relations: ['permissions'],
    });
  }

  async findById(id: number): Promise<Role> {
    return this.roleRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
  }
}
