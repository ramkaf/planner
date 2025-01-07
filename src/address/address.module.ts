import { Module } from '@nestjs/common';
import { AddressService } from './providers/address.service';
import { AddressController } from './controllers/address.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
