import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Event } from '../../events/entities/event.entity';

@Entity('review')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string; // Review content (e.g., text of the review)

  @Column('int')
  rating: number; // Rating value (e.g., 1-5 scale)

  @CreateDateColumn()
  createdAt: Date; // Automatically set to the current date when the review is created

  @UpdateDateColumn()
  updatedAt: Date; // Automatically updated when the review is modified

  // Many-to-one relationship with User (a review is created by a user)
  @ManyToOne(() => User, (user) => user.reviews, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Many-to-one relationship with Event (a review is for a specific event)
  @ManyToOne(() => Event, (event) => event.reviews, { nullable: false })
  @JoinColumn({ name: 'event_id' })
  event: Event;
}
