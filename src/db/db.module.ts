import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        synchronize: true,
        migrationsRun: true,
        autoLoadEntities: true,
        migrations: ['./dist/db/migrations/*.js'],
        host: configService.get<string>('DATABASE_HOST'),
        database: configService.get<string>('DATABASE_NAME'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        port: parseInt(configService.get<string>('DATABASE_PORT')),
      }),
    }),
  ],
})
export class DbModule {}
