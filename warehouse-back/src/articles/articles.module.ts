import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '../database/database.module';
import { articleModelName } from './constants/articles.constants';
import { ArticlesController } from './controllers/articles/articles.controller';
import { ArticleSchema } from './schemas/article.schema';
import { ArticlesService } from './services/articles/articles.service';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: articleModelName, schema: ArticleSchema },
    ]),
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
