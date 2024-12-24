import { Event } from "src/events/entities/event.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;
  
   @ManyToMany(() => Event, (event) => event.tags)
  events: Event[];
}
