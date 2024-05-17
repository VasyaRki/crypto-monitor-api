import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/users.entity';
import { UsersRepository } from './users.repository';
import { UserDTO } from './dto/create-user.dto';
import { IFindOneUser } from './interfaces/find-one-user.interface';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async findById(userId: number): Promise<UserEntity | null> {
    return this.usersRepository.findById(userId);
  }

  public async findOne(filter: IFindOneUser): Promise<UserEntity | null> {
    return this.usersRepository.findOne(filter);
  }

  public async create(data: UserDTO): Promise<UserEntity> {
    const { password, ...createUserPayload } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.usersRepository.create({
      hashedPassword,
      ...createUserPayload,
    });
  }

  public async update(id: number, data: UserDTO): Promise<UserEntity> {
    const { password, ...updateUserPayload } = data;

    let hashedPassword = null;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    await this.usersRepository.update(id, {
      ...updateUserPayload,
      ...(hashedPassword && { hashedPassword }),
    });

    return this.findById(id);
  }
}
