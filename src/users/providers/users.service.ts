import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { EventsService } from '../../events/providers/events.service';
import { ICompleteUserInformation } from '../interfaces/user.information.interface';
import { VerificationService } from './verification.service';
import { VerifyEmailDto } from '../dtos/verify-email.dto';
import { IUser } from '../interfaces/user.interface';
import { SignUpDto } from '../../auth/dto/signup.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly eventService: EventsService,
    @Inject(forwardRef(() => VerificationService))
    private readonly verficationService: VerificationService,
  ) {}

  save(user: IUser): Promise<User> {
    return this.userRepository.save(user);
  }

  async create(signUpDto: SignUpDto, password: string) {
    const userSchema = this.userRepository.create({
      ...signUpDto,
      password,
    });
    try {
      const user = await this.userRepository.save(userSchema);
      return await this.findByCredentials(user.email);
    } catch {}
  }

  async findByCredentials(identifier: string): Promise<IUser | null> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.permissions', 'permission')
      .where(
        'user.email = :identifier OR user.phone = :identifier OR user.username = :identifier',
        {
          identifier,
        },
      )
      .select([
        'user', // Select the whole user object
        'role.id', // Select only the `id` field from the role
        'permission.id', // Select only the `id` field from permissions
      ])
      .getOne();

    return user;
  }

  async userNameIsAvailable(username: string): Promise<Boolean | null> {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    if (user)
      throw new HttpException(
        {
          statusCode: HttpStatus.CONFLICT,
          message: 'Username is already in use.',
          error: 'Conflict',
        },
        HttpStatus.CONFLICT,
      );
    return true;
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`User not found.`);
    }
    return user;
  }

  async toggleFavorite(userId: number, eventId: number): Promise<boolean> {
    const event = await this.eventService.findOne(eventId);
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favoriteEvents'], // Ensure the favoriteEvents relation is loaded
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const isFavorite = user.favoriteEvents?.some((fav) => fav.id == eventId);
    if (isFavorite)
      user.favoriteEvents = user.favoriteEvents.filter(
        (fav) => fav.id != eventId,
      );
    else user.favoriteEvents = [...(user.favoriteEvents || []), event];
    await this.userRepository.save(user);

    return true;
  }

  async completeInformation(
    userId: number,
    userInformationSchema: ICompleteUserInformation,
  ): Promise<User> {
    const user = await this.findById(userId);

    if (userInformationSchema.username) {
      const usernameIsAvailable = await this.userNameIsAvailable(
        userInformationSchema.username,
      );
      if (usernameIsAvailable) {
        Object.assign(user, userInformationSchema);
        return await this.userRepository.save(user);
      }
    }
  }

  async emailVerification(id: number) {
    const user = await this.findById(id);
    await this.verficationService.deletePendingVerificationEmails(id);
    const emailverfication =
      await this.verficationService.prepareVerificationSchemaBeforeSending(id);
    this.verficationService.sendVerificationEmail(user, emailverfication);
    return true;
  }

  async verifyEmail(
    userId: number,
    verifyEmailDto: VerifyEmailDto,
  ): Promise<Boolean> {
    const { code } = verifyEmailDto;
    const emailverification = await this.verficationService.findVerification(
      userId,
      code,
    );

    if (
      !emailverification ||
      (emailverification && emailverification.expiresAt < new Date())
    )
      throw new BadRequestException(
        'The verification link has expired or is invalid',
      );

    return await this.verficationService.saveEmailVerificationResult(
      emailverification,
    );
  }
}
