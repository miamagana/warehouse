import { InternalServerErrorException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { articleModelName } from '../../constants/articles.constants';
import { Article } from '../../interfaces/article.interface';
import { ArticlesService } from './articles.service';

describe('ArticlesService', () => {
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: getModelToken(articleModelName),
          useValue: {
            insertMany: (articles: Article[]) => {
              if (articles.length) {
                return articles;
              } else {
                throw new InternalServerErrorException();
              }
            },
          },
        },
      ],
    }).compile();
    service = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('should return', () => {
    it('inserted articles', () => {
      expect(service.addArticles([null])).toEqual([null]);
    });
    it('thrown exception', () => {
      expect(service.addArticles([])).toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
});
