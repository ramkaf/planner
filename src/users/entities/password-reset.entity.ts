import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

// password-reset.entity.ts
@Entity()
export class PasswordReset {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  userId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  token: string;

  @Column({ default: false })
  isUsed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  expiresAt: Date;

  @BeforeInsert()
  setExpiresAt() {
    const expirationTime = 10 * 60 * 1000; 
    this.expiresAt = new Date(Date.now() + expirationTime);
  }
}
