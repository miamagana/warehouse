import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { articleModelName } from '../articles/constants/articles.constants';
import { ArticleSchema } from '../articles/schemas/article.schema';
import { DatabaseModule } from '../database/database.module';
import { productModelName } from './constants/products.constants';
import { ProductsController } from './controllers/products.controller';
import { ProductSchema } from './schemas/product.schema';
import { ProductsService } from './services/products/products.service';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      { name: productModelName, schema: ProductSchema },
      { name: articleModelName, schema: ArticleSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
