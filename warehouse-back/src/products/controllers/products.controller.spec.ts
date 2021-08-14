import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { articleModelName } from '../../articles/constants/articles.constants';
import { ArticleSchema } from '../../articles/schemas/article.schema';
import { DatabaseModule } from '../../database/database.module';
import { productModelName } from '../constants/products.constants';
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
});
