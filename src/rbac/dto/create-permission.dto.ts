import { IsBoolean, IsOptional, IsString } from "class-validator";
  
  export class CreatePermissionDto {

    @IsString()
    name: string;


    @IsString()
    @IsOptional()
    description: string;

    @IsBoolean()
    isControllerPermission:boolean
  }