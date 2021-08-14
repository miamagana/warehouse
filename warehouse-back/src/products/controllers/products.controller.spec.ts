import { InternalServerErrorException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { articleModelName } from '../../articles/constants/articles.constants';
import { ArticleSchema } from '../../articles/schemas/article.schema';
import { DatabaseModule } from '../../database/database.module';
import { productModelName } from '../constants/products.constants';
import { Product } from '../interfaces/product.interface';
import { ProductSchema } from '../schemas/product.schema';
import { ProductsService } from '../services/products/products.service';
import { ProductsController } from './products.controller';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forFeature([
          { name: articleModelName, schema: ArticleSchema },
          { name: productModelName, schema: ProductSchema },
        ]),
      ],
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return products', async () => {
      const products = [];
      jest.spyOn(service, 'findAll').mockResolvedValue(products);
      expect(await controller.getProducts()).toEqual(products);
    });
    it('should return error', async () => {
      try {
        jest
          .spyOn(service, 'findAll')
          .mockRejectedValue(new InternalServerErrorException());
        await controller.getProducts();
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('addProducts', () => {
    it('should return the products added', async () => {
      const mockResponse = [
        { name: 'firstName', contain_articles: [] },
      ] as Product[];
      jest.spyOn(service, 'addProducts').mockResolvedValue(mockResponse);
      const buffer = Buffer.from(JSON.stringify({ products: mockResponse }));
      expect(
        await controller.addProducts({
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
      ).toEqual(mockResponse);
      expect(service.addProducts).toHaveBeenCalledWith(mockResponse);
    });
    it('should return internal server exception', async () => {
      try {
        jest
          .spyOn(service, 'addProducts')
          .mockRejectedValue(new InternalServerErrorException());
        await controller.addProducts(null);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });

  describe('sellProducts', () => {
    it('should return true', async () => {
      const res = true;
      jest.spyOn(service, 'sellProducts').mockResolvedValue(res);
      expect(await controller.sellProducts(['1'])).toEqual(res);
    });
    it('should return error', async () => {
      try {
        jest
          .spyOn(service, 'sellProducts')
          .mockRejectedValue(new InternalServerErrorException());
        await controller.sellProducts(['1']);
      } catch (error) {
        expect(error).toBeInstanceOf(InternalServerErrorException);
      }
    });
  });
});
