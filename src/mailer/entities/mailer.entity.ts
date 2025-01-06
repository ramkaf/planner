import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
import { EmailType } from '../interfaces/mailer.interface';


  @Entity('email_logs')
  export class Mailer {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255 })
    recipient: string;
  
    @Column({ type: 'varchar', length: 255 })
    subject: string;

    @Column({
        type: 'enum', // Specify the column type as 'enum'
        enum: EmailType, // Reference the EmailType enum
        nullable: true, // Allow null values if necessary
      })
      emailType: EmailType; // Use the enum type here

    @CreateDateColumn()
    createdAt: Date;
    
    @UpdateDateColumn()
    updatedAt: Date;
  }
  