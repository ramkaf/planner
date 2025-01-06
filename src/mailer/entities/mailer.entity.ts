import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { EmailStatus, EmailType } from '../interfaces/mailer.enum';
import { User } from 'src/users/entities/user.entity';


@Entity('email_logs')
export class Mailer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.mailers , {onDelete : 'CASCADE'})
  @JoinColumn({ name: 'to', referencedColumnName: 'email' })  // Join on email
  user: User;

  @Column({ type: 'varchar', length: 255 })
  to: string;  // Store the email in the Mailer entity
  
  @Column({
      type: 'enum', // Specify the column type as 'enum'
      enum: EmailType, // Reference the EmailType enum
      nullable: true, // Allow null values if necessary
    })
    emailType: EmailType; // Use the enum type here
  
    @Column({
      type: 'enum', // Specify the column type as 'enum'
      enum: EmailStatus, // Reference the EmailType enum
      nullable: false, // Allow null values if necessary
    })
    status: EmailStatus; // Use the enum type here
  
    @Column({ type: 'varchar', length: 255 , nullable : true })
    errorMessage: string;  // Store the email in the Mailer entity
    
  @CreateDateColumn()
  createdAt: Date;
  
  @UpdateDateColumn()
  updatedAt: Date;
}
