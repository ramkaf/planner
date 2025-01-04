import { Event } from 'src/events/entities/event.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  title: string;

  @Column('varchar')
  description: string;

  @Column('varchar', { nullable: true })
  province: string;

  @Column('varchar', { nullable: true })
  @Index()
  city: string;

  @Column('varchar', { nullable: true })
  region: string;

  @Column('varchar', { nullable: true })
  mainStreet: string;

  @Column('varchar', { nullable: true })
  subStreet: string;

  @Column('varchar', { nullable: true })
  alley: string;

  @Column('varchar', { nullable: true })
  code: string;

  @Column('varchar', { nullable: true })
  unit: string;

  // Define the one-to-many relationship with the Event entity
  @OneToMany(() => Event, (event) => event.address) // Ensure this is correct
  events: Event[]; // Array of events linked to the address
}
