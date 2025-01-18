import { Event } from '../../events/entities/event.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100, unique: true })
  name: string;

  @Column('text', { nullable: true })
  description: string; // A brief description of the category.

  @Column('varchar', { nullable: true })
  icon: string; // A URL or name for the category's icon.

  @Column('boolean', { default: true })
  isActive: boolean; // Whether the category is currently active.

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date; // Timestamp when the category was created.

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date; // Timestamp when the category was last updated.

  @Column('timestamp', { nullable: true })
  deletedAt: Date | null; // Soft delete timestamp, if applicable.

  // One-to-many relation with Event entity
  @OneToMany(() => Event, (event) => event.category)
  events: Event[];
}
