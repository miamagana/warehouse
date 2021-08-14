import { InternalServerErrorException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../../../database/database.module';
import { articleModelName } from '../../constants/articles.constants';
import { Article } from '../../interfaces/article.interface';
import { ArticleSchema } from '../../schemas/article.schema';
import { ArticlesService } from '../../services/articles/articles.service';
import { ArticlesController } from './articles.controller';

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let service: ArticlesService;
  let spy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forFeature([
          { name: articleModelName, schema: ArticleSchema },
        ]),
      ],
      controllers: [ArticlesController],
      providers: [ArticlesService],
    }).compile();
    controller = module.get<ArticlesController>(ArticlesController);
    service = module.get<ArticlesService>(ArticlesService);
    spy = jest.spyOn(service, 'addArticles');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('should return', () => {
    it('the articles added', async () => {
      const mockArticles: Partial<Article>[] = [
        { art_id: 1, name: 'firstName', stock: 0 },
      ];
      spy.mockReturnValue(mockArticles);
      const buffer = Buffer.from(JSON.stringify({ inventory: mockArticles }));
      expect(
        await controller.addArticles({
          buffer,
          destination: '',
          size: buffer.byteLength,
          fieldname: 'field',
          filename: 'name',
          originalname: 'name',
          path: '',
          mimetype: '',
          stream: undefined,
          encoding: 'utf-8',
        }),
      ).toEqual(mockArticles);
      expect(spy).toHaveBeenCalledWith(mockArticles);
    });
    it('internal server exception', async () => {
      try {
        await controller.addArticles(null);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
