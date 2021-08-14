import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseProviders } from './providers/database.providers';
import { MongooseConfigService } from './services/mongoose-config/mongoose-config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
  ],
  providers: [MongooseConfigService, ...databaseProviders],
  exports: [MongooseConfigService, ...databaseProviders],
})
export class DatabaseModule {}
