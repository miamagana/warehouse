import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';
import { databaseConnectionString } from '../constants/database.constants';

export const databaseProviders = [
  {
    provide: databaseConnectionString,
    useFactory: (configService: ConfigService): Promise<typeof mongoose> => {
      const user = configService.get('DB_USER');
      const password = configService.get('DB_PASSWORD');
      const host = configService.get('DB_HOST');
      const dbName = configService.get('DB_NAME');
      return mongoose.connect(
        `mongodb+srv://${user}:${password}@${host}/${dbName}`,
        { useUnifiedTopology: true, useNewUrlParser: true },
      );
    },
    inject: [ConfigService],
  },
];
