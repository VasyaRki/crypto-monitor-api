import { Injectable } from '@nestjs/common';
import { COINGECKO_API } from './coingeco-api.constants';

@Injectable()
export class CoingeckoApiService {
  public async getCoinList() {
    const url =
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-v7kZgFfAt5LAJKi1mwcgBbrL',
      },
    };

    const response = await fetch(url, options);

    const coinList = await response.json();
    return coinList;
  }

  public async getMarketCap() {
    const url = 'https://api.coingecko.com/api/v3/global';

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-v7kZgFfAt5LAJKi1mwcgBbrL',
      },
    };

    const response = await fetch(url, options);

    const marketCap = await response.json();
    return marketCap;
  }
}
