import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { SchoolType } from 'src/entity/school-type.entity';
dotenv.config();

export const connectionSource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['src/entity/*.ts'],
  migrations: ['src/db/migrations/**/*[.ts.js]'],
  synchronize: false,
  logger: 'debug',
  logging: true,
});

export const dataSource: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['../src/entity/*[.ts.js]', SchoolType],
  //@ts-ignore
  autoLoadEntities: true,
  synchronize: false,
};
