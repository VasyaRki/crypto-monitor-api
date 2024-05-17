import { Injectable } from '@nestjs/common';
import { CoingeckoApiService } from 'src/coingecko-api/coingecko-api.service';

@Injectable()
export class AssetService {
  private cacheAssets: any[];
  constructor(private readonly coingeckoApiService: CoingeckoApiService) {}

  public async getCoinList() {
    if (!this.cacheAssets) {
      this.cacheAssets = await this.coingeckoApiService.getCoinList();
    }
    return this.cacheAssets;
  }

  public async coinDataById(id) {
    return this.cacheAssets.find((asset) => asset.id === id);
  }

  public async getMarketCap() {
    const marketCap = await this.coingeckoApiService.getMarketCap();

    return { marketCap: marketCap.data.total_market_cap.usd };
  }

  public async prices() {
    const prices = {};

    const symbols = ['btc', 'eth', 'sol'];

    console.log(symbols);

    console.log(this.cacheAssets);

    for (const symbol of symbols) {
      const asset = await this.cacheAssets.find((asset) => {
        return asset.symbol === symbol;
      });

      console.log(asset);

      prices[symbol.toUpperCase()] = asset.current_price;
    }

    return prices;
  }
}
