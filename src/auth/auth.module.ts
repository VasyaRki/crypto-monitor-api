import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '../jwt/jwt.module';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, JwtModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
