import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthError } from './errors/auth.error';
import { LoginBodyDTO } from './dto/login-body.dto';
import { JWT_CONSTANTS } from '../jwt/jwt.constants';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/users.entity';
import { AuthResponse } from './schemas/login.response.schema';
import { JwtService } from '../jwt/interfaces/jwt-service.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JWT_CONSTANTS.APPLICATION.SERVICE_TOKEN)
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  public async login(input: LoginBodyDTO) {
    return this.validateUser(
      await this.usersService.findOne({
        email: input.email,
      }),
      input.password,
      input.email,
    );
  }

  public async validateUser(
    user: UserEntity,
    password: string,
    email: string,
  ): Promise<AuthResponse> {
    if (!user) {
      user = await this.register({ email, password });
    }

    const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordsMatch) {
      throw AuthError.WrongLoginOrPassword();
    }

    return this.jwtService.generatePair({ id: user.id });
  }

  public async register(input: LoginBodyDTO): Promise<UserEntity> {
    return this.usersService.create(input);
  }
}
