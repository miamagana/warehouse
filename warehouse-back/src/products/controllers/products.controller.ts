import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from '../services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('all')
  async getProducts() {
    return this.productsService.findAll();
  }

  @Post('add')
  @UseInterceptors(FileInterceptor('file'))
  async addProducts(@UploadedFile() file: Express.Multer.File) {
    try {
      const { products } = JSON.parse(
        Buffer.from(file.buffer).toString('utf-8'),
      );
      return await this.productsService.addProducts(products);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @Post('sell')
  async sellProducts(@Body() productsIds: string[]) {
    try {
      return this.productsService.sellProducts(productsIds);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
