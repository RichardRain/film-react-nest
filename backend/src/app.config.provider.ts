import { ConfigModule } from '@nestjs/config';

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    database: {
      driver: process.env.DATABASE_DRIVER,
      url: process.env.DATABASE_URL,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      port: Number(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
    },
    logger: process.env.LOGGER_MODE,
    backend: {
      port: Number(process.env.PORT),
    }
  },
};

export interface AppConfig {
  database: AppConfigDatabase;
  logger: LoggerMode;
  backend: BackendConfig;
}

interface BackendConfig {
  port: number;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
  username: string;
  password: string;
  port: number;
  database: string;
}

export enum LoggerMode {
  dev = 'dev',
  json = 'json',
  tskv = 'tskv',
}
