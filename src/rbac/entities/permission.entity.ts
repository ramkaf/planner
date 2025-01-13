import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from './role.entity';

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
