import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EventStatus } from '../interfaces/event.interface';
import { Tag } from 'src/tag/entities/tag.entity';
import { Category } from 'src/category/entities/category.entity';
import { Author } from 'src/author/entities/author.entity';

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

  @ManyToMany(() => Tag, (tag) => tag.events)
  @JoinTable()  // JoinTable creates a junction table
  tags: Tag[];

  @ManyToOne(() => Category, (category) => category.events, { nullable: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;  

    // Many-to-one relation with Author entity
    @ManyToOne(() => Author, (author) => author.events, { nullable: true })
    @JoinColumn({ name: 'author_id' })
    author: Author;
}
