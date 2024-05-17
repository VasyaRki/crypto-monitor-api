import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './entities/users.entity';
import { UsersRepository } from './users.repository';

@Module({
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UsersModule {}
