import { join } from 'path';
import { readFileSync } from 'fs';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        logging: true,
        synchronize: true,
        autoLoadEntities: true,
        options: { enableArithAbort: true },
        url: configService.get<string>('DATABASE_URL'),
        entities: [__dirname + '../../apps/entities/*.entity.ts'],
        ssl: {
          rejectUnauthorized: true,
          ca: readFileSync(join(__dirname, '../../../aiven.pem')),
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
