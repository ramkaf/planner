import { IRole } from "src/rbac/interfaces/role.interface";
import { User } from "../entities/user.entity";

export interface IUser {
    id: number;
    email: string;
    username: string | null;
    phone: string;
    firstName: string | null;
    lastName: string | null;
    profilePictureUrl?: string | null;
    dateOfBirth?: Date | null;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    lastLogin?: Date;
    isEmailVerified: Boolean;
    roleId: number;
    referrer: string | null;
    role: IRole;
    password:string
  }

  export interface RequestWithUser extends Request {
    user: User; // Mark as non-optional since these routes require authentication
  }