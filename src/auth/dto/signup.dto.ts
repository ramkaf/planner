import {
  IsString,
  IsEmail,
  MinLength,
  IsPhoneNumber,
  IsOptional,
  Matches,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
} from 'class-validator';
class MatchPasswordsConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as SignUpDto;
    return object.password === value; // Ensure confirmPassword matches password
  }

  defaultMessage(args: ValidationArguments) {
    return 'Confirm password must match the password.';
  }
}

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  username: string;

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

  @IsOptional()
  @Matches(/^(\+98|0)?9\d{9}$/, {
    message: 'Phone number must be a valid Iranian number.',
  })
  phone?: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
