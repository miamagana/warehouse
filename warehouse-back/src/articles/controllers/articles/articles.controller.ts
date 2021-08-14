import {
  Controller,
  InternalServerErrorException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Article } from '../../interfaces/article.interface';
import { ArticlesService } from '../../services/articles/articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post('add')
  @UseInterceptors(FileInterceptor('file'))
  async addArticles(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Article[]> {
    try {
      const { inventory } = JSON.parse(
        Buffer.from(file.buffer).toString('utf-8'),
      );
      return await this.articlesService.addArticles(inventory);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
