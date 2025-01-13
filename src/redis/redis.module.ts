import { Module, Global } from '@nestjs/common';
import { RedisService } from './providers/redis.service';
import { ConfigModule } from '@nestjs/config';


@Global()
@Module({
  imports : [ConfigModule],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
