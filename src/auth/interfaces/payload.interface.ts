import { Role } from "src/rbac/entities/role.entity";
import { IPermission } from "src/rbac/interfaces/permission.interface";
import { IRole } from "src/rbac/interfaces/role.interface";

export interface Payload {
  id: number;
  email: string;
  username: string;
  role: IRole;
  permissions: IPermission[];
}