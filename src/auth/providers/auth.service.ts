// src/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpDto } from '../dto/signup.dto';
import { User } from 'src/users/entities/user.entity';
import { PasswordService } from './password.service';
import { UsersService } from 'src/users/providers/users.service';
import { JwtToolService } from './jwt.service';
import { ILogin } from '../interfaces/login.interface';
import { EmailService } from 'src/mailer/providers/mailer.service';
import { CompleteSignupDto } from '../dto/complete-signup.dto';
import { IUser } from 'src/users/interfaces/user.interface';
import { IGoogleUser } from '../interfaces/google-user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtToolService: JwtToolService,
    private readonly passwordService: PasswordService,
    private readonly usersService: UsersService,
    private readonly mailerService:EmailService
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ user: IUser; accessToken: string }> {
    try {
      const { password } = signUpDto;
      const hashedPassword = await this.passwordService.hashPassword(password);
      const user: IUser = await this.usersService.create(signUpDto, hashedPassword);
      const accessToken:string = this.jwtToolService.getJwtToken(user);
      delete user.password;
      return { user, accessToken };
    } catch (error) {
      if (error.code === '23505') {
        throw new UnauthorizedException(
          'User with this email/username/phone already exists',
        );
      }
      throw error;
    }
  }

  async login(
    loginCredentional: ILogin,
  ): Promise<{ user: any; token: string }> {
    const { login, password } = loginCredentional;
    const user = await this.validateCredentials(login, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwtToolService.getJwtToken(user);
    return { user, token };
  }

  async validateCredentials(login: string, password: string): Promise<any> {
    const user = await this.usersService.findByCredentials(login);
    if (
      user &&
      (await this.passwordService.comparePasswords(password, user.password))
    ) {
      user.lastLogin = new Date();
      await this.userRepository.save(user);
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async completeSignUp(id:number , completeSignupDto:CompleteSignupDto):Promise<IUser>{
    const user = await this.usersService.findById(id)
    if (user){
      const updatedUserSchema = Object.assign(user , completeSignupDto)
      const updatedUser = await this.usersService.save(updatedUserSchema)
      this.mailerService.sendWelcomeEmail(updatedUser)
      return user
    }
    throw new ForbiddenException ()
  }

  async validateOrCreateGoogleUser(googleUser: IGoogleUser): Promise<string> {

    try {
      const existingUser = await this.userRepository.findOne({where : {email : googleUser.email}});
      if (existingUser) {
        existingUser.lastLogin = new Date();
        existingUser.isEmailVerified = true;
        await this.userRepository.save(existingUser);
        const accessToken = this.jwtToolService.getJwtToken(existingUser)
        return accessToken
      }
      // console.log(existingUser);
      

      const  res = await this.signUp({
        email: googleUser.email,
        password : '321165ram@A',
        confirmPassword : "321165ram@A"
      });
      
    } catch (error) {

    }
 
 
 
    
    // console.log(res);
    
    // const {firstName , lastName} = googleUser
    // newUser.firstName = firstName;
    // newUser.lastName = lastName
    // const user = await this.completeSignUp(newUser.id , {firstName , lastName})
    // const token = this.jwtToolService.getJwtToken(user)
    // return {user , token}
  }
}