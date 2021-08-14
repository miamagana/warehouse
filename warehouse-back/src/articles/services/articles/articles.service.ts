import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { articleModelName } from '../../constants/articles.constants';
import { Article } from '../../interfaces/article.interface';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(articleModelName)
    private articleModel: Model<Article>,
  ) {}

  async addArticles(articles: Article[]): Promise<Article[]> {
    try {
      return await this.articleModel.insertMany(articles);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
