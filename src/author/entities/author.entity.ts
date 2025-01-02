import { Event } from 'src/events/entities/event.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('author')
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  firstName: string;

  @Column('varchar')
  lastName: string;

  @Column('varchar', { nullable: true })
  bio: string; // Bio about the author

  @Column('varchar', { nullable: true })
  profilePictureUrl: string; // Link to profile picture

  @Column('boolean' , {default : false})
  isActive : boolean
  // One-to-many relationship: One author can write multiple events (or any other related entities)
  @OneToMany(() => Event, (event) => event.author)  // Ensure 'author' is referenced in Event entity
  events: Event[];
}
