/**
 * TypeORM Data Source for Migrations
 * Used for running migrations in production
 */
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: configService.get<string>('SUPABASE_DB_URL') || undefined,
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_DATABASE'),
  entities: ['dist/entities/**/*.entity.js'],
  migrations: ['dist/migrations/**/*.js'],
  synchronize: false,
  logging: false,
  ssl: configService.get<string>('SUPABASE_URL') ? { rejectUnauthorized: false } : false,
});

