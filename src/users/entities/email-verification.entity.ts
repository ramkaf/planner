import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class EmailVerification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  code: string;

  @Column({ default: false })
  isVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  expiresAt: Date;

  @BeforeInsert()
  setExpiresAt() {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
    this.expiresAt = new Date(this.createdAt.getTime() + 10 * 60 * 1000);
  }
}