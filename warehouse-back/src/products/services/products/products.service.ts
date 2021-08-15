import {
  Inject,
  Injectable,
  InternalServerErrorException,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { articleModelName } from '../../../articles/constants/articles.constants';
import { Article } from '../../../articles/interfaces/article.interface';
import { productModelName } from '../../constants/products.constants';
import { ContainArticles, Product } from '../../interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(productModelName)
    private readonly productModel: mongoose.Model<Product>,
    @InjectModel(articleModelName)
    private readonly articleModel: mongoose.Model<Article>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productModel.find();
  }

  async sellProducts(order: Record<string, number>): Promise<void> {
    try {
      const ids = Object.keys(order);
      const products = await this.productModel.find({ _id: { $in: ids } });
      if (products) {
        const articleMap = this.getArticlesOfProducts(products, order);
        const articles = await this.articleModel.find({
          art_id: { $in: [...articleMap.keys()] },
        });
        let enoughStock = true;
        const ops = [];
        articles.forEach((article: Article) => {
          const amountNeeded = articleMap.get(article.art_id);
          if (article.stock >= amountNeeded) {
            const newStock = article.stock - amountNeeded;
            ops.push({
              updateOne: {
                filter: { art_id: article.art_id },
                update: {
                  $set: {
                    stock: newStock,
                  },
                },
              },
            });
          } else {
            enoughStock = false;
          }
        });
        if (enoughStock) {
          await this.articleModel.bulkWrite(ops);
        } else {
          throw new PreconditionFailedException(
            'Not enough stock to satify the request',
          );
        }
      }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  getArticlesOfProducts(
    products: Product[],
    order: Record<string, number>,
  ): Map<number, number> {
    const articleMap = new Map<number, number>();
    products.forEach((product: Product) => {
      const multiplier = order[product.id];
      product.contain_articles.forEach(({ art_id, amount_of }) => {
        if (articleMap.has(art_id)) {
          const amount = articleMap.get(art_id) + amount_of * multiplier;
          articleMap.set(art_id, amount);
        } else {
          articleMap.set(art_id, amount_of * multiplier);
        }
      });
    });
    return articleMap;
  }

  async addProducts(products: Product[]): Promise<Product[]> {
    try {
      return await this.productModel.insertMany(products);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
