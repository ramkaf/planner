import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { User } from 'src/users/entities/user.entity';
  import { Event } from 'src/events/entities/event.entity';
  
  @Entity('ticket')
  export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', unique: true })
    ticketNumber: string; 
    
    @Column({ type: 'float', nullable: true })
    price: number;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @Column({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
  
    @ManyToOne(() => User, (user) => user.tickets, { nullable: false }) 
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @ManyToOne(() => Event, (event) => event.tickets, { nullable: false })
    @JoinColumn({ name: 'event_id' }) 
    event: Event;
  }
  