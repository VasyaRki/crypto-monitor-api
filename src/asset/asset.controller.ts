import { Controller, Get, Param } from '@nestjs/common';
import { AssetService } from './asset.service';

@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get('/coin-list')
  public async getCoinList() {
    return this.assetService.getCoinList();
  }

  @Get('/coin/:id')
  public async coinDataById(@Param('id') id: string) {
    return this.assetService.coinDataById(id);
  }

  @Get('/prices')
  public async prices() {
    return this.assetService.prices();
  }

  @Get('/market-cap')
  public async getMarketCap() {
    return this.assetService.getMarketCap();
  }
}
