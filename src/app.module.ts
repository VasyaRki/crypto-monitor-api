import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { AppController } from './app.controller';
import { AssetModule } from './asset/asset.module';
import { CoingeckoApiModule } from './coingecko-api/coingecko-api.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [
    DbModule,
    JwtModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development'],
    }),
    AssetModule,
    NewsModule,
    CoingeckoApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
