import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtModule as NestJwtModule } from '@nestjs/jwt';
import { JwtAccessOptions } from './factories/jwt-access.options';
import { JwtRefreshOptions } from './factories/jwt-refresh.options';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtServiceProvider } from './providers/jwt-service.provider';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    NestJwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService): JwtModuleOptions => ({
        secret: config.get<string>('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_ACCESS_TTL'),
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  providers: [
    JwtAccessOptions,
    JwtRefreshOptions,
    JwtServiceProvider,
    JwtAuthGuard,
  ],
  exports: [JwtServiceProvider, JwtAuthGuard, UsersModule],
})
export class JwtModule {}
