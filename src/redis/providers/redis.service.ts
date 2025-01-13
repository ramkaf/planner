import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: RedisClientType;

  constructor(private readonly configService: ConfigService) {
    const redisHost = this.configService.get<string>('REDIS_HOST', 'localhost');
    const redisPort = this.configService.get<number>('REDIS_PORT', 6379);
    const redisUser = this.configService.get<string>('REDIS_USER', '');
    const redisPassword = this.configService.get<string>('REDIS_PASSWORD', '');
  
    const redisConfig = {
      url: redisUser && redisPassword
        ? `redis://${redisUser}:${redisPassword}@${redisHost}:${redisPort}`
        : `redis://${redisHost}:${redisPort}`,
    };
  
    this.client = createClient(redisConfig);
  
    this.client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });
  
    this.client.on('connect', () => {
      console.log('Redis client is connecting...');
    });
  
    this.client.on('ready', () => {
      console.log('Redis client connected successfully');
    });
  
    this.client.on('end', () => {
      console.log('Redis client disconnected');
    });
  }

  async onModuleInit() {
    if (!this.client.isOpen) {
      await this.client.connect();
      console.log('Redis client connected');
    }
  }

  async onModuleDestroy() {
    if (this.client.isOpen) {
      await this.client.quit();
      console.log('Redis client disconnected');
    }
  }

  async setData(key: string, value: string ,expiresInSeconds = 86400): Promise<void> {
    try {
            await this.client.setEx(key, expiresInSeconds, value);

    } catch (error) {
        console.log(error);
    }
  }


  async getData(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async deleteData(pattern: string): Promise<number> {
    const keys = await this.client.keys(pattern);
    if (keys.length > 0) {
      return await this.client.del(keys);
    }
    return 0;
  }
  async pushToStack(stackName: string, value: string): Promise<void> {
    await this.client.lPush(stackName, value);
  }

  async popFromStack(stackName: string): Promise<string | null> {
    return this.client.lPop(stackName);
  }

  async getClient(): Promise<RedisClientType> {
    return this.client;
  }

  async deleteLikeKeys(key:string): Promise<void> {
    const keys = await this.client.keys(`${key}*`);
    if (keys.length > 0)
      await this.client.del(keys);
  }
}
