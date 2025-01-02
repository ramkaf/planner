import { UserRole } from 'src/users/interfaces/user.interface';

export interface Payload {
  id: number;
  email: string;
  username: string;
  role: UserRole;
}
