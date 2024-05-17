import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginBodyDTO } from './dto/login-body.dto';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../jwt/guards/jwt-auth.guard';
import { UserEntity } from '../users/entities/users.entity';
import { AuthResponse } from './schemas/login.response.schema';
import { IJwtPayload } from '../jwt/interfaces/jwt-payload.interface';
import { IJwtPayloadDecorator } from '../jwt/decorators/jwt-payload.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  public async login(@Body() body: LoginBodyDTO): Promise<AuthResponse> {
    console.log(body);

    const res = await this.authService.login(body);
    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  public async profile(
    @IJwtPayloadDecorator() payload: IJwtPayload,
  ): Promise<UserEntity> {
    const res = await this.usersService.findById(payload.id);
    return res;
  }
}
