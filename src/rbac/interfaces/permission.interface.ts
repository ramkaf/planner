export interface IPermission {
    id: number;
    name: string;
    description: string;
    resource: string;
    action: string | null;
    isControllerPermission: boolean;
  }
  