export class CreateUserDto {
  email: string;
  username: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  profilePictureUrl?: string;
  dateOfBirth?: Date;
}
