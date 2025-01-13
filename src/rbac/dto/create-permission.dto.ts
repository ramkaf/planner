export class CreateControllerPermissionDto {
    resource: string;
    description?: string;
  }
  
  export class CreateActionPermissionDto {
    resource: string;
    action: string;
    description: string;
  }