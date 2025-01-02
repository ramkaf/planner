import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { EventStatus } from '../interfaces/event.interface';
import { Tag } from 'src/tag/entities/tag.entity';
import { Category } from 'src/category/entities/category.entity';
import { Author } from 'src/author/entities/author.entity';
import { User } from 'src/users/entities/user.entity';
import { Review } from 'src/review/entities/review.entity';
import { Address } from 'src/address/entities/address.entity'; // Import Address entity

@Entity('event')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'float', default: 50 })
  price: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;

  @Column({ type: 'int', default: 100 })
  capacity: number;

  @Column('varchar', { nullable: true })
  organizer_name: string;

  @Column('varchar', { nullable: true })
  organizer_contact: string;

  @Column('int', { nullable: true, default: 0 })
  seen: number;

  @Column('varchar', { nullable: true })
  image_url: string;

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.Scheduled,
  })
  status: EventStatus;

  @ManyToMany(() => Tag, (tag) => tag.events)
  @JoinTable() // JoinTable creates a junction table
  tags: Tag[];

  @ManyToOne(() => Category, (category) => category.events, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Author, (author) => author.events, { nullable: true })
  @JoinColumn({ name: 'author_id' })
  author: Author;

  @ManyToOne(() => User, (user) => user.events, { nullable: true }) // Link to the User entity
  @JoinColumn({ name: 'user_id' }) // Foreign key column in the Event table
  user_id: User;

  @ManyToMany(() => User, (user) => user.favoriteEvents)
  favoriteUsers: User[];

  @OneToMany(() => Review, (review) => review.event)
  reviews: Review[];

  // Correct relationship with Address
  @ManyToOne(() => Address, (address) => address.events, { nullable: true })
  @JoinColumn({ name: 'address_id' })  // The column name in Event for the address
  address: Address; // Foreign key linking to the Address entity
}
