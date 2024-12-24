import { Event } from 'src/events/entities/event.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  // One-to-many relation with Event entity
  @OneToMany(() => Event, (event) => event.category)  // Ensure `category` is correctly set in `Event` entity
  events: Event[];
}
