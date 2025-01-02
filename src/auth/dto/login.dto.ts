import {
  IsString,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  Validate,
} from 'class-validator';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'AtLeastOneFieldExists', async: false })
class AtLeastOneFieldExistsConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as LoginDto;
    return !!(object.email || object.username || object.phone); // At least one should exist
  }

  defaultMessage(args: ValidationArguments) {
    return 'At least one of email, username, or phone must be provided.';
  }
}

export class LoginDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsString()
  password: string;

  @Validate(AtLeastOneFieldExistsConstraint)
  validateAtLeastOneField() {}
}
