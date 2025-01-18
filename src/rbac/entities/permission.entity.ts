import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  AfterInsert,
} from 'typeorm';
import { Role } from './role.entity';
import { PermissionService } from '../services/permission.service';
import { RedisService } from '../../redis/providers/redis.service';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
