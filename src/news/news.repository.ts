import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from './entities/news.entity';

@Injectable()
export class NewsRepository {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly newsRepository: Repository<NewsEntity>,
  ) {}

  public async findLastNews(): Promise<NewsEntity[]> {
    const queryBuilder = this.newsRepository.createQueryBuilder('news');

    queryBuilder.orderBy('"createdAt"');

    queryBuilder.limit(10);

    return queryBuilder.getMany();
  }
}
