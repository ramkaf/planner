import { Request } from 'express';
import { User } from '../../users/entities/user.entity';

export class ILogin {
  login: string;
  password: string;
}

export interface requestWithUser extends Request {
  user: User;
}
