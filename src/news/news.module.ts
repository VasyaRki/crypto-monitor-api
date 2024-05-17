import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { NewsRepository } from './news.repository';
import { NewsEntity } from './entities/news.entity';

@Module({
  controllers: [NewsController],
  providers: [NewsService, NewsRepository],
  imports: [TypeOrmModule.forFeature([NewsEntity])],
})
export class NewsModule {}
