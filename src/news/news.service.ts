import { Injectable } from '@nestjs/common';
import { NewsRepository } from './news.repository';
import { NewsEntity } from './entities/news.entity';

@Injectable()
export class NewsService {
  constructor(private readonly newsRepository: NewsRepository) {}

  public async findLastNews(): Promise<NewsEntity[]> {
    return this.newsRepository.findLastNews();
  }
}
