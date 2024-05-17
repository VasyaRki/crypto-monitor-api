import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { UserDTO } from './dto/create-user.dto';
import { UserEntity } from './entities/users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async create(@Body() body: UserDTO): Promise<UserEntity> {
    return this.usersService.create(body);
  }

  @Put('/:id')
  public async update(
    @Param('id') id: number,
    @Body() body: UserDTO,
  ): Promise<UserEntity> {
    return this.usersService.update(id, body);
  }
}
