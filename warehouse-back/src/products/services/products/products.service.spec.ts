import { InternalServerErrorException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { articleModelName } from '../../../articles/constants/articles.constants';
import { productModelName } from '../../constants/products.constants';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let articles = [];
  let products = [];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getModelToken(articleModelName),
          useValue: {
            find: () => articles,
            bulkWrite: () => {},
          },
        },
        {
          provide: getModelToken(productModelName),
          useValue: {
            find: () => products,
            insertMany: (products) => {
              if (products.length) {
                return products;
              } else {
                throw new InternalServerErrorException();
              }
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addProducts', () => {
    it('should return products added', async () => {
      products.push({});
      expect(await service.addProducts(products)).toEqual(products);
    });
    it('should return exception', async () => {
      try {
        await service.addProducts([]);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
