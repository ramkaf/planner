import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EventStatus } from '../interfaces/event.interface';

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column({type : "date"})
  date: Date;

  @Column('varchar')
  address: string;

  @Column({ type: 'float', default: 50 })
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @Column({ type: 'int', default: 100 })
  capacity: number;

  @Column('varchar', { nullable: true })
  category: string;

  @Column('varchar', { nullable: true })
  organizer_name: string;

  @Column('varchar', { nullable: true })
  organizer_contact: string;

  @Column('varchar', { nullable: true })
  image_url: string;

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.Scheduled
  })
  status: EventStatus;

  @Column('simple-array', { nullable: true })
  tags: string[];
}
