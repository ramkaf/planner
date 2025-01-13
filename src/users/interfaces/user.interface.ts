import { IRole } from "src/rbac/interfaces/role.interface";

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