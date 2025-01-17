import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Review } from 'src/review/entities/review.entity';
import { Mailer } from 'src/mailer/entities/mailer.entity';
import { Role } from 'src/rbac/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true , nullable : true })
  username: string;

  @Column({ unique: true  , nullable:true})
  phone: string;

  @Column()
  password: string;

  @Column({nullable : true})
  firstName: string;

  @Column({nullable : true})
  lastName: string;

  @Column({ nullable: true })
  profilePictureUrl?: string;

  @Column({ type: 'date', nullable: true })
  dateOfBirth?: Date;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  lastLogin?: Date;

  @Column({default : false , type: 'boolean'})
  isEmailVerified : Boolean

  @Column({default : 1})
  roleId: number;

  @ManyToOne(() => Role, { eager: true })
  @JoinColumn({ name: 'roleId' })
  role: Role;
  

  @Column({type : 'varchar' , default : null})
  referrer :  string
  
  @OneToMany(() => Event, (event) => event.user_id) // Matches the 'user' field in the Event entity
  events: Event[];

  @ManyToMany(() => Event, (event) => event.favoriteUsers)
  @JoinTable() // JoinTable creates a junction table
  favoriteEvents: Event[];

  @OneToMany(() => Review, (review) => review.event)
  reviews: Review[];

  @OneToMany(() => Mailer, (mailer) => mailer.user)
  mailers: Mailer[]; // Defines the One-to-Many relationship with Mailer
}
