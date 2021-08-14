import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createMongooseOptions(): MongooseModuleOptions {
    const user = this.configService.get('DB_USER');
    const password = this.configService.get('DB_PASSWORD');
    const host = this.configService.get('DB_HOST');
    const dbName = this.configService.get('DB_NAME');
    return {
      uri: `mongodb+srv://${user}:${password}@${host}/${dbName}`,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    };
  }
}
