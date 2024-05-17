import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/users.entity';
import { IFindOneUser } from './interfaces/find-one-user.interface';
import { IUser } from './interfaces/create-user.interface';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async findById(id: number): Promise<UserEntity | null> {
    return this.userRepository.findOneBy({ id });
  }

  public async findOne(filter: IFindOneUser): Promise<UserEntity | null> {
    return this.userRepository.findOneBy(filter);
  }

  public async create(data: IUser): Promise<UserEntity> {
    return this.userRepository.save(data);
  }

  public async update(id: number, data: IUser): Promise<void> {
    await this.userRepository.update(id, data);
  }
}
