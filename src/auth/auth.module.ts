// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './providers/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { User } from 'src/users/entities/user.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { PasswordService } from './providers/password.service';
import { UsersModule } from 'src/users/users.module';
import { JwtToolService } from './providers/jwt.service';
import { MailerModule } from 'src/mailer/mailer.module';
import { PasswordReset } from 'src/users/entities/password-reset.entity';
import { PasswordController } from './controllers/password.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([PasswordReset]),
    PassportModule,
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '24h',
        },
      }),
      inject: [ConfigService],
    }),
    MailerModule
  ],
  controllers: [AuthController , PasswordController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    PasswordService,
    JwtToolService
  ], 
  exports: [AuthService],
})
export class AuthModule {}
