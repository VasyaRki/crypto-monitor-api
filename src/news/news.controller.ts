import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsEntity } from './entities/news.entity';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  public async getNews(): Promise<NewsEntity[]> {
    return this.newsService.findLastNews();
  }
}
