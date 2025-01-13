import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, AfterInsert } from 'typeorm';
import { Role } from './role.entity';
import { PermissionService } from '../services/permission.service';
import { RedisService } from 'src/redis/providers/redis.service';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  resource: string;

  @Column({ nullable: true })
  action: string;

  @Column({ default: false })
  isControllerPermission: boolean;

    @ManyToMany(() => Role, (role) => role.permissions)
    roles: Role[];
}
