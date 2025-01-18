import {
  IsString,
  MinLength,
  Matches,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
  ValidatorConstraint,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';
class MatchPasswordsConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as ResetPassowrdDto;
    return object.password === value; // Ensure confirmPassword matches password
  }

  defaultMessage(args: ValidationArguments) {
    return 'Confirm password must match the password.';
  }
}
@ValidatorConstraint({ name: 'AtLeastOne', async: false })
class AtLeastOneFieldConstraint implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const object = args.object as Record<string, any>;
    return !!(object['email'] || object['phone'] || object['username']);
  }

  defaultMessage(_: ValidationArguments) {
    return 'At least one of email, phone, or username must be provided.';
  }
}

export class ResetPassowrdDto {
  @IsString()
  @MinLength(6)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    {
      message:
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  password: string;

  @IsString()
  @Validate(MatchPasswordsConstraint)
  confirmPassword: string;
}
export class ResetPasswordCredentialDto {
  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @IsOptional()
  @IsPhoneNumber(null, { message: 'Invalid phone number format' })
  phone?: string;

  @IsOptional()
  @IsString({ message: 'Username must be a string' })
  username?: string;

  @Validate(AtLeastOneFieldConstraint, {
    message: 'At least one of email, phone, or username must be provided.',
  })
  atLeastOneField!: boolean; // This property exists solely for validation.
}
export class ResetPasswordUrl {
  token: string;
}
