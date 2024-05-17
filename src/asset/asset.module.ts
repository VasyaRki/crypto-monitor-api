import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { CoingeckoApiModule } from '../coingecko-api/coingecko-api.module';

@Module({
  providers: [AssetService],
  imports: [CoingeckoApiModule],
  controllers: [AssetController],
})
export class AssetModule {}
